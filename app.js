const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.js')
const analyticsRoutes = require('./routes/analytics.js')
const categoryRoutes = require('./routes/category.js')
const orderRoutes = require('./routes/order.js')
const positionRoutes = require('./routes/position.js')
const keys = require('./config/keys')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
mongoose.connect(keys.mongoURI)
  .then(()=>console.log('MongoDB connected'))
  .catch((err)=>console.log(err))

app.use(passport.initialize())  
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth',authRoutes)
app.use('/api/analytics',analyticsRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/position',positionRoutes)

module.exports = app