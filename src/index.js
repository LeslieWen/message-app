const {generateMessage}=require('./utils/messages.js')
const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const Filter=require('bad-words')
const Qs = require('qs')
const app=express()
const server=http.createServer(app)
const io=socketio(server) //server now supports websockets
const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

io.on('connection',(socket)=>{
    console.log("New websocket connection")
    //socket.emit('message',generateMessage('Welcome to the React Message App'))
    //socket.broadcast.emit('message',generateMessage('1 user has joined.'))

    socket.on('join',({username})=>{
        socket.join("default-room")
        socket.emit('message',generateMessage('Welcome to the React Message App'))
        socket.broadcast.to("default-room").emit('message',generateMessage(`${username} has joined the chat.`))
    })
    
    socket.on('sendMessage',(message,callback)=>{ //receive sendMessage event from client
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('No bad words allowed.')
        }
        io.to("default-room").emit('message',generateMessage(message))
        callback() // acknowledge
    })
    socket.on('sendLocation',(coords,callback)=>{
        io.emit('message',`Location: ${coords.latitude}, ${coords.longitude}`)
        callback()
    })
    socket.on('disconnect',()=>{
        io.emit('message',generateMessage('1 user has left'))
    })
})
server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`)
})