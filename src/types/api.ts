export interface CreateApiOptions {
  baseURL: string
  appKey: string
  appSecret: string
  appId: number
}

export interface BiliRequestConfig<T = {}> {
  code: number
  message: string
  request_id?: string
  data: T
}

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
      wss_link: string
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
