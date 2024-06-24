const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
require('dotenv').config();
const fs = require('fs');

const userRoutes = require('./src/routers/userRoutes');


// console.log('path :',path.resolve())
// const __dirname = path.resolve();
const dbFilePath = path.join(__dirname,'data.json')
console.log('path 2',dbFilePath)

const readDB = (cb) => {
    fs.readFile(dbFilePath, 'utf-8', (err, data) => {
      if (err) {
        return cb(err, null);
      }
      try {
        const jsonData = JSON.parse(data);
        cb(null, jsonData);
      } catch (parseErr) {
        cb(parseErr, null);
      }
    });
  };

  const writeDB = (cb)=>{
    fs.writeFile('./data.json',JSON.stringify(data,null,2),err=>{
      if(err){
        return cb(err,null);
      }
      else{
        res.json({
          "success":true
        })
        console.log('file successfully added..')
      }
    })
  }




const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api',userRoutes);

console.log(port)

app.get('/products',async (req,res)=>{

    console.log('product route ...')
})

app.get('/users', (req, res) => {
    readDB((err, db) => {
      if (err) {
        return res.status(500).send({ message: 'Error reading the database file' });
      }
      res.json(db);
    });
  });

app.post('/users',(req,res)=>{

})



app.listen(port, () => {
    console.log(`server is runing on http://localhost:${port}`);
})






