const {generateMessage}=require('./utils/messages.js')
const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const Filter=require('bad-words')
const Qs = require('qs')
const {addUser,removeUser,getUser,getUsersInRoom}=require('./utils/users.js')

const app=express()
const server=http.createServer(app)
const io=socketio(server) //server now supports websockets
const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

io.on('connection',(socket)=>{
    console.log("New websocket connection")

    socket.on('join',({username},callback)=>{
        const {error,user}=addUser({id:socket.id,username,room:"default-room"})
        
        if (error){
            return callback(error)
        }
        socket.join(user.room)
        
        socket.emit('message',generateMessage('System','Welcome to the React Message App'))
        socket.broadcast.to(user.room).emit('message',generateMessage('System',`${user.username} has joined the chat.`))
        io.to(user.room).emit('roomInfo',{
            room:user.room,
            users:getUsersInRoom(user.room)
        })
        callback()
    })

    socket.on('sendMessage',(message,callback)=>{ //receive sendMessage event from client
        const user=getUser(socket.id)
        
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('No bad words allowed.')
        }
        
        io.to(user.room).emit('message',generateMessage(user.username,message))
        callback() // acknowledge
    })

    socket.on('disconnect',()=>{
        const user=removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',generateMessage('System',`${user.username} has left`))
            io.to(user.room).emit('roomInfo',{
                room:user.room,
                users:getUsersInRoom(user.room)
            })
        }
    })
})
server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`)
})