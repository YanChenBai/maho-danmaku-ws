/** 创建api的配置 */
export interface CreateApiOptions {
  baseURL: string
  appKey: string
  appSecret: string
  appId: number
}

/** 开平的响应结构 */
export interface BiliRequestConfig<T = {}> {
  code: number
  message: string
  request_id?: string
  data: T
}

/** 开始api的响应结构 */
export interface BiliStart extends BiliRequestConfig {
  data: {
    //  场次信息
    game_info: {
      //  场次id,心跳key(心跳保持20s-60s)调用一次,超过60s无心跳自动关闭,长连停止推送消息
      game_id: string
    }
    //  长连信息
    websocket_info: {
      //  长连使用的请求json体 第三方无需关注内容,建立长连时使用即可
      auth_body: string
      //  wss 长连地址
      wss_link: string[]
    }
    //  主播信息
    anchor_info: {
      // 主播房间号
      room_id: number
      // 主播昵称
      uname: string
      // 主播头像
      uface: string
      // 主播uid
      uid: number
    }
  }
}

/**
 * 弹幕消息类型
 */
export enum DanmakuCMD {
  /** 普通弹幕 */
  DM = 'LIVE_OPEN_PLATFORM_DM',
  /** 礼物 */
  GIFT = 'LIVE_OPEN_PLATFORM_SEND_GIFT',
  /** SC */
  SUPER_CHAT = 'LIVE_OPEN_PLATFORM_SUPER_CHAT',
  /**  SC下线 */
  SUPER_CHAT_DEL = 'LIVE_OPEN_PLATFORM_SUPER_CHAT_DEL',
  /** 付费大航海 */
  GUARD_BUY = 'LIVE_OPEN_PLATFORM_GUARD',
  /** 点赞 */
  LIKE = 'LIVE_OPEN_PLATFORM_LIKE'
}

/**
 * 对应房间大航海
 */
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

/** 弹幕类型 */
export enum DMType {
  /** 普通弹幕 */
  Normal,
  /** 表情包弹幕 */
  EMOJI
}

/** 事件消息体 */
export interface DanmakuMessage<T> {
  cmd: DanmakuCMD
  data: T
}

/** 用户信息 */
export interface UserInfo {
  uid: number //用户uid
  uname: string //用户昵称
  uface: string //用户头像
}

export interface FansInfo {
  fans_medal_level: number // 粉丝勋章等级
  fans_medal_name: string // 粉丝勋章名字
  fans_medal_wearing_status: boolean //该房间粉丝勋章佩戴情况
  guard_level: GuardLevel // 大航海
}

export interface MessageData {
  timestamp: number // 弹幕发送时间秒级时间戳
  msg_id: string //消息唯一id
  room_id: number //直播间id
}

/** 普通弹幕 */
export interface DM extends UserInfo, FansInfo, MessageData {
  emoji_img_url: string // 表情包地址
  msg: string // 消息内容
  dm_type: DMType
}

/** 礼物连击消息体 */
export interface ComboInfo {
  /** 每次连击赠送的道具数量 */
  combo_base_num: number
  /** 连击次数 */
  combo_count: number
  /** 连击id */
  combo_id: string
  /** 连击有效期秒 */
  combo_timeout: number
}

export interface GiftBase extends UserInfo, FansInfo, MessageData {
  gift_id: number //道具id(盲盒:爆出道具id)
  gift_name: string //道具名(盲盒:爆出道具名)
  gift_num: number //赠送道具数量
  price: number //礼物单价(1000 = 1元 = 10电池),盲盒:爆出道具的价值
  paid: boolean //是否是付费道具
  anchor_info: UserInfo
  gift_icon: string //道具icon  （新增）
  combo_gift: boolean //是否是combo道具
}

export interface GiftCombo extends GiftBase {
  combo_gift: boolean //是否是combo道具
  combo_info: ComboInfo
}

/**
 * 礼物消息
 * @comment room_id 直播间(演播厅模式则为演播厅直播间,非演播厅模式则为收礼直播间)
 * */
export type Gift = GiftBase | GiftCombo

/** SC */
export interface SuperChat extends UserInfo, FansInfo, MessageData {
  message_id: number //留言id(风控场景下撤回留言需要)
  message: string //留言内容
  rmb: number //支付金额(元)
  start_time: number //生效开始时间
  end_time: number //生效结束时间
}

/** SC下线 */
export interface SuperChatDel extends Omit<MessageData, 'timestamp'> {
  message_ids: number[] // 留言id
}

/** 大航海 */
export interface GuardBuy extends FansInfo, MessageData {
  user_info: UserInfo
  guard_num: number
  guard_unit: string // (个月)
}

/** 点赞 */
export interface Like extends UserInfo, Omit<FansInfo, 'guard_level'>, MessageData {
  like_text: string
  like_count: number
}
