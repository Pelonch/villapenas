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

function shouldServeApplication(pathname) {
  if (extname(pathname)) {
    return false
  }

  return !['/assets', '/images', '/videos'].some(
    (directory) => pathname === directory || pathname.startsWith(`${directory}/`),
  )
}

function getCacheControl(filePath) {
  const pathFromDist = relative(distDirectory, filePath)

  return pathFromDist.startsWith(`assets${sep}`)
    ? 'public, max-age=31536000, immutable'
    : 'no-cache'
}

function sendFile(response, filePath, fileStats, method) {
  const contentType = mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream'

  response.writeHead(200, {
    'Cache-Control': getCacheControl(filePath),
    'Content-Length': fileStats.size,
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
  })

  if (method === 'HEAD') {
    response.end()
    return
  }

  createReadStream(filePath).pipe(response)
}

async function getFileStats(filePath) {
  try {
    const fileStats = await stat(filePath)

    return fileStats.isFile() ? fileStats : null
  } catch {
    return null
  }
}

await access(indexPath)

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' })
    response.end()
    return
  }

  let pathname

  try {
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
  } catch {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Bad request')
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
    sendFile(response, requestedFilePath, requestedFileStats, request.method)
    return
  }

  // Only document-like paths receive the SPA shell; missing assets retain a real 404.
  if (shouldServeApplication(pathname)) {
    const indexStats = await getFileStats(indexPath)

    if (indexStats) {
      sendFile(response, indexPath, indexStats, request.method)
      return
    }
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
