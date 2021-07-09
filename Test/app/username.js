const express = require('express');
const router = express.Router()
var user =require('./model/model');//model schema
var jobs =require('./model/jobs');//json file of jobs

const fs = require('fs');

const path = require('path');


var name=""
var pwd=" "
//mainpage Task 1
router.get('/',async (req, res) => {
    res.sendFile(__dirname+ '/index.html');
  }) 
//login
router.post('/login',function(req,res){
    name= req.body.un;
    pwd =req.body.pwd;
    
    user.find({"name":name,"password":pwd}, function(err, users) {
       if(users.length>=1)
         {var u= JSON.stringify(users)
          res.redirect("/username/info")}
      else
      res.send("No") 
     
    });

  })
  //info
  router.get('/info', function(req,res){
    console.log(name,pwd)
    user.find({"name":name,"password":pwd}, function(err, users) {//finds the users and displays the info
      var u= JSON.stringify(users)
      res.send(u)

    })
  })
//jobs
  router.get('/jobs', function(req,res){
    var jobs = fs.readFileSync(path.resolve(__dirname, 'model/jobs.json'));//reads the file
    res.send(jobs)
  })

//meme
  router.post('/meme', function(req,res){
    var s=req.body.un;
    if(s=="hello")//If key is hello loads a meme
      {res.sendFile(__dirname+ '/meme/meme.jpg');
    console.log(s)}
    else
    {
      res.send("HI")
    }
  })
//storing users
  router.post('/post',async (req, res) => {//storing in a database called logs
    name=req.body.name
    pwd=req.body.pwd
    console.log(name)
    if(req.body.pwd == req.body.cpwd){
    const User = new user({
      name:name,
      password:req.body.pwd,
      intro:req.body.intro
   })
   
   try{
     const newUser = await User.save()
     res.redirect("/username/info")
   }catch(err) {
     res.status(400).json({message:err.message})
   }
  }
  else{
    res.redirect('/username')
  }
})
//userslist
router.get('/list', function(req, res) {//displays all users
  user.find({}, function(err, infos) {
   

    res.send(JSON.stringify(infos));  
  });
});


  
module.exports =router