import crypto from 'node:crypto'

/**
 * 鉴权加密
 */
export function getEncodeHeader(params = {}, appKey: string, appSecret: string) {
  const timestamp = parseInt(Date.now() / 1000 + '')
  const nonce = parseInt(Math.random() * 100000 + '') + timestamp
  const header: Record<string, string | number> = {
    'x-bili-accesskeyid': appKey,
    'x-bili-content-md5': getMd5Content(JSON.stringify(params)),
    'x-bili-signature-method': 'HMAC-SHA256',
    'x-bili-signature-nonce': nonce + '',
    'x-bili-signature-version': '1.0',
    'x-bili-timestamp': timestamp
  }
  const data: string[] = []
  for (const key in header) {
    data.push(`${key}:${header[key]}`)
  }

  const signature = crypto.createHmac('sha256', appSecret).update(data.join('\n')).digest('hex')
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...header,
    Authorization: signature
  }
}

/**
 * MD5加密
 */
export function getMd5Content(str: string) {
  return crypto.createHash('md5').update(str).digest('hex')
}
