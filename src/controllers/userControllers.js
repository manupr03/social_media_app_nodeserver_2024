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

const getUserById = (req,res)=>{
    const userId = req.params.id
    try{
        readDB((err,db)=>{
            if(err){
                return res.status(500).json({
                    status:0,
                    error:"Database connection error",
                    message:"Database connection error"
                })
            }

            const user = db.users.find(usr=>usr.user_id==userId)
            if(user){
                return res.status(200).json({
                    status:1,
                    data:user,
                    message:"success"
                })
            }else{
                return res.status(400).json({
                    status:0,
                    error:"User not found",
                    message:"User not found"
                })
            }
        })
    }catch(err){
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

const addUser = (req,res)=>{
    const { firstname,lastname,email,mobile,password} = req.body

    readDB((err,db)=>{
        if(err){
            return res.status(500).json({
                status:0,
                message:"Database1 connection error"
            })
        }
        // Add the new user to the users array
        let newUser ={
            user_id: db.users.length+1,
            firstname,lastname,email,mobile,password
        }
        console.log('adduser :',newUser)
        db.users.push(newUser);
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
    console.log('loginUser',email,password)
    try{
        readDB((err,db)=>{
            if(err){
                return res.status(500).json({
                    status:0,
                    message:"Database connection error"
                })
            }

            const user = db.users.find(usr=>usr.email === email)
            console.log('loginUser',user)

            if(!user ){
                return res.status(400).json({
                    status:0,
                    error:'invalid email or password!',
                    message:'invalid email or password!'
                })
            }

            const isPasswordValid = db.users.find(usr=>usr.password === password)


            if(!isPasswordValid){
                return res.status(400).json({
                    status:0,
                    error:'invalid email or password!',
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
                error:"An account with this email already exists",
                message:"An account with this email already exists"
            })
        }else{
            console.log('user_id',db.users.length, typeof db.users.length,parseInt(db.users.length)+1)
            const newUser = {
                user_id: db.users.length+1,
                ...req.body
            }
            db.users.push(newUser)
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

const updateUser = (req,res)=>{
    readDB((err,db)=>{
        if(err){
            return res.status(500).json({message:"Database connection error"});
        }else{
            const index = db.users.findIndex(u=>u.id === parseInt(req.params.id));
            if(index !==-1){
                db.users[index] = {...db.users[index],...req.body}
                writeDB(db,(err)=>{
                    if(err){
                        return res.status(500).json({message:"Database connection error"})
                    }

                    return res.status(200).json({message:"User updated successfully",data:db.users[index]})
                })
            }
        }
    })
}

const deleteUser = (req,res)=>{
    console.log('deleteUser',req.params)
    readDB((err,db)=>{
        if(err){
            return res.status(500).json({message:"Database connection error!"});
        }else{
            const index = db.users.findIndex(u=>u.user_id===parseInt(req.params.id));

            

            console.log('index',index,db.users,parseInt(req.params.id))

            if(index !== -1){
                db.users.splice(index,1);
                writeDB(db,(err)=>{
                    if(err){
                        return res.status(500).json({message:"Database connection error"})
                    }
                    return res.status(200).json({message:"User deleted successfully"})
                })

            }else{
                return res.status(400).json({message:"User not found"})
            }
        }
    })
}



module.exports = {
    getUsers,
    addUser,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getUserById
}

