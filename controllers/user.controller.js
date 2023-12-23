const User = require("../models/user.model");
const winston = require("winston");
const fs = require("fs");
const bcrypt = require("bcrypt");

// Create a logs directory if it doesn't exist
const logDirectory = "./logs";
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Configure the Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: `${logDirectory}/error.log`,
      level: "error",
    }),
    new winston.transports.File({ filename: `${logDirectory}/combined.log` }),
  ],
});

const userRegistraion = async (req, res) => {
  console.log('registration api called')

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
    const hashedPassword = await bcrypt.hash(password,10);
    const userData = {
      email,
      password: hashedPassword,
      username: userName,
    };
    const userDetails = new User(userData);
    await userDetails.save();
    logger.info("user registration successfull");
    res
      .status(200)
      .json({ success: true, message: "registration successfull" });
  } catch (error) {
    logger.error(`User registration failed: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  userRegistraion,
};
