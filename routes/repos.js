const express = require("express");
const router = express.Router();
const repoController = require("../controller/repoController");
const { check } = require("express-validator");
const { validarIdRepo } = require("../middleware/validarIdRepo");
const auth = require("../middleware/auth");
const validarJWT = require("../middleware/validarJWT");

router.post(
  "/newRepo", auth, validarJWT,
  [
    check("name").not().isEmpty().withMessage("Debes ingresar un nombre"),
    check("language").not().isEmpty().withMessage("Debes ingresar el lenguaje utilizado"),
    check("date").not().isEmpty().withMessage("Debes ingresar la fecha de creación"),
  ],
  repoController.newRepo
);
router.get("/allRepos", auth, validarJWT, repoController.allRepos);
router.get("/repo/:id", auth, validarJWT, validarIdRepo, repoController.repo);
router.put("/editRepo/:id", auth, validarJWT, validarIdRepo, repoController.editRepo);
router.delete("/deleteRepo/:id", auth, validarJWT, validarIdRepo, repoController.deleteRepo);

module.exports = router;
