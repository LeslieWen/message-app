const socket=io()

//HTML element selectors
const $messageForm=document.querySelector('#message-form')
const $messageFormInput=$messageForm.querySelector('input')
const $messageFormButton=$messageForm.querySelector('button')
const $messages=document.querySelector('#messages')
const messageTemplate=document.querySelector('#message-block').innerHTML

socket.on('message',(message)=>{
    const htmlStuff=Mustache.render(messageTemplate,{
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

