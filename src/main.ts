import { KeepLiveTCP, LiveOptions, LiveTCP, TCPOptions } from 'bilibili-live-ws'
import { parser } from './transform/DANMU_MSG'
import { Mapping, transformObject } from './transform'

interface Monitor {
  live: KeepLiveTCP
  roomId: number
  connect(): KeepLiveTCP
}

enum EVENTS {
  // 基础的一些事件
  OPEN = 'open',
  LIVE = 'live',
  HEART_BEAT = 'heartbeat',
  MSG = 'msg',
  CLOSE = 'close',
  ERROR = 'error',

  // 原始数据
  MESSAGE = 'message', //

  // 弹幕类
  DANMU_MSG = 'DANMU_MSG', //	弹幕消息
  WELCOME_GUARD = 'WELCOME_GUARD', //	欢迎xxx老爷
  ENTRY_EFFECT = 'ENTRY_EFFECT', //	欢迎舰长进入房间
  WELCOME = 'WELCOME', //	欢迎xxx进入房间
  SUPER_CHAT_MESSAGE_JPN = 'SUPER_CHAT_MESSAGE_JPN',
  SUPER_CHAT_MESSAGE = 'SUPER_CHAT_MESSAGE', //	二个都是SC留言

  //礼物类
  SEND_GIFT = 'SEND_GIFT', //	投喂礼物
  COMBO_SEND = 'COMBO_SEND', //	连击礼物

  // 天选之人类
  ANCHOR_LOT_START = 'ANCHOR_LOT_START', //	天选之人开始完整信息
  ANCHOR_LOT_END = 'ANCHOR_LOT_END', //	天选之人获奖id
  ANCHOR_LOT_AWARD = 'ANCHOR_LOT_AWARD', //	天选之人获奖完整信息

  // 上船类
  GUARD_BUY = 'GUARD_BUY', //	上舰长
  USER_TOAST_MSG = 'USER_TOAST_MSG', //	续费了舰长
  NOTICE_MSG = 'NOTICE_MSG', //	在本房间续费了舰长

  // 分区排行类
  ACTIVITY_BANNER_UPDATE_V2 = 'ACTIVITY_BANNER_UPDATE_V2', // 小时榜变动

  // 关注数变化类
  ROOM_REAL_TIME_MESSAGE_UPDATE = 'ROOM_REAL_TIME_MESSAGE_UPDATE' // 粉丝关注变动
}

class Monitor {
  public live: KeepLiveTCP
  public options: LiveOptions

  constructor(roomId: number, options: TCPOptions) {
    this.roomId = roomId
    this.options = options
    this.live = new KeepLiveTCP(this.roomId, this.options)
  }
}

const log = (...args: any[]) => {
  console.log('-----------------------------------------')
  console.log(...args)
}

const options: LiveOptions = {
  uid: 0
}

function traverseObject(arr: any[], output: any[] = []) {
  for (const key in arr) {
    const t = Array.isArray(arr[key])
    output.push([key, t ? traverseObject(arr[key]) : arr[key]])
  }
  return output
}

const config: Mapping = {
  uid: {
    path: [2, 0]
  },
  uname: {
    path: [2, 1]
  },
  face: {
    path: [0, 15, 'user', 'base', 'face'],
    nestedMapping: {
      name: {
        path: [0, 15, 'user', 'base']
      }
    }
  }
}

new Monitor(37527, options).live.on(EVENTS.DANMU_MSG, (data: any) => {
  log(transformObject(data.info, config))
})
