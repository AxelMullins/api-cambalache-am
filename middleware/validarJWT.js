const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/users");

module.exports = validarJWT = (req, res, next) => {
  // const token = req.header("x-token");
  const token = req.cookies.sessionDelUsuario.token;
  const verify = jwt.verify(token, process.env.TOKEN_SECRET);
  const result = User.findById(verify.body.id)

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  if (!result) {
    return res.status(401).json({
      msg: "Este Token no es mio"
    })
  }
  console.log({ msg: "Toquen validado correctamente" });
  next();
};
