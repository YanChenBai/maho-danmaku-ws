export enum GuardLevel {
  /** 无 */
  None = 0,
  /** 总督 */
  Zongdu = 1,
  /** 提督 */
  Tidu = 2,
  /** 舰长 */
  Jianzhang = 3
}

export interface User {
  /** 用户uid */
  uid: number
  /** 用户名 */
  uname: string
  /** 用户头像 */
  face?: string
  /** 用户牌子·*/
  badge?: {
    /** 是否点亮 */
    active: boolean
    /** 牌子名称 */
    name: string
    /** 牌子等级 */
    level: number
    /** 牌子颜色 */
    color: string
    /** 渐变色牌子，当用户长时间未消费，则会变为灰色，即 `#c0c0c0` */
    gradient?: [string, string, string]
    /** 主播信息 */
    anchor: {
      /** 主播uid */
      uid: number
      /** 主播用户名 */
      uname: string
      /** 主播房间号 */
      room_id: number
      /** 是否为本直播间 */
      is_same_room?: boolean
    }
  }
  /** 用户身份 */
  identity?: {
    /** 直播榜单排名 */
    rank: 0 | 1 | 2 | 3
    /** 大航海信息 */
    guard_level: GuardLevel
    /** 房管 */
    room_admin: boolean
  }
}

export interface Message<T> {
  /** 消息id */
  id: string
  /** 接收消息的时间，毫秒时间戳 */
  timestamp: number
  /** 消息类型 */
  type: string
  /** 消息内容 */
  body: T
  /** 原始消息内容 */
  raw: any
}

export interface DataType {
  info: object
  cmd: string
}

export enum EVENTS {
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
