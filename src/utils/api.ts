import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { getEncodeHeader } from './encode'
import { CODE_MESSAGE } from './error-code'
import { BiliRequestConfig, CreateApiOptions } from '../types'

export function createApi(options: CreateApiOptions) {
  const { baseURL, appKey, appSecret } = options

  // axios 拦截器
  const api = axios.create({
    baseURL
  })

  // 鉴权加密处理headers，下次请求自动带上
  api.interceptors.request.use((config) => {
    const headers = getEncodeHeader(config.data, appKey, appSecret)
    config.headers = headers as any
    return config
  })

  // 抛出已知的错误消息
  api.interceptors.response.use((res: AxiosResponse<BiliRequestConfig>) => {
    const { code } = res.data
    if (CODE_MESSAGE[code]) {
      throw new Error(CODE_MESSAGE[code])
    }
    return res
  })

  return api
}
