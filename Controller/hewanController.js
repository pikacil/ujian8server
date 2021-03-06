const DataHewan = require('../model/hewanModel')
const fs = require('fs')
const path = require('path')

exports.insertHewan = (req,res)=>{
    let {namaHewan,jenisHewan,jenisKelaminHewan,umurHewan} = req.body
    let gambarHewan = []
    req.files.forEach((data)=>{
        gambarHewan.push(data.path)
    })
    let dataSave = new DataHewan({
        namaHewan:namaHewan,
        jenisHewan:jenisHewan,
        jenisKelaminHewan:jenisKelaminHewan,
        umurHewan:umurHewan,
        gambarHewan:gambarHewan
    })
    dataSave.save().then((doc)=>{
        res.status(200).json({
            message:"Insert Berhasil!",
            data: doc
        })
    }).catch(err=>{
        res.status(400).send("Gagal Insert Data ERR : "+err)
    })
}

exports.getHewan = (req,res)=>{
    DataHewan.find().exec((err,doc)=>{
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

exports.getHewanByID = (req,res)=>{
    let idHewan = req.params.id
    DataHewan.findById(idHewan).exec((err,doc)=>{
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

exports.updateHewan = (req,res)=>{
    let idHewan=req.params.id
    DataHewan.findByIdAndUpdate(idHewan,req,(err,doc)=>{
        if(!err){
            req.files.forEach((data,i)=>{
                let oldPath = doc.gambarHewan[i]
                let newPath = data.path
                fs.rename(newPath,oldPath,(err)=>{
                    if(err){
                        throw err;
                    }
                })
            })
            res.status(200).json({
                message:"Update Berhasil!",
                data: doc
            })
        } else{
            res.status(400).send("Gagal Insert Data ERR : "+err)
        }
    })

}

exports.deleteHewan = (req,res)=>{
    let idHewan = req.params.id
    DataHewan.findByIdAndDelete(idHewan,(err,doc)=>{
        if(!err){
            doc.gambarHewan.forEach((data)=>{
                removeImages(data)
            })

            res.status(200).json({
                message:"Delete Berhasil!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal Insert Data ERR : "+err)
        }
    })
}


const removeImages = (filepath)=>{
    filepath = path.join(__dirname, '../', filepath);
    fs.unlink(filepath, err => {
        console.log(err)
    })
}