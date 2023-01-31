const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const keys = require('../config/keys.js')
const errorHandler = require('../utils/errorHandler.js')

module.exports.login = async function(req,res){

 const canditate = await User.findOne({email:req.body.email})

if (canditate){
  const passwordResult = bcrypt.compareSync(req.body.password,canditate.password)
  if(passwordResult){
   const token = jwt.sign({
    email: canditate.email,
    userId: canditate._id
   }, keys.jwt, {expiresIn: 60 * 60})

   res.status(200).json({
    token: `Bearer ${token}`
   })
  } else {
    res.status(401).json({
      message: 'Please check your login or password'
    })
  }
} else {
  res.status(404).json({
    message: 'User not found'
  })
}
}

module.exports.register = async function(req,res){

 const canditate = await User.findOne({email:req.body.email})

 if(canditate){
  res.status(409).json({
    message: "Please check your e-mail address Email address already in use. Please choose a different one"
  })
 }else {
  const salt = bcrypt.genSaltSync((10))
  const password = req.body.password
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(password,salt)
  })
  try {
    await user.save()
    res.status(201).json(user)
  }
  catch(err){
    errorHandler(res,err)
  }
 }
}