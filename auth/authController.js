
const jwt = require("jsonwebtoken");

const accessToken = (req, res) => {
  console.log("koooiiiiiiiiiii")
  res.status(200).json({
    isAuthenticated:true,
    roles:[req.user.userType]
  });
};
const refreshToken = (req, res) => {
  console.log("refresh api triggered")
  const user = req.user;

  const accessTokenPayload = {
    id: user.id,
    userName: user.userName,
    userType: user.userType,
  };
  const accessTokenOptions = {
    expiresIn: "10m",
  };
  const accessToken = jwt.sign(
    accessTokenPayload,
    process.env.ACCESS_TOKEN_SECRET,
    accessTokenOptions
  );
  res.status(201).json({ accessToken });
};

module.exports = {
  accessToken,
  refreshToken,
};
