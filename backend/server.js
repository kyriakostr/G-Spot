require('dotenv').config();

const express = require('express');


const authroutes = require('./routes/users')
const inforoutes = require('./routes/info');
const {db} = require('./models/dbconnection')



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Mysql connected');
})



app.use(authroutes)
app.use('/user',inforoutes)

app.listen(process.env.PORT,()=>{
    console.log('listening to port ',process.env.PORT);
})

