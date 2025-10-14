import NProgress from 'nprogress'

/** Show progress bar when the input async function is running. */
export default function withProgressBar<T, K extends unknown[]>(
  func: ((...args: K) => Promise<T>),
) {
  return async (...args: K): Promise<T> => {
    NProgress.start()
    let response: T
    try {
      response = await func(...args)
      NProgress.done()
    }
    catch (e) {
      NProgress.done()
      throw e
    }
    return response
  }
}
