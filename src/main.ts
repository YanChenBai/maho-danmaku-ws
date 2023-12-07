import { KeepLiveTCP, LiveOptions, LiveTCP, TCPOptions } from 'bilibili-live-ws'
import { parser } from './transform/DANMU_MSG'
import { Mapping, MappingItem, transform } from './transform'
import { EVENTS } from './types/app'

interface Monitor {
  live: KeepLiveTCP
  roomId: number
  connect(): KeepLiveTCP
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

const options: LiveOptions = {}

function traverseObject(arr: any[], output: any[] = []) {
  for (const key in arr) {
    const t = Array.isArray(arr[key])
    output.push([key, t ? traverseObject(arr[key]) : arr[key]])
  }
  return output
}

function getEmoji(extra) {
  const shouldParseInMessageEmoticon = /\[.*?\]/.test(extra.content)
  let inMessageEmoticon
  if (shouldParseInMessageEmoticon) {
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
    if (extra.emots) {
      inMessageEmoticon = Object.keys(extra.emots).reduce((acc, key) => {
        const emoticon = extra.emots[key]
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
  return inMessageEmoticon
}

const map: Mapping = {
  user: {
    type: 'nested',
    nested: {
      uid: {
        type: 'data',
        path: [2, 0]
      },
      uname: {
        type: 'data',
        path: [2, 1]
      },
      face: {
        type: 'data',
        path: [0, 15, 'user', 'base']
      },

      badge: {
        type: 'nested',
        nested: {
          active: {
            type: 'dataCall',
            path: [3, 7],
            call: (val) => val !== 12632256
          },
          name: {
            type: 'data',
            path: [3, 1]
          },
          level: {
            type: 'data',
            path: [3, 0]
          },
          color: {
            type: 'color',
            path: [3, 4]
          },
          gradient: {
            type: 'nested',
            nested: [
              {
                type: 'color',
                path: [3, 7]
              },
              {
                type: 'color',
                path: [3, 8]
              },
              {
                type: 'color',
                path: [3, 9]
              }
            ]
          },
          anchor: {
            type: 'nested',
            nested: {
              uid: {
                type: 'data',
                path: [3, 12]
              },
              uname: {
                type: 'data',
                path: [3, 2]
              },
              room_id: {
                type: 'data',
                path: [3, 2]
              },
              is_same_room: {
                type: 'data',
                path: [3, 3]
              }
            }
          }
        }
      },
      identity: {
        type: 'nested',
        nested: {
          rank: {
            type: 'data',
            path: [4, 4]
          },
          guard_level: {
            type: 'data',
            path: [4, 4]
          },
          room_admin: {
            type: 'dataCall',
            path: [2, 2],
            call: (val) => val === 1
          }
        }
      }
    }
  },
  timestamp: {
    type: 'data',
    path: [0, 4]
  },
  lottery: {
    type: 'dataCall',
    path: [0, 9],
    call: (val) => val !== 0
  },
  content: {
    type: 'data',
    path: [1]
  },
  emoticon: {
    type: 'nested',
    nested: {
      id: {
        type: 'data',
        path: [0, 13, 'emoticon_unique']
      },
      height: {
        type: 'data',
        path: [0, 13, 'height']
      },
      width: {
        type: 'data',
        path: [0, 13, 'width']
      },
      url: {
        type: 'data',
        path: [0, 13, 'url']
      }
    }
  },
  in_message_emoticon: {
    type: 'dataCall',
    path: [0, 15, 'extra'],
    call: (val) => getEmoji(JSON.parse(val))
  }
}

new Monitor(6154037, options).live.on(EVENTS.DANMU_MSG, (data: any) => {
  // log(JSON.stringify(transform(data.info, map)))
  log(transform(data.info, map))
})
