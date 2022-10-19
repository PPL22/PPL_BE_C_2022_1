const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  // console.log(req.headers);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Token is not valid" });
      } else {
        const { id, role } = decoded;
        req.id = id;
        req.role = role;
        // Check if user can access the route based on their roles
        // Check multiple role
        if (Array.isArray(role)) {
          // console.log(role);
          role.forEach((item) => {
            // console.log(item);
            // console.log(req.originalUrl);
            // If url consists of the role, (/dosen/search), continue
            if (req.originalUrl.includes(item.toLowerCase())) {
              next();
            }
          });
          // One role, check url immediately
        } else if (req.originalUrl.includes(role.toLowerCase())) {
          next();
        // User don't have the valid role to access the route
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
