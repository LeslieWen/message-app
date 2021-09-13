const socket=io()

socket.on('message',(message)=>{
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e)=>{
    e.preventDefault() //prevent page reload
    const message=e.target.elements.message.value
    socket.emit('sendMessage',message)//send from client to server
})

