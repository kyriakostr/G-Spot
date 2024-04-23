
const jwt = require('jsonwebtoken');
const {db} = require('../models/dbconnection');

const createtoken = (id)=>{
    return jwt.sign({id:id},process.env.SECRET,{expiresIn:'3d'})
}

const authsignup =  (req,res)=>{
    const {email,password} = req.body;
    let sqluserexists = `SELECT * FROM users WHERE email="${email}"`;
    

    db.query(sqluserexists,(err,result)=>{  //check if user exists
        if(err) console.log(err);
        if(result.length===0){
            let sql = `INSERT INTO users(email,password) VALUES("${email}","${password}")` //insert new user
            
            db.query(sql,(err,result)=>{ //query insert
                if(err) console.log(err);

                let temp = `SELECT * FROM users WHERE email="${email}" AND password="${password}"`; //select new user from db
                db.query(temp,(err,result)=>{ //query the id from the new user

                    const id = result[0]['id']
                    const token = createtoken(id); //create token with the id

                    console.log(result);
                    res.status(200).json({email,token})//send data to frontend
                })
                
            })
        }else{
            res.status(200).json({error:'This email already exists'})
        }
    })
    
    
}

const authlogin = (req,res) =>{
    const {email,password} = req.body;
    let sqluserexists = `SELECT * FROM users WHERE email="${email}" AND password="${password}"`;
    db.query(sqluserexists,(err,result)=>{
        if(err) console.log(err);
        if(result.length===0){
            res.status(200).json({error:'Your credentials are wrong'});
        }
        else{
            const id = result[0]['id']
            const token = createtoken(id);
            
            res.status(200).json({email,token})
        }
    })
}

module.exports ={
    authsignup,
    authlogin
}