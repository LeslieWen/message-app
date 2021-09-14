const generateMessage=(text)=>{ //generateMessage w timestamp
    return{
        text,
        createdAt:new Date().getTime()
    }
}
module.exports={
    generateMessage
}