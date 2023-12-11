/**
 * 鉴权加密
 */
export declare function getEncodeHeader(params: {} | undefined, appKey: string, appSecret: string): {
    Authorization: string;
    Accept: string;
    'Content-Type': string;
};
/**
 * MD5加密
 */
export declare function getMd5Content(str: string): string;
