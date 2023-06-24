const dailySalesModel = require('../models/sales')

const updateSales = (req, res) => {
  //logic to update sales amount and return the update sales amount
  const updatedSales = req.body
  dailySalesModel.findOneAndUpdate(
    { id: updatedSales.id },
    updatedSales,
    {
      new: true
    },
    (err, doc) => {
      if (!err) {
        res.send(doc)
      } else {
        res.status(404).json({ message: 'Error updating sales information' })
        next(err)
      }
    }
  )
}

// callback to get sales info from database
const readSales = (req, res) => {
  dailySalesModel.find((err, doc) => {
    if (!err) {
      res.send(doc)
    } else {
      res.status(404).json({ message: " Can't read sales information " })
      next(err)
    }
  })
}
module.exports = { updateSales, readSales }
