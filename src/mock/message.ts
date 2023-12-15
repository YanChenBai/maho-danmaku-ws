import { DanmakuMessage, DM, Gift, SuperChat, GuardBuy, DanmakuCMD } from '../types'

export const danmu: DanmakuMessage<DM>[] = [
  ...[1, 5, 10, 15, 22, 26, 30, 36, 38].map((item) => ({
    data: {
      emoji_img_url: '',
      fans_medal_level: item,
      fans_medal_name: '王菠萝',
      fans_medal_wearing_status: true,
      guard_level: 0,
      msg: '[dog]',
      timestamp: 1702266059,
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      dm_type: 0,
      msg_id: 'b9bf3c98-188d-4931-8ef8-bcdf6fe6c1ff',
      room_id: 8315781
    },
    cmd: DanmakuCMD.DM
  })),
  {
    data: {
      emoji_img_url: '',
      fans_medal_level: 22,
      fans_medal_name: '王菠萝',
      fans_medal_wearing_status: true,
      guard_level: 0,
      msg: '[dog]',
      timestamp: 1702266059,
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      dm_type: 0,
      msg_id: 'b9bf3c98-188d-4931-8ef8-bcdf6fe6c1ff',
      room_id: 8315781
    },
    cmd: DanmakuCMD.DM
  },
  {
    data: {
      emoji_img_url: '',
      fans_medal_level: 22,
      fans_medal_name: '王菠萝',
      fans_medal_wearing_status: true,
      guard_level: 2,
      msg: '[dog]',
      timestamp: 1702266059,
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      dm_type: 0,
      msg_id: 'b9bf3c98-188d-4931-8ef8-bcdf6fe6c1ff',
      room_id: 8315781
    },
    cmd: DanmakuCMD.DM
  },
  {
    data: {
      emoji_img_url: 'http://i0.hdslb.com/bfs/live/7b7a2567ad1520f962ee226df777eaf3ca368fbc.png',
      fans_medal_level: 11,
      fans_medal_name: '王菠萝',
      fans_medal_wearing_status: false,
      guard_level: 1,
      msg: '妙啊',
      timestamp: 1702267492,
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      dm_type: 1,
      msg_id: '96df2bc8-6dc2-4696-905c-1c7704b4cbf6',
      room_id: 8315781
    },
    cmd: DanmakuCMD.DM
  },
  {
    data: {
      emoji_img_url: 'http://i0.hdslb.com/bfs/live/7b7a2567ad1520f962ee226df777eaf3ca368fbc.png',
      fans_medal_level: 11,
      fans_medal_name: '王菠萝',
      fans_medal_wearing_status: false,
      guard_level: 2,
      msg: '妙啊',
      timestamp: 1702267492,
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      dm_type: 1,
      msg_id: '96df2bc8-6dc2-4696-905c-1c7704b4cbf6',
      room_id: 8315781
    },
    cmd: DanmakuCMD.DM
  },
  {
    data: {
      emoji_img_url: 'http://i0.hdslb.com/bfs/live/7b7a2567ad1520f962ee226df777eaf3ca368fbc.png',
      fans_medal_level: 11,
      fans_medal_name: '王菠萝',
      fans_medal_wearing_status: false,
      guard_level: 3,
      msg: '妙啊',
      timestamp: 1702267492,
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      dm_type: 1,
      msg_id: '96df2bc8-6dc2-4696-905c-1c7704b4cbf6',
      room_id: 8315781
    },
    cmd: DanmakuCMD.DM
  }
]

export const superChat: DanmakuMessage<SuperChat>[] = [
  {
    data: {
      guard_level: 0,
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      message_id: 3992851,
      message: '进行一个鱼的摸',
      rmb: 30,
      timestamp: 1652413567,
      start_time: 1652413567,
      end_time: 1652413627,
      fans_medal_level: 0,
      fans_medal_name: '',
      fans_medal_wearing_status: false,
      msg_id: '968e07ea-49e6-478c-867e-b721ccbd0d62',
      room_id: 4639581
    },
    cmd: DanmakuCMD.SUPER_CHAT
  }
]

