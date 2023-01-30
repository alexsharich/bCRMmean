const express = require('express')
const controller = require('../controllers/analytics.js')
const router = express.Router()

router.get('/overview',controller.overview)
router.get('/anlytics',controller.analytics)

module.exports = router