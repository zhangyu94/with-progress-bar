import NProgress from 'nprogress'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import withProgressBar from '../src/index'

// Mock NProgress
vi.mock('nprogress', () => ({
  default: {
    start: vi.fn(),
    done: vi.fn(),
  },
}))

describe('withProgressBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should call NProgress.start() and NProgress.done() on successful execution', async () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue('success')
    const wrappedFunction = withProgressBar(mockAsyncFunction)

    const result = await wrappedFunction('arg1', 'arg2')

    expect(NProgress.start).toHaveBeenCalledOnce()
    expect(NProgress.done).toHaveBeenCalledOnce()
    expect(mockAsyncFunction).toHaveBeenCalledWith('arg1', 'arg2')
    expect(result).toBe('success')
  })

  it('should call NProgress.start() and NProgress.done() on error and rethrow the error', async () => {
    const error = new Error('Test error')
    const mockAsyncFunction = vi.fn().mockRejectedValue(error)
    const wrappedFunction = withProgressBar(mockAsyncFunction)

    await expect(wrappedFunction('arg1')).rejects.toThrow('Test error')

    expect(NProgress.start).toHaveBeenCalledOnce()
    expect(NProgress.done).toHaveBeenCalledOnce()
    expect(mockAsyncFunction).toHaveBeenCalledWith('arg1')
  })

  it('should work with functions that have no arguments', async () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue('no args')
    const wrappedFunction = withProgressBar(mockAsyncFunction)

    const result = await wrappedFunction()

    expect(NProgress.start).toHaveBeenCalledOnce()
    expect(NProgress.done).toHaveBeenCalledOnce()
    expect(mockAsyncFunction).toHaveBeenCalledWith()
    expect(result).toBe('no args')
  })

  it('should preserve the original function\'s return type', async () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue({ data: 'test', count: 42 })
    const wrappedFunction = withProgressBar(mockAsyncFunction)

    const result = await wrappedFunction()

    expect(result).toEqual({ data: 'test', count: 42 })
    expect(typeof result).toBe('object')
  })

  it('should handle functions that return undefined', async () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue(undefined)
    const wrappedFunction = withProgressBar(mockAsyncFunction)

    const result = await wrappedFunction()

    expect(result).toBeUndefined()
    expect(NProgress.start).toHaveBeenCalledOnce()
    expect(NProgress.done).toHaveBeenCalledOnce()
  })
})
