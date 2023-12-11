"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMType = exports.GuardLevel = exports.DanmakuCMD = void 0;
/**
 * 弹幕消息类型
 */
var DanmakuCMD;
(function (DanmakuCMD) {
    /** 普通弹幕 */
    DanmakuCMD["DM"] = "LIVE_OPEN_PLATFORM_DM";
    /** 礼物 */
    DanmakuCMD["GIFT"] = "LIVE_OPEN_PLATFORM_SEND_GIFT";
    /** SC */
    DanmakuCMD["SUPER_CHAT"] = "LIVE_OPEN_PLATFORM_SUPER_CHAT";
    /**  SC下线 */
    DanmakuCMD["SUPER_CHAT_DEL"] = "LIVE_OPEN_PLATFORM_SUPER_CHAT_DEL";
    /** 付费大航海 */
    DanmakuCMD["GUARD_BUY"] = "LIVE_OPEN_PLATFORM_GUARD";
    /** 点赞 */
    DanmakuCMD["LIKE"] = "LIVE_OPEN_PLATFORM_LIKE";
})(DanmakuCMD || (exports.DanmakuCMD = DanmakuCMD = {}));
/**
 * 对应房间大航海
 */
var GuardLevel;
(function (GuardLevel) {
    /** 无 */
    GuardLevel[GuardLevel["None"] = 0] = "None";
    /** 总督 */
    GuardLevel[GuardLevel["Zongdu"] = 1] = "Zongdu";
    /** 提督 */
    GuardLevel[GuardLevel["Tidu"] = 2] = "Tidu";
    /** 舰长 */
    GuardLevel[GuardLevel["Jianzhang"] = 3] = "Jianzhang";
})(GuardLevel || (exports.GuardLevel = GuardLevel = {}));
/** 弹幕类型 */
var DMType;
(function (DMType) {
    /** 普通弹幕 */
    DMType[DMType["Normal"] = 0] = "Normal";
    /** 表情包弹幕 */
    DMType[DMType["EMOJI"] = 1] = "EMOJI";
})(DMType || (exports.DMType = DMType = {}));
