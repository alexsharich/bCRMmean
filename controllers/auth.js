const User = require('../models/User.js')
const bcrypt = require('bcryptjs')

module.exports.login = function(req,res){
  res.status(200).json({
    login: {
      email:req.body.email,
      password:req.body.password
    }
  })
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

  }
 }
}