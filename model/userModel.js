const mongodb = require('mongoose')

const Modeluser = new mongodb.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    }
})

const Datauser = mongodb.model('datauser',Modeluser)

module.exports = Datauser