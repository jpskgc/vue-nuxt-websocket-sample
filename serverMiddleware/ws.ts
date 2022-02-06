import http from 'http'
import WebSocket from 'ws'
import express from 'express'

const app = express()
const server = http.createServer(app)

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', function connection (ws) {
  ws.on('message', function message (data) {
    console.log('received: %s', data)

    wss.clients.forEach((client) => {
      client.send('test')
    })
  })

  ws.send('something')
})

module.exports = { path: '/sample', handler: app }
