const Datauser = require('../model/userModel')
const fs = require('fs')
const path = require('path')

exports.insertuser = (req,res)=>{
    let {username,email,phone,address} = req.body
    
    let dataSave = new Datauser({
   username: username,
    email: email,
    phone: phone,
    address: address
    })
    dataSave.save().then((doc)=>{
        res.status(200).json({
            message:"Insert Berhasilasdasdasd!",
            timestamp: req.requestTime,
            data: doc
        })
    }).catch(err=>{
        res.status(400).send("Gagal Insert Data ERR : "+err)
    })
}

exports.getuser = (req,res)=>{
    Datauser.find().exec((err,doc)=>{
        if(!err){
            res.status(200).json({
                message:"Berhasil mendapatkan semua data!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal mendapatkan Data ERR : "+err)
        }
    })
    
}

exports.getuserByID = (req,res)=>{
    let iduser = req.params.id
    Datauser.findById(iduser).exec((err,doc)=>{
        if(!err){
            res.status(200).json({
                message:"Berhasil mendapatkan semua data!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal mendapatkan Data ERR : "+err)
        }
    })
}

exports.updateuser  = (req,res,next) =>{
    let id = req.params.id
    Datauser.findByIdAndUpdate(id,req.body,(err,doc)=>{
        if(!err){

            // console.log(doc)
            res.status(200).json({
              message:"Berhasil Update buah dengan rasa "+id,
              data:doc
          })
      } else{
          res.status(400).send("Gagal Update "+ err)
      }
  })
}

exports.deleteuser = (req,res)=>{
    let id = req.params.id;
    Datauser.findOneAndDelete({ _id: id }, (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({
          message: `Users dengan id = ${id} Berhasil dihapus`,
          data: data,
        });
      }
    });
}
  
  
exports.getUserByUsername = (req, res,next) => {
  let username = req.params.username;
  Datauser.find({username:{$regex:username,$options:'i'}}).exec((err,doc)=>{
    if(!err){
        res.status(200).json({
            message:"Berhasil mendapatkan buah dengan rasa "+username,
            data:doc
        })
    }
    else{
        res.status(400).send("Gagal mendapatkan buah" + err)
    }
})
};
  exports.getUserByPhone = (req, res,next) => {
    let phone = req.params.phone;
    Datauser.find({phone:{$regex:phone,$options:'i'}}).exec((err,doc)=>{
      if(!err){
          res.status(200).json({
              message:"Berhasil mendapatkan buah dengan rasa "+phone,
              data:doc
          })
      }
      else{
          res.status(400).send("Gagal mendapatkan buah" + err)
      }
  })
  };

  exports.getUserByEmail = (req, res,next) => {
    let email = req.params.email;
    Datauser.find({email:{$regex:email,$options:'i'}}).exec((err,doc)=>{
      if(!err){
          res.status(200).json({
              message:"Berhasil mendapatkan buah dengan rasa "+email,
              data:doc
          })
      }
      else{
          res.status(400).send("Gagal mendapatkan buah" + err)
      }
  })
  };

  
  exports.getUserByAddress = (req, res,next) => {
    let address = req.params.address;
    Datauser.find({address:{$regex:address,$options:'i'}}).exec((err,doc)=>{
      if(!err){
          res.status(200).json({
              message:"Berhasil mendapatkan buah dengan rasa "+address,
              data:doc
          })
      }
      else{
          res.status(400).send("Gagal mendapatkan buah" + err)
      }
  })
  };
  
