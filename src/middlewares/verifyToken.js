const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Token is not valid" });
      } else {
        const { role } = decoded;
        if (Array.isArray(role)) {
          console.log(role);
          role.forEach((item) => {
            console.log(item);
            console.log(req.originalUrl);
            if (req.originalUrl.includes(item.toLowerCase())) {
              next();
            }
          });
        } else if (req.originalUrl.includes(role.toLowerCase())) {
          next();
        } else {
          res.status(403).json({
            message: "You are not authorized to access this resource",
          });
        }
      }
    });
  } else {
    res.status(401).json({ message: "Token is not provided" });
  }
};

module.exports = verifyToken;
