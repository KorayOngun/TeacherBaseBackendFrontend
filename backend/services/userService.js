var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple')

var User = require('../models/user')

router.post('/register',(req,res)=>{
    var userdata = req.body;
    var user = new User(userdata)
    user.save((err,result)=>{
        if (err) {
            console.log("Error saving to user "+err)
            res.sendStatus(501)
        }
        res.status(201).send({message:"Created"})
    })
})

router.post('/login',async (req,res)=>{
    var userData = req.body;
    var user = await User.findOne({email:userData.email})
    if (!user) {
        console.log(req.header('authorization'))
        return res.status(401).send({message:'email or password invalid'})
    }
    if (userData.password != user.password) {
        console.log(req.header('authorization'))
        return res.status(401).send({message:'email or password invalid'})
    } 
    
    var payload = {mail:user.email}
    var token = jwt.encode(payload,'12345')
    return res.status(200).send({token})
})

var user = {router,checkAuthenticated:(req,res,next)=>{
    if(!req.header('authorization')){
        return res.status(401).send({message:"unauthorized. No Authorization Header"})
    }

    var token = req.header("authorization").split(' ')[1]
    
    var payload = jwt.decode(token,'12345')

    if(!payload){
        return res.status(401).send({message:"Unauthorized. token is not valid"})
    }
    console.log(req.body)
     next()
}}

module.exports = user