# with-progress-bar

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]

A lightweight utility that wraps async functions with [NProgress](https://github.com/rstacruz/nprogress) to automatically show a progress bar during execution.

## Installation

```bash
npm install with-progress-bar
```

## Usage

Import and wrap your async functions to automatically show a progress bar:

```typescript
import withProgressBar from 'with-progress-bar'
import 'with-progress-bar/index.css'

// Wrap any async function
const fetchData = withProgressBar(async (url: string) => {
  const response = await fetch(url)
  return response.json()
})

// Use the wrapped function - progress bar will show automatically
const data = await fetchData('https://api.example.com/data')
```

> **Note:** Works for async functions only. Sync functions block the main thread, so progress bars won't animate properly.

## API

### `withProgressBar<T, K extends unknown[]>(func: (...args: K) => Promise<T>)`

Wraps an async function to automatically show a progress bar during execution.

**Parameters:**
- `func`: The async function to wrap

**Returns:**
- A new async function that behaves identically to the original, but shows a progress bar during execution

## Development Instructions

For development, open `./playground.html` to check the built package works correctly.

This repository is initialized with [starter-ts](https://github.com/antfu/starter-ts).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/with-progress-bar?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/with-progress-bar
[npm-downloads-src]: https://img.shields.io/npm/dm/with-progress-bar?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/with-progress-bar
[bundle-src]: https://img.shields.io/bundlephobia/minzip/with-progress-bar?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=with-progress-bar
