const express = require('express')
const { getAdminUser, getSalesUser } = require('../controllers/users')

const router = express.Router()

router.post('/sales/login', getSalesUser)
router.post('/admin/login', getAdminUser)

module.exports = router
