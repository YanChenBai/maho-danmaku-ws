import { LiveWS } from 'bilibili-live-ws'
import { logger } from './utils/logger'
import {
  BiliRequestConfig,
  BiliStart,
  CreateApiOptions,
  DM,
  DanmakuMessage,
  Gift,
  SuperChat,
  SuperChatDel,
  GuardBuy,
  Like,
  DanmakuCMD
} from './types'
import { AxiosInstance, AxiosResponse } from 'axios'
import { createApi } from './utils/api'
import { retry } from './utils/retry'

/** 弹幕监听器 */
class Monitor {
  /** 身份码 */
  code: string

  /** axios对象 */
  api: AxiosInstance

  /** 连接配置 */
  options: CreateApiOptions

  gameId?: string

  live?: LiveWS

  timer?: NodeJS.Timeout

  constructor(code: string, options: CreateApiOptions) {
    this.code = code
    this.options = options
    this.api = createApi(options)
  }

  /**  连接弹幕服务器 */
  @retry(3)
  async connect() {
    this.live && (await this.close())
    logger.info('开始连接弹幕服务器...')

    // 鉴权
    await this.auth()

    // 开始
    const startRes = await this.startGame()
    this.checkError(startRes)
    const {
      data: { data }
    } = startRes

    this.gameId = data.game_info.game_id

    const { wss_link, auth_body } = data.websocket_info
    // 开始连接
    this.live = new LiveWS(0, {
      address: wss_link[0],
      authBody: JSON.parse(auth_body)
    })

    // 事件绑定
    this.live.on(DanmakuCMD.DM, (event: DanmakuMessage<DM>) => this.onDanmu(event.data))
    this.live.on(DanmakuCMD.GIFT, (event: DanmakuMessage<Gift>) => this.onGift(event.data))
    this.live.on(DanmakuCMD.GUARD_BUY, (event: DanmakuMessage<GuardBuy>) =>
      this.onGuardBuy(event.data)
    )
    this.live.on(DanmakuCMD.SUPER_CHAT, (event: DanmakuMessage<SuperChat>) =>
      this.onSuperChat(event.data)
    )
    this.live.on(DanmakuCMD.SUPER_CHAT_DEL, (event: DanmakuMessage<SuperChatDel>) =>
      this.onSuperChatDel(event.data)
    )
    this.live.on(DanmakuCMD.LIKE, (event: DanmakuMessage<Like>) => this.onLike(event.data))

    await this.heartBeat()
    // 开始心跳
    this.timer = setInterval(() => this.heartBeat(), 20000)

    logger.info('连接成功...')
  }

  /** 重连 */
  async reconnect() {
    logger.info('正在重连...')
    await this.close()
    await this.connect()
  }

  /**  检测是否有错误 */
  checkError(res: AxiosResponse<BiliRequestConfig>, message?: string) {
    if (res.data.code !== 0) {
      throw new Error(message || res.data.message)
    }
  }

  /** 检测game_id */
  checkGameId() {
    if (!this.gameId) throw new Error('game id is undefined')
  }

  /**  鉴权签名接口 */
  async auth() {
    const res = await this.api.post<BiliStart>('/v2/app/start', {})
    if (res.data.code === -400) res.data.code = 0
    return res
  }

  /**
   * 测试请求游戏开启接口
   * @comment 注意所有的接口基于鉴权成功后才能正确返回
   */
  async startGame() {
    return await this.api.post<BiliStart>('/v2/app/start', {
      code: this.code,
      app_id: this.options.appId
    })
  }

  /** 互动玩法游戏结束接口 */
  @retry(5)
  async endGame() {
    this.checkGameId()
    const res = await this.api.post<BiliRequestConfig>('/v2/app/end', {
      game_id: this.gameId,
      app_id: this.options.appId
    })
    if (res.data.code !== 0) throw new Error(res.data.message)
    return res
  }

  /** 心跳接口 */
  async heartBeat() {
    try {
      const res = await this.api.post<BiliRequestConfig>('/v2/app/heartbeat', {
        game_id: this.gameId
      })
      if (res.data.code !== 0) throw new Error(res.data.message)
    } catch (error) {
      logger.error(error)
      this.connect()
    }
  }

  /** 关闭实例 */
  async close() {
    if (!this.live) throw new Error('live is undefined')
    logger.info('关闭中...')
    // 关闭ws连接
    this.live.close()

    // 清除计时器
    clearInterval(this.timer)

    // 结束心跳
    await this.endGame()

    // 清除原始内容
    this.live = undefined
    this.gameId = undefined
    this.timer = undefined
  }

  /** 收到普通弹幕 */
  onDanmu(msg: DM) {}

  /** 收到礼物 */
  onGift(msg: Gift) {}

  /** 收到大航海 */
  onGuardBuy(msg: GuardBuy) {}

  /** 收到SC */
  onSuperChat(msg: SuperChat) {}

  /** 收到SC下线 */
  onSuperChatDel(msg: SuperChatDel) {}

  /** 收到点赞 */
  onLike(msg: Like) {}
}

export default Monitor
