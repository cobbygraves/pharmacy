const SalesUserModel = require("../models/salesUser.js");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const getSalesUser = async (req, res, next) => {
  const salesUser = req.body;

  let existingSalesUser;
  try {
    existingSalesUser = await SalesUserModel.findOne({
      username: salesUser.username,
    });
  } catch (error) {
    return next(createError(400, error));
  }

  if (existingSalesUser) {
    bcrypt
      .compare(salesUser.password, existingSalesUser.password)
      .then((resp) => {
        if (resp) {
          return res.status(200).json({
            id: existingSalesUser.id,
            username: existingSalesUser.username,
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

module.exports = getSalesUser;
