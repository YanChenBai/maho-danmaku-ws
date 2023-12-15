/** 创建api的配置 */
export interface MahoOptions {
    /** 服务器地址 */
    baseURL: string;
    /** 身份码 */
    code: string;
    /** 密钥 */
    token: string;
}
/** 开平的响应结构 */
export interface BiliRequestConfig<T = {}> {
    code: number;
    message: string;
    request_id?: string;
    data: T;
}
/** 开始api的响应结构 */
export interface BiliStart extends BiliRequestConfig {
    data: {
        game_info: {
            game_id: string;
        };
        websocket_info: {
            auth_body: string;
            wss_link: string[];
        };
        anchor_info: {
            room_id: number;
            uname: string;
            uface: string;
            uid: number;
        };
    };
}
/**
 * 弹幕消息类型
 */
export declare enum DanmakuCMD {
    /** 普通弹幕 */
    DM = "LIVE_OPEN_PLATFORM_DM",
    /** 礼物 */
    GIFT = "LIVE_OPEN_PLATFORM_SEND_GIFT",
    /** SC */
    SUPER_CHAT = "LIVE_OPEN_PLATFORM_SUPER_CHAT",
    /**  SC下线 */
    SUPER_CHAT_DEL = "LIVE_OPEN_PLATFORM_SUPER_CHAT_DEL",
    /** 付费大航海 */
    GUARD_BUY = "LIVE_OPEN_PLATFORM_GUARD",
    /** 点赞 */
    LIKE = "LIVE_OPEN_PLATFORM_LIKE"
}
/**
 * 对应房间大航海
 */
export declare enum GuardLevel {
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
export declare enum DMType {
    /** 普通弹幕 */
    Normal = 0,
    /** 表情包弹幕 */
    EMOJI = 1
}
/** 事件消息体 */
export interface DanmakuMessage<T> {
    cmd: DanmakuCMD;
    data: T;
}
/** 用户信息 */
export interface UserInfo {
    uid: number;
    uname: string;
    uface: string;
}
export interface FansInfo {
    fans_medal_level: number;
    fans_medal_name: string;
    fans_medal_wearing_status: boolean;
    guard_level: GuardLevel;
}
export interface MessageData {
    timestamp: number;
    msg_id: string;
    room_id: number;
}
/** 普通弹幕 */
export interface DM extends UserInfo, FansInfo, MessageData {
    emoji_img_url: string;
    msg: string;
    dm_type: DMType;
}
/** 礼物连击消息体 */
export interface ComboInfo {
    /** 每次连击赠送的道具数量 */
    combo_base_num: number;
    /** 连击次数 */
    combo_count: number;
    /** 连击id */
    combo_id: string;
    /** 连击有效期秒 */
    combo_timeout: number;
}
/**
 * 礼物消息
 * @comment room_id 直播间(演播厅模式则为演播厅直播间,非演播厅模式则为收礼直播间)
 * */
export interface Gift extends UserInfo, FansInfo, MessageData {
    gift_id: number;
    gift_name: string;
    gift_num: number;
    price: number;
    paid: boolean;
    anchor_info: UserInfo;
    gift_icon: string;
    combo_gift: boolean;
    combo_info?: ComboInfo;
}
/** SC */
export interface SuperChat extends UserInfo, FansInfo, MessageData {
    message_id: number;
    message: string;
    rmb: number;
    start_time: number;
    end_time: number;
}
/** SC下线 */
export interface SuperChatDel extends Omit<MessageData, 'timestamp'> {
    message_ids: number[];
}
/** 大航海 */
export interface GuardBuy extends FansInfo, MessageData {
    user_info: UserInfo;
    guard_num: number;
    guard_unit: string;
}
/** 点赞 */
export interface Like extends UserInfo, Omit<FansInfo, 'guard_level'>, MessageData {
    like_text: string;
    like_count: number;
}
//# sourceMappingURL=types.d.ts.map