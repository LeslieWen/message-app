const {generateMessage}=require('./utils/messages.js')
const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const Filter=require('bad-words')
const app=express()
const server=http.createServer(app)
const io=socketio(server) //server now supports websockets
const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

io.on('connection',(socket)=>{
    console.log("New websocket connection")
    socket.emit('message',generateMessage('WELCOME!'))
    socket.broadcast.emit('message',generateMessage('1 user has joined.'))
    socket.on('sendMessage',(message,callback)=>{ //receive sendMessage event from client
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('No bad words allowed.')
        }
        io.emit('message',generateMessage(message)) //emit to everyone
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