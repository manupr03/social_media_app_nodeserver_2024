const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname,'../..','users.json');

const readDB = (cb)=>{
    console.log('dbpath',dbFilePath)
    fs.readFile(dbFilePath,'utf-8',(err,data)=>{
        if(err){
            return cb(err,null);
        }
        try{
            const jsonData = JSON.parse(data);
            cb(null,jsonData);
        }catch(err){
            cb(err,null);
        }
    })
}


const writeDB = (data,cb)=>{
    fs.writeFile(dbFilePath,JSON.stringify(data,null,2),(err)=>{
        if(err){
            return cb(err,null);
        }
        cb(null,{success:true});
    })
}

module.exports = {readDB,writeDB}