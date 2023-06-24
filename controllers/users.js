const { AdminUserModel, SalesUserModel } = require('../models/users.js')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')

const getAdminUser = async (req, res) => {
  const adminUser = req.body

  let existingAdminUser
  try {
    existingAdminUser = await AdminUserModel.findOne({
      username: adminUser.username
    })
  } catch (error) {
    return next(createError(400, error))
  }

  if (existingAdminUser) {
    bcrypt
      .compare(adminUser.password, existingAdminUser.password)
      .then((resp) => {
        if (resp) {
          return res.status(200).json({
            id: existingAdminUser.id,
            username: existingAdminUser.username,
            verification: true
          })
        } else {
          return res.json({ message: 'wrong password', verification: false })
        }
      })
      .catch((err) => console.log(err))
  } else {
    return res.json({ message: 'wrong username', verification: false })
  }
}

const getSalesUser = async (req, res) => {
  const salesUser = req.body

  let existingSalesUser
  try {
    existingSalesUser = await SalesUserModel.findOne({
      username: salesUser.username
    })
  } catch (error) {
    return next(createError(400, error))
  }

  if (existingSalesUser) {
    bcrypt
      .compare(salesUser.password, existingSalesUser.password)
      .then((resp) => {
        if (resp) {
          return res.status(200).json({
            id: existingSalesUser.id,
            username: existingSalesUser.username,
            verification: true
          })
        } else {
          return res.json({ message: 'wrong password', verification: false })
        }
      })
      .catch((err) => console.log(err))
  } else {
    return res.json({ message: 'wrong username', verification: false })
  }
}

module.exports = {
  getAdminUser,
  getSalesUser
}
