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

const loginUser = async (req,res)=>{
    const {email,password} = req.body

    try{
        readDB((err,db)=>{
            if(err){
                return res.status(500).json({
                    status:0,
                    message:"Database connection error"
                })
            }

            const user = db.users.find(usr=>usr.email === email)

            if(!user){
                return res.status(200).json({
                    status:0,
                    message:'invalid email or password!'
                })
            }

            const isPasswordValid = db.users.find(usr=>usr.password === password)

            if(!isPasswordValid){
                return res.status(200).json({
                    status:0,
                    message:'invalid email or password!'
                })
            }
            
            return res.status(200).json({
                message:"Login successfull",
                data:user
                });



        })

    }catch(err){
        return res.status(500).json({message:"Internal server error",error:err})
    }
   

}

const registerUser = (req,res)=>{
    const { email } = req.body
    readDB((err,db)=>{
        if(err){
            return res.status(500).json({
                status:0,
                message:"Database connection error"
            })
        }

        const user = db.users.find(usr=>usr.email==email)
        if(user){
            return res.status(400).json({
                status:0,
                message:"An account with this email already exists"
            })
        }else{
            db.users.push(req.body)
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
        }

        
        

        console.log('registerUser',user,!user)
    })
}



module.exports = {
    getUsers,
    addUser,
    loginUser,
    registerUser
}

