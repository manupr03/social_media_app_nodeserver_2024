const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routers/userRoutes');

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:4200', 
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, 
  };
  
app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions)); 
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api',userRoutes);




app.listen(port, () => {
    console.log(`server is runing on http://localhost:${port}`);
})






