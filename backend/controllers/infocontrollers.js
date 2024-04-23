
const {db} = require('../models/dbconnection');
const jwt = require('jsonwebtoken');

const getinfo = (req,res)=>{

  
    const {input} = req.body;
    

    
   if(input.length>0){
    let sql = `SELECT * FROM businesses WHERE business_name LIKE "${input}%"`;

    db.query(sql,(err,result)=>{
        if(err) console.log(err)
        console.log(result)
        
            result.forEach((p)=>{
                p['options'] = JSON.parse(p['options'])
            })
            console.log(result)
        
            res.status(200).json({businesses:result});
        
        
    })
    
    
   }else{
    res.status(200).json({businesses:[]});
   }

}

const purchase = (req,res)=>{
    const {reservationinfo,user}= req.body
    const {id} = jwt.verify(user.token,process.env.SECRET)
    const {business_id,business_name,reservation_info} = reservationinfo
    console.log(id,business_id,business_name)
}

module.exports = {
    getinfo,
    purchase
}