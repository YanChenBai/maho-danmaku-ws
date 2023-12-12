"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApi = void 0;
const encode_1 = require("./encode");
const error_code_1 = require("./error-code");
const logger_1 = require("./logger");
const axios = require('axios/dist/browser/axios.cjs');
function createApi(options) {
    const { baseURL, appKey, appSecret } = options;
    // axios 拦截器
    const api = axios.create({
        baseURL
    });
    // 鉴权加密处理headers，下次请求自动带上
    api.interceptors.request.use((config) => {
        const headers = (0, encode_1.getEncodeHeader)(config.data, appKey, appSecret);
        config.headers = headers;
        return config;
    });
    // 抛出已知的错误消息
    api.interceptors.response.use((res) => {
        const { code } = res.data;
        if (error_code_1.CODE_MESSAGE[code]) {
            logger_1.logger.error(error_code_1.CODE_MESSAGE[code], '--->', {
                url: res.config.url,
                data: res.config.data,
                params: res.config.params
            });
        }
        return res;
    });
    return api;
}
exports.createApi = createApi;
