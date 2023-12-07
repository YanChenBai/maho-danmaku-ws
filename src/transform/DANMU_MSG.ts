import type { User, DataType } from '../types/app'
import { intToColorHex } from '../utils/color'

export interface DanmuMsg {
  user: User
  /** 弹幕内容 */
  content: string
  /** 发送时间，毫秒时间戳 */
  timestamp: number
  /** 是否为天选抽奖弹幕 */
  lottery: boolean
  /** 表情弹幕内容 */
  emoticon?: {
    id: string
    height: number
    width: number
    url: string
  }
  /** 弹幕内小表情映射，key为表情文字，如"[妙]" */
  in_message_emoticon?: Record<
    string,
    {
      id: string
      emoticon_id: number
      height: number
      width: number
      url: string
      description: string
    }
  >
}

interface RawData extends DataType {
  info: [
    [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      string,
      number,
      number,
      number,
      string,
      number,
      {
        bulge_display: number
        emoticon_unique: string
        height: number
        in_player_area: number
        is_dynamic: number
        url: string
        width: number
      },
      string,
      {
        mode: number
        show_player_type: number
        extra: string
        user: {
          uid: number
          base: {
            name: string
            face: string
            is_mystery: boolean
            name_color: number
          }
          medal: object
          wealth: { level: number }
        }
      },
      { activity_identity: string; activity_source: number; not_show: number },
      number
    ],
    string,
    [number, string, number, number, number, number, number, string],
    [
      number,
      string,
      string,
      number,
      number,
      string,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ],
    [number, number, number, string, number],
    string[],
    number,
    number,
    object,
    { ts: number; ct: string },
    number,
    number,
    object,
    object,
    number,
    number,
    number[],
    object
  ]
  cmd: 'DANMU_MSG'
}

const parser = (data: RawData, roomId: number): DanmuMsg => {
  const rawData = data.info
  const content = rawData[1]
  const shouldParseInMessageEmoticon = /\[.*?\]/.test(content)
  let inMessageEmoticon
  if (shouldParseInMessageEmoticon) {
    const messageExtraInfo = JSON.parse(rawData[0][15].extra)
    const emoctionDict: Record<
      string,
      {
        id: string
        emoticon_id: number
        height: number
        width: number
        url: string
        description: string
      }
    > = {}
    if (messageExtraInfo.emots) {
      inMessageEmoticon = Object.keys(messageExtraInfo.emots).reduce((acc, key) => {
        const emoticon = messageExtraInfo.emots[key]
        acc[key] = {
          id: emoticon.emoticon_unique,
          emoticon_id: emoticon.emoticon_id,
          height: emoticon.height,
          width: emoticon.width,
          url: emoticon.url,
          description: emoticon.descript
        }
        return acc
      }, emoctionDict)
    }
  }
  return {
    user: {
      uid: rawData[2][0],
      uname: rawData[2][1],
      face: rawData[0][15].user.base.face,
      badge: rawData[3].length
        ? {
            active: rawData[3][7] !== 12632256,
            name: rawData[3][1],
            level: rawData[3][0],
            color: intToColorHex(rawData[3][4]),
            gradient: [
              intToColorHex(rawData[3][7]),
              intToColorHex(rawData[3][8]),
              intToColorHex(rawData[3][9])
            ],
            anchor: {
              uid: rawData[3][12],
              uname: rawData[3][2],
              room_id: rawData[3][3],
              is_same_room: rawData[3][3] === roomId
            }
          }
        : undefined,
      identity: {
        rank: rawData[4][4] as any,
        guard_level: rawData[7],
        room_admin: rawData[2][2] === 1
      }
    },
    content,
    timestamp: rawData[0][4],
    lottery: rawData[0][9] !== 0,
    emoticon: (rawData[0][13] as any)?.emoticon_unique
      ? {
          id: (rawData[0][13] as any).emoticon_unique,
          height: (rawData[0][13] as any).height,
          width: (rawData[0][13] as any).width,
          url: (rawData[0][13] as any).url
        }
      : undefined,
    in_message_emoticon: inMessageEmoticon
  }
}

export { parser }
