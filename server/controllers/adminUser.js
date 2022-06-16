const AdminUserModel = require("../models/adminUser.js");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const getAdminUser = async (req, res, next) => {
  const adminUser = req.body;

  let existingAdminUser;
  try {
    existingAdminUser = await AdminUserModel.findOne({
      username: adminUser.username,
    });
  } catch (error) {
    return next(createError(400, error));
  }

  if (existingAdminUser) {
    bcrypt
      .compare(adminUser.password, existingAdminUser.password)
      .then((resp) => {
        if (resp) {
          return res.status(200).json({
            id: existingAdminUser.id,
            username: existingAdminUser.username,
            verification: true,
          });
        } else {
          return res.json({ message: "wrong password", verification: false });
        }
      })
      .catch((err) => console.log(err));
  } else {
    return res.json({ message: "wrong username", verification: false });
  }
};

module.exports = getAdminUser;
