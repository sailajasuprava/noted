const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// const { protect } = require("../controllers/authController");

const router = express.Router();

// router.use(protect);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
