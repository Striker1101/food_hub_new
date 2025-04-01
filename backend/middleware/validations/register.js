const { check } = require("express-validator");

exports.validateRegister = [
  check("name").notEmpty().withMessage("Name is required"),
  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["restaurant", "customer"])
    .withMessage("Role must be either 'restaurant' or 'customer'"),
  check("email").isEmail().withMessage("Please include a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
