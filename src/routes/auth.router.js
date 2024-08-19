
'use strict'

const router = require('express').Router()

const auth = require('../controllers/auth.controller')

// URL: /auth baslangic url 

router.post('/login', auth.login)
router.get('/logout', auth.logout)

module.exports = router