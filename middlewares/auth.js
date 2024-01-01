const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // const { accessToken } = req.cookies;
  console.log(req.headers)
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    return res.send("login pls");
  }
  //decode the accessToken and get id
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send("Invalid token");
    } else {
      // console.error(error);
      return res.status(500).send("Internal server errorj");
    }
  }
};

module.exports = auth;
