const DrugModel = require('../models/drugs')
const createError = require('http-errors')
const uuid = require('uuid')

const drugStock = (req, res) => {
  //logic to add drug to the database
  const drug = { id: uuid.v4(), ...req.body }
  const drugDocument = new DrugModel(drug)
  drugDocument.save((err) => {
    if (err) {
      return next(createError(400, error))
    }
    res.status(200).json({ message: 'successful' })
  })
}

//logic to read drugs from database
const drugsRead = (req, res) => {
  DrugModel.find((err, doc) => {
    if (!err) {
      res.send(doc)
    } else {
      res.status(404).json({ message: "Drugs can't be retrieved" })
      next(err)
    }
  })
}

const showDrug = (req, res) => {
  const drugId = req.params.id
  DrugModel.findOne({ id: drugId }, (err, doc) => {
    if (!err) {
      res.send(doc)
    } else {
      res.status(404).json({ message: 'Something went wrong' })
    }
  })
}

const drugUpdate = (req, res) => {
  const updatedDrug = req.body
  const { id } = updatedDrug
  DrugModel.findOneAndUpdate(
    { id: id },
    updatedDrug,
    {
      new: true
    },
    (err, doc) => {
      if (!err) {
        res.send(doc)
      } else {
        res.status(404).json({ message: 'Drug update failed' })
        next(err)
      }
    }
  )
}

module.exports = {
  updateDrug: drugUpdate,
  stockDrug: drugStock,
  readDrugs: drugsRead,
  getDrug: showDrug
}
