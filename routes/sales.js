const express = require('express')
const { updateSales, readSales } = require('../controllers/sales')

const router = express.Router()

router.get('/', readSales)
router.put('/update', updateSales)

module.exports = router
