const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { check } = require("express-validator");
const { validarIdUser } = require("../middleware/validarIdUser");
const auth = require("../middleware/auth");
const validarJWT = require("../middleware/validarJWT");

/* GET users listing. */
router.post(
  "newUser",
  [
    check("name").not().isEmpty().withMessage("Debes ingresar un nombre"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un email")
      .isEmail()
      .withMessage("Debes ingresar un formato de email válido"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña")
      .isLength({ min: 8, max: 15 })
      .withMessage("La contraseña debe contener entre 8 a 15 caracteres."),
    check("dateOfBirth")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar Fecha de nacimiento"),
  ],
  userController.newUser
);
router.get("/allUsers", auth, validarJWT, userController.allUsers);
router.get("/user/:id", auth, validarJWT, validarIdUser, userController.user);
router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un email")
      .isEmail()
      .withMessage("Debes ingresar un formato de email válido"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña"),
  ],
  userController.login
);
router.get("/allLogs", auth, validarJWT, userController.allLogs);
router.get(
  "/userLogs/:id",
  auth,
  validarJWT,
  validarIdUser,
  userController.userLogs
);
router.put(
  "/editPassword/:id",
  auth,
  validarJWT,
  validarIdUser,
  [
    check("password")
      .not()
      .isEmpty()
      .withMessage("El campo esta vacio")
      .isLength({ min: 8, max: 15 })
      .withMessage("La contraseña debe contener entre 8 a 15 letras."),
  ],
  userController.editPassword
);
router.delete(
  "/deleteUser/:id",
  auth,
  validarJWT,
  validarIdUser,
  userController.deleteUser
);
router.get("/logout", auth, validarJWT, userController.logout);
router.get("/consultarCookie", userController.consultarCookie);

module.exports = router;
