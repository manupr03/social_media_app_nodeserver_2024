const { readDB, writeDB } = require('../services/dbService');
const { genSaltSync,hashSync,compareSync} = require('bcrypt');
const { sign } = require('jsonwebtoken');


 const getUsers = (req,res)=>{
    readDB((err,db)=>{
        if(err){
            return res.status(500).json({
                status:0,
                message:"Database connection error"
            })
        }
        res.status(200).json({
            status:1,
            data:db
        })
    })
}

const addUser = (req,res)=>{

    readDB((err,db)=>{
        if(err){
            return res.status(500).json({
                status:0,
                message:"Database1 connection error"
            })
        }
        // Add the new user to the users array
        db.users.push(req.body);
        writeDB(db,(err,result)=>{
            if(err){
                return res.status(500).json({
                    status:0,
                    message:"Database connection error"
                })
            }
    
            return res.status(200).json({
                status:1,
                data:result
            })
        })
    

    })


}



module.exports = {
    getUsers,
    addUser
}

