const express = require('express')
const ws = require('ws')

const app = express()

const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    wsServer.clients.forEach((client) => {
      client.send(message)
    })
  })
})

const server = app.listen(8080)
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit('connection', socket, request)
  })
})

module.exports = { path: '/', handler: server }
