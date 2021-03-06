const users=[]

const addUser=({id,username,room})=>{
    //Data Cleansing
    if(!username){
        return {
            error:'A username is required'
        }
    }
    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()

    const existingUsername=users.find((user)=>{
        return username.name===username
    })
    if(existingUsername){
        console.log("not unique")
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
const getUser=(id)=>{
    return users.find((user)=>user.id===id)
}
const getUsersInRoom=(room)=>{
    return users.filter((user)=>user.room===room)
}
module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
