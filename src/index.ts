import { LiveWS } from 'bilibili-live-ws'
import { logger } from './utils/logger'
import { BiliRequestConfig, BiliStart, CreateApiOptions } from './types/api'
import { AxiosInstance, AxiosResponse } from 'axios'
import { createApi } from './utils/api'

class Monitor {
  public code: string
  public api: AxiosInstance
  private options: CreateApiOptions

  constructor(code: string, options: CreateApiOptions) {
    this.code = code
    this.options = options
    this.api = createApi(options)
  }

  async connect(): Promise<LiveWS> {
    // 鉴权
    const authRes = await this.auth()
    this.checkError(authRes, '鉴权失败')

    // 开始
    const startRes = await this.startGame()
    this.checkError(startRes)
    const {
      data: { data }
    } = startRes

    // 开始心跳
    setInterval(() => this.heartBeat(data.game_info.game_id), 20000)

    const { wss_link, auth_body } = data.websocket_info
    // 开始连接
    const res = new LiveWS(0, {
      address: wss_link,
      authBody: JSON.parse(auth_body)
    })

    return res
  }

  /**
   * 检测是否有错误
   */
  checkError(res: AxiosResponse<BiliRequestConfig>, message?: string) {
    logger.error(res)
    if (res.data.code !== 0) {
      throw new Error(message || res.data.message)
    }
  }

  /**
   * 鉴权签名接口
   */
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

  /**
   * 互动玩法游戏结束接口
   */
  async endGame() {
    return await this.api.post<BiliRequestConfig>('/v2/app/end', {
      code: this.code,
      app_id: this.options.appId
    })
  }

  /**
   * 心跳接口
   */
  async heartBeat(game_id: string) {
    return await this.api.post<BiliRequestConfig>('/v2/app/heartbeat', { game_id })
  }
}

// const baseURL = `https://live-open.biliapi.com`
const baseURL = `http://test-live-open.biliapi.net` //test
const appKey = `ybDe2M0NhJ00ABdrZKkM3azu`
const appSecret = `ltVsdtSyZa1lbo19qkV7gp6VYbnTyF`
const appId = 1681570956111
const monitor = new Monitor('D63Y8RSX7JLS5', {
  baseURL,
  appKey,
  appSecret,
  appId
})

async function main() {
  try {
    const res = await monitor.auth()
    logger.debug(res.config.headers)
  } catch (error) {
    logger.debug(error)
  }
}
main()
// monitor.connect().then((live) => {
//   live.on('msg', (data: any) => {
//     // data.cmd === 'LIVE_OPEN_PLATFORM_DM'
//     console.log(data)
//   })
// })

// setTimeout(() => {
//   monitor.endGame()
// }, 60000 * 1)