export const gift: DanmakuMessage<Gift>[] = [
  {
    data: {
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      gift_id: 31036,
      gift_name: '小花花',
      gift_num: 1,
      price: 100,
      paid: true,
      fans_medal_level: 0,
      fans_medal_name: '',
      fans_medal_wearing_status: false,
      guard_level: 0,
      timestamp: 1702266220,
      anchor_info: {
        uface: 'https://i2.hdslb.com/bfs/face/c24a9960559de16379efff1a70016a01861efdd6.jpg',
        uid: 263135375,
        uname: '白厌尘yanchen'
      },
      gift_icon: 'https://s1.hdslb.com/bfs/live/8b40d0470890e7d573995383af8a8ae074d485d9.png',
      combo_gift: true,
      combo_info: {
        combo_base_num: 1,
        combo_count: 1,
        combo_id: 'batch:gift:combo_id:3537104514583344:263135375:31036:1702266220.6283',
        combo_timeout: 5
      },
      msg_id: '1b40cb54-3cd6-4513-9a10-6cbb8ead79ff',
      room_id: 8315781
    },
    cmd: DanmakuCMD.GIFT
  },
  {
    data: {
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      gift_id: 32755,
      gift_name: '稳',
      gift_num: 1,
      price: 100,
      paid: true,
      fans_medal_level: 0,
      fans_medal_name: '',
      fans_medal_wearing_status: false,
      guard_level: 0,
      timestamp: 1702266728,
      anchor_info: {
        uface: 'https://i2.hdslb.com/bfs/face/c24a9960559de16379efff1a70016a01861efdd6.jpg',
        uid: 263135375,
        uname: '白厌尘yanchen'
      },
      gift_icon: 'https://s1.hdslb.com/bfs/live/bac5cbb829ec697e8219af0dafdfa074e515c05c.png',
      combo_gift: true,
      combo_info: {
        combo_base_num: 1,
        combo_count: 1,
        combo_id: 'batch:gift:combo_id:3537104514583344:263135375:32755:1702266728.6002',
        combo_timeout: 5
      },
      msg_id: '02ace485-25bd-4dad-8ed3-f3659a9d2ffb',
      room_id: 8315781
    },
    cmd: DanmakuCMD.GIFT
  },
  {
    data: {
      uid: 3537104514583344,
      uname: '洛芷尘',
      uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg',
      gift_id: 30607,
      gift_name: '小心心',
      gift_num: 1,
      price: 0,
      paid: false,
      fans_medal_level: 25,
      fans_medal_name: 'Anti粉',
      fans_medal_wearing_status: true,
      guard_level: 3,
      timestamp: 1650717898,
      gift_icon: 'https://s1.hdslb.com/bfs/live/bac5cbb829ec697e8219af0dafdfa074e515c05c.png',
      anchor_info: {
        uface: 'https://i2.hdslb.com/bfs/face/c24a9960559de16379efff1a70016a01861efdd6.jpg',
        uid: 263135375,
        uname: '白厌尘yanchen'
      },
      combo_gift: false,
      msg_id: 'e0677be6-4d08-49bc-a722-17238b0f370b',
      room_id: 4639581
    },
    cmd: DanmakuCMD.GIFT
  }
]

export const guardBuy: DanmakuMessage<GuardBuy>[] = [
  {
    data: {
      user_info: {
        uid: 3537104514583344,
        uname: '洛芷尘',
        uface: 'https://i0.hdslb.com/bfs/face/a4710f015f22edc55726d4ed9171426d1ac5cb12.jpg'
      },
      guard_level: 3,
      guard_num: 1,
      guard_unit: '月',
      fans_medal_level: 0,
      fans_medal_name: '',
      fans_medal_wearing_status: false,
      timestamp: 1654801753,
      msg_id: '415d1592-9f76-4c84-9a59-4a2ee081a4dd',
      room_id: 4639581
    },
    cmd: DanmakuCMD.GUARD_BUY
  }
]
