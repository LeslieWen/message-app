const path = require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')

const app=express()
const server=http.createServer(app)
const io=socketio(server) //server now supports websockets

const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection',()=>{
    console.log("new websocket connection")//server setup and client connected to it
})

server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`)
})