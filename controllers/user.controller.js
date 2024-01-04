const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const logger = require("../log");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userRegistraion = async (req, res) => {
  console.log("registration api called");

  try {
    const { email, password, userName } = req.body;
    if (!email || !password || !userName) {
      logger.error("Incomplete user registration data");
      return res
        .status(400)
        .json({ error: "Incomplete user registration data" });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username: userName }],
    });
    if (existingUser) {
      logger.error("User with the same email or username already exists");
      return res
        .status(409)
        .json({ error: "User with the same email or username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      password: hashedPassword,
      username: userName,
    });
    await user.save();
    logger.info("user registration successfull");
    res
      .status(200)
      .json({ success: true, message: "registration successfull" });
  } catch (error) {
    logger.error(`User registration failed: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const errorText = "email and password required";
      logger.error(errorText);
     return res.status(400).json({
        success: false,
        message: errorText,
      });
    }
    if (!validator.isEmail(email)) {
      const errorText = "email validation error";
      logger.error(errorText);
      return res.status(400).json({
        success: false,
        message: errorText,
      });
    }
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      const errorText = "no user found";
      logger.error(errorText);
      return res.status(400).json({
        success: false,
        message: errorText,
      });
    }
    isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      const errorText = "Password is incorrect";
      logger.error(errorText);
      return res.status(400).json({
        success: false,
        message: errorText,
      });
    }
    const refreshTokenPayload = {
      userId: user._id,
      userName: user.username,
    };

    const accessTokenPayload = {
      userId: user._id,
      userName: user.username,
    };

    const refreshTokenOptions = {
      expiresIn: "10m",
    };

    const accessTokenOptions = {
      expiresIn: "60m",
    };
    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET,
      refreshTokenOptions
    );
    const accessToken = jwt.sign(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      accessTokenOptions
    );
    res.status(200).json({
      success: true,
      message: " succesfully logged in",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      success: false,
      error: err,
      message: "Internal server error",
    });
  }
};

module.exports = {
  userRegistraion,
  userLogin,
};
