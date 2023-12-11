export function retry(retryCount: number) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          await new Promise<void>((res) => setTimeout(res, 1000))
          const result = await originalMethod.apply(this, args)
          return result
        } catch (error) {
          console.error(`Attempt ${attempt} failed: ${error}`)
        }
      }
      throw new Error(`Failed after ${retryCount} attempts`)
    }

    return descriptor
  }
}
