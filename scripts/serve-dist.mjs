import { createReadStream } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, relative, resolve, sep } from 'node:path'

const distDirectory = resolve(process.cwd(), 'dist')
const indexPath = resolve(distDirectory, 'index.html')
const requestedPort = Number.parseInt(process.env.PORT ?? '4173', 10)
const port = Number.isInteger(requestedPort) && requestedPort > 0 && requestedPort < 65_536
  ? requestedPort
  : 4173

const mimeTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
}

function isSafePath(filePath) {
  const pathFromDist = relative(distDirectory, filePath)

  return !pathFromDist.startsWith(`..${sep}`) && pathFromDist !== '..'
}

function getCanonicalPathname(pathname) {
  const pathWithoutTrailingSlash = pathname.replace(/\/+$/, '')

  return pathWithoutTrailingSlash || '/'
}

function redirect(response, location) {
  response.writeHead(308, {
    'Cache-Control': 'no-cache',
    Location: location,
  })
  response.end()
}

function getCacheControl(filePath) {
  const pathFromDist = relative(distDirectory, filePath)

  return pathFromDist.startsWith(`assets${sep}`)
    ? 'public, max-age=31536000, immutable'
    : 'no-cache'
}

function getByteRange(rangeHeader, size) {
  if (!rangeHeader) {
    return null
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader)

  if (!match || size === 0) {
    return undefined
  }

  const [, startValue, endValue] = match

  if (!startValue && !endValue) {
    return undefined
  }

  if (!startValue) {
    const suffixLength = Number(endValue)

    if (!Number.isInteger(suffixLength) || suffixLength <= 0) {
      return undefined
    }

    return {
      start: Math.max(size - suffixLength, 0),
      end: size - 1,
    }
  }

  const start = Number(startValue)
  const end = endValue ? Number(endValue) : size - 1

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    start >= size ||
    end < start
  ) {
    return undefined
  }

  return { start, end: Math.min(end, size - 1) }
}

function sendFile(response, filePath, fileStats, method, rangeHeader) {
  const contentType = mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream'
  const byteRange = getByteRange(rangeHeader, fileStats.size)

  if (byteRange === undefined) {
    response.writeHead(416, {
      'Content-Range': `bytes */${fileStats.size}`,
      'X-Content-Type-Options': 'nosniff',
    })
    response.end()
    return
  }

  const contentLength = byteRange ? byteRange.end - byteRange.start + 1 : fileStats.size

  response.writeHead(byteRange ? 206 : 200, {
    'Accept-Ranges': 'bytes',
    'Cache-Control': getCacheControl(filePath),
    'Content-Length': contentLength,
    ...(byteRange
      ? { 'Content-Range': `bytes ${byteRange.start}-${byteRange.end}/${fileStats.size}` }
      : {}),
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
  })

  if (method === 'HEAD') {
    response.end()
    return
  }

  createReadStream(filePath, byteRange ?? undefined).pipe(response)
}

async function getFileStats(filePath) {
  try {
    const fileStats = await stat(filePath)

    return fileStats.isFile() ? fileStats : null
  } catch {
    return null
  }
}

async function getRouteIndex(pathname) {
  const routeIndexPath = resolve(distDirectory, `.${pathname}`, 'index.html')

  if (!isSafePath(routeIndexPath)) {
    return null
  }

  const routeIndexStats = await getFileStats(routeIndexPath)

  return routeIndexStats ? { filePath: routeIndexPath, stats: routeIndexStats } : null
}

await access(indexPath)

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' })
    response.end()
    return
  }

  let requestUrl
  let pathname

  try {
    requestUrl = new URL(request.url ?? '/', 'http://localhost')
    pathname = decodeURIComponent(requestUrl.pathname)
  } catch {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Bad request')
    return
  }

  if (pathname === '/' || pathname === '/index.html') {
    redirect(response, `/es${requestUrl.search}`)
    return
  }

  if (pathname.endsWith('/index.html')) {
    const routePathname = getCanonicalPathname(pathname.slice(0, -'/index.html'.length))
    const routeIndexForFile = await getRouteIndex(routePathname)

    if (routeIndexForFile) {
      redirect(response, `${routePathname}${requestUrl.search}`)
      return
    }
  }

  const canonicalPathname = getCanonicalPathname(pathname)
  const routeIndex = await getRouteIndex(canonicalPathname)

  if (routeIndex) {
    if (canonicalPathname !== pathname) {
      redirect(response, `${canonicalPathname}${requestUrl.search}`)
      return
    }

    sendFile(response, routeIndex.filePath, routeIndex.stats, request.method, request.headers.range)
    return
  }

  const requestedFilePath = resolve(distDirectory, `.${pathname}`)

  if (!isSafePath(requestedFilePath)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Forbidden')
    return
  }

  const requestedFileStats = await getFileStats(requestedFilePath)

  if (requestedFileStats) {
    sendFile(response, requestedFilePath, requestedFileStats, request.method, request.headers.range)
    return
  }

  response.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  })
  response.end('Not found')
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Serving ${distDirectory} on port ${port}`)
})
