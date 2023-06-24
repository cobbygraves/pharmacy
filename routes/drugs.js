const express = require('express')
const {
  updateDrug,
  stockDrug,
  readDrugs,
  getDrug
} = require('../controllers/drugs')

const router = express.Router()

router.get('/', readDrugs)
router.get('/:id', getDrug)
router.post('/stock', stockDrug)
router.put('/update', updateDrug)

module.exports = router
