"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bilibili_live_ws_1 = require("bilibili-live-ws");
const logger_1 = require("./utils/logger");
const types_1 = require("./types");
const api_1 = require("./utils/api");
const retry_1 = require("./utils/retry");
/** 弹幕监听器 */
class Monitor {
    constructor(code, options) {
        this.code = code;
        this.options = options;
        this.api = (0, api_1.createApi)(options);
    }
    /**  连接弹幕服务器 */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.live && (yield this.close());
            logger_1.logger.info('开始连接弹幕服务器...');
            // 鉴权
            yield this.auth();
            // 开始
            const startRes = yield this.startGame();
            this.checkError(startRes);
            const { data: { data } } = startRes;
            this.gameId = data.game_info.game_id;
            const { wss_link, auth_body } = data.websocket_info;
            // 开始连接
            this.live = new bilibili_live_ws_1.LiveWS(0, {
                address: wss_link[0],
                authBody: JSON.parse(auth_body)
            });
            // 事件绑定
            this.live.on(types_1.DanmakuCMD.DM, (event) => this.onDanmu(event.data));
            this.live.on(types_1.DanmakuCMD.GIFT, (event) => this.onGift(event.data));
            this.live.on(types_1.DanmakuCMD.GUARD_BUY, (event) => this.onGuardBuy(event.data));
            this.live.on(types_1.DanmakuCMD.SUPER_CHAT, (event) => this.onSuperChat(event.data));
            this.live.on(types_1.DanmakuCMD.SUPER_CHAT_DEL, (event) => this.onSuperChatDel(event.data));
            this.live.on(types_1.DanmakuCMD.LIKE, (event) => this.onLike(event.data));
            yield this.heartBeat();
            // 开始心跳
            this.timer = setInterval(() => this.heartBeat(), 20000);
            logger_1.logger.info('连接成功...');
        });
    }
    /** 重连 */
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info('正在重连...');
            yield this.close();
            yield this.connect();
        });
    }
    /**  检测是否有错误 */
    checkError(res, message) {
        if (res.data.code !== 0) {
            throw new Error(message || res.data.message);
        }
    }
    /** 检测game_id */
    checkGameId() {
        if (!this.gameId)
            throw new Error('game id is undefined');
    }
    /**  鉴权签名接口 */
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.post('/v2/app/start', {});
            if (res.data.code === -400)
                res.data.code = 0;
            return res;
        });
    }
    /**
     * 测试请求游戏开启接口
     * @comment 注意所有的接口基于鉴权成功后才能正确返回
     */
    startGame() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post('/v2/app/start', {
                code: this.code,
                app_id: this.options.appId
            });
        });
    }
    /** 互动玩法游戏结束接口 */
    endGame() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkGameId();
            const res = yield this.api.post('/v2/app/end', {
                game_id: this.gameId,
                app_id: this.options.appId
            });
            if (res.data.code !== 0)
                throw new Error(res.data.message);
            return res;
        });
    }
    /** 心跳接口 */
    heartBeat() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.api.post('/v2/app/heartbeat', {
                    game_id: this.gameId
                });
                if (res.data.code !== 0)
                    throw new Error(res.data.message);
            }
            catch (error) {
                logger_1.logger.error(error);
                this.connect();
            }
        });
    }
    /** 关闭实例 */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.live)
                throw new Error('live is undefined');
            logger_1.logger.info('关闭中...');
            // 关闭ws连接
            this.live.close();
            // 清除计时器
            clearInterval(this.timer);
            // 结束心跳
            yield this.endGame();
            // 清除原始内容
            this.live = undefined;
            this.gameId = undefined;
            this.timer = undefined;
        });
    }
    /** 收到普通弹幕 */
    onDanmu(msg) { }
    /** 收到礼物 */
    onGift(msg) { }
    /** 收到大航海 */
    onGuardBuy(msg) { }
    /** 收到SC */
    onSuperChat(msg) { }
    /** 收到SC下线 */
    onSuperChatDel(msg) { }
    /** 收到点赞 */
    onLike(msg) { }
}
__decorate([
    (0, retry_1.retry)(3)
], Monitor.prototype, "connect", null);
__decorate([
    (0, retry_1.retry)(5)
], Monitor.prototype, "endGame", null);
exports.default = Monitor;
