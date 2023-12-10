import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { getEncodeHeader } from './encode'
import type { BiliRequestConfig, CreateApiOptions } from '../types/api'
import { CODE_MESSAGE } from './error-code'
import { logger } from './logger'

export function createApi(options: CreateApiOptions) {
  const { baseURL, appKey, appSecret } = options

  // axios 拦截器
  const api = axios.create({
    baseURL
  })

  // 鉴权加密处理headers，下次请求自动带上
  api.interceptors.request.use((config) => {
    const headers = getEncodeHeader(config.data, appKey, appSecret)
    logger.info(headers)
    config.headers = headers as any
    return config
  })

  // 抛出已知的错误消息
  api.interceptors.response.use((res: AxiosResponse<BiliRequestConfig>) => {
    const { code } = res.data
    if (CODE_MESSAGE[code]) {
      logger.error(CODE_MESSAGE[code], '--->', {
        url: res.config.url,
        data: res.config.data,
        params: res.config.params
      })
    }
    return res
  })

  return api
}
