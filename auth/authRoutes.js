const express = require("express");
const router = express.Router();

const authController = require("./authController");
const refreshAuth = require("../middlewares/refreshTokenAuth");
const auth=require("../middlewares/auth")

router.route("/accesstoken").post(auth,authController.accessToken);
router.route("/refreshtoken").post(refreshAuth, authController.refreshToken);

module.exports = router;
