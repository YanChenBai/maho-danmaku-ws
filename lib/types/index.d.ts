/// <reference types="node" />
import { LiveWS } from 'bilibili-live-ws';
import { BiliRequestConfig, BiliStart, CreateApiOptions, DM, Gift, SuperChat, SuperChatDel, GuardBuy, Like } from './types';
import { AxiosInstance, AxiosResponse } from 'axios';
/** 弹幕监听器 */
declare class Monitor {
    /** 身份码 */
    code: string;
    /** axios对象 */
    api: AxiosInstance;
    /** 连接配置 */
    options: CreateApiOptions;
    gameId?: string;
    live?: LiveWS;
    timer?: NodeJS.Timeout;
    constructor(code: string, options: CreateApiOptions);
    /**  连接弹幕服务器 */
    connect(): Promise<void>;
    /** 重连 */
    reconnect(): Promise<void>;
    /**  检测是否有错误 */
    checkError(res: AxiosResponse<BiliRequestConfig>, message?: string): void;
    /** 检测game_id */
    checkGameId(): void;
    /**  鉴权签名接口 */
    auth(): Promise<AxiosResponse<BiliStart, any>>;
    /**
     * 测试请求游戏开启接口
     * @comment 注意所有的接口基于鉴权成功后才能正确返回
     */
    startGame(): Promise<AxiosResponse<BiliStart, any>>;
    /** 互动玩法游戏结束接口 */
    endGame(): Promise<AxiosResponse<BiliRequestConfig<{}>, any>>;
    /** 心跳接口 */
    heartBeat(): Promise<void>;
    /** 关闭实例 */
    close(): Promise<void>;
    /** 收到普通弹幕 */
    onDanmu(msg: DM): void;
    /** 收到礼物 */
    onGift(msg: Gift): void;
    /** 收到大航海 */
    onGuardBuy(msg: GuardBuy): void;
    /** 收到SC */
    onSuperChat(msg: SuperChat): void;
    /** 收到SC下线 */
    onSuperChatDel(msg: SuperChatDel): void;
    /** 收到点赞 */
    onLike(msg: Like): void;
}
export default Monitor;
