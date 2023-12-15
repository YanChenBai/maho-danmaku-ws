"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApi = void 0;
const axios_1 = __importDefault(require("axios"));
const error_code_1 = require("./error-code");
function createApi(options) {
    const { baseURL, token } = options;
    // axios 拦截器
    const api = axios_1.default.create({
        baseURL
    });
    // 鉴权加密处理headers，下次请求自动带上
    api.interceptors.request.use((config) => {
        config.headers['Authorization'] = token;
        return config;
    });
    // 抛出已知的错误消息
    api.interceptors.response.use((res) => {
        const { code } = res.data;
        if (error_code_1.CODE_MESSAGE[code]) {
            throw new Error(error_code_1.CODE_MESSAGE[code]);
        }
        return res;
    });
    return api;
}
exports.createApi = createApi;
