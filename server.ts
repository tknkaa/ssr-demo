import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { render } from './dist/server/entry-server.js'

const app = new Hono()
const template = await Bun.file('./dist/client/index.html').text()

app.use('/assets/*', serveStatic({ root: './dist/client' }))

app.get('*', (c) => {
  const html = render()
  return c.html(template.replace('<!--ssr-outlet-->', html))
})

export default app
