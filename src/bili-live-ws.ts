import Type from 'bilibili-live-ws'
import { LiveWS } from 'bilibili-live-ws'
type BiliLiveWS = typeof Type
export { LiveWS }
export default require('bilibili-live-ws') as BiliLiveWS
