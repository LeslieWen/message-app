const socket=io()

//HTML element selectors
const $messageForm=document.querySelector('#message-form')
const $messageFormInput=$messageForm.querySelector('input')
const $messageFormButton=$messageForm.querySelector('button')
const $messages=document.querySelector('#messages')
const messageTemplate=document.querySelector('#message-block').innerHTML
const sidebarTemplate=document.querySelector('#sidebar-block').innerHTML

//Query String selector
const {username}=Qs.parse(location.search, {ignoreQueryPrefix:true})

const autoscroll=()=>{
    
}

socket.on('message',(message)=>{
    const htmlStuff=Mustache.render(messageTemplate,{
        username:message.username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm A') // Moment.js format date
    })
    $messages.insertAdjacentHTML('beforeend',htmlStuff)
    console.log(message)
})
$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault() 
    $messageFormButton.setAttribute('disabled','disabled')//disable form
    const message=e.target.elements.message.value
    $messageFormInput.value=''
    $messageFormInput.focus()
    socket.emit('sendMessage',message,(error)=>{
        $messageFormButton.removeAttribute('disabled')//enable form
        if(error){
            console.log(error)
            return error
        }
        console.log('Message was sent.')
    })
})
socket.on('roomInfo',({room,users})=>{
    const html=Mustache.render(sidebarTemplate,{
        users
    })
    document.querySelector('#sidebar').innerHTML=html
})

socket.emit('join',{username},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})
