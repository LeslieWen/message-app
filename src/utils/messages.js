const generateMessage=(username,text)=>{ //generateMessage w timestamp
    return{
        username,
        text,
        createdAt:new Date().getTime()
    }
}
module.exports={
    generateMessage
}