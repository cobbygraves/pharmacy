const mongoose = require('mongoose')

const AdminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Required'
  },
  password: {
    type: String,
    required: 'Required'
  }
})

const SalesUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Required'
  },
  password: {
    type: String,
    required: 'Required'
  }
})

const SalesUserModel = mongoose.model('sale', SalesUserSchema)

const AdminUserModel = mongoose.model('admin', AdminUserSchema)

module.exports = {
  SalesUserModel,
  AdminUserModel
}
