const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("jwtToken");

  if (!token) {
    return res.status(403).json({ msg: "Islem Yetkiniz Yok" });
  }

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Yeniden Giris Yapiniz" });
  }
};
