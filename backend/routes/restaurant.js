const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/auth/isAdmin");
const UserValidationRules = require("../middleware/validations/user");
const isAuth = require("../middleware/auth/isAuth");
const upload = require("../config/multerConfig");
const RestaurantController = require("../controllers/RestaurantController");

router.get("/by_user_id/:id", RestaurantController.byUserID);
router.get("/", RestaurantController.index);
router.get("/:id", RestaurantController.show);
router.post("/", RestaurantController.store);
router.put("/:id", RestaurantController.update);
router.delete("/:id", RestaurantController.destroy);

module.exports = router;
