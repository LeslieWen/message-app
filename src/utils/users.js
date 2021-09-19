const users=[]

const addUser=({id, username,room})=>{
    //Data Cleansing
    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()
    if(!username){
        return {
            error:'A username is required'
        }
    }
    const existingUsername=users.find((user)=>{
        return user.room===room && username.name===username
    })
    if(existingUsername){
        return{
            error:'Entered username is not unique.'
        }
    }
    //Populate array
    const user={id,username,room}
    users.push(user)
    return{user}
}
const removeUser=(id)=>{
    const index=users.findIndex((user)=>user.id===id)
    if(index!==-1){
        return users.splice(index,1)[0]
    }
}

