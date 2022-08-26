const { Repo } = require("../models/repos");
const { validationResult } = require("express-validator");

const repoController = {
  newRepo: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        const saveRepo = new Repo( req.body );
        await saveRepo.save();
        res.status(201).json(saveRepo);
      } else {
        res.status(501).json(error);
      }
    } catch (err) {
      res.status(501).json({
        msg: "No se ha logrado guardar el repositorio, el nombre debe ser unico",
        err,
      });
    }
  },
  allRepos: async (req, res) => {
    try {
      const repos = await Repo.find();
      res.status(200).json({ repos });
    } catch (error) {
      res.json({error})
    }
  },
  repo: async (req, res) => {
    const repo = await Repo.findById(req.params.id);
    res.status(200).json({ repo });
  },
  editRepo: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        const { id } = req.params;

        const previous = await Repo.findByIdAndUpdate(id, req.body);
        res.status(202).json({ previous, updated: req.body });
      } else {
        res.status(501).json(error);
      }
    } catch (error) {
      res
        .status(501)
        .json({ msg: "Error al intentar editar el repositorio, el nombre ya existe en la base de datos.", error });
    }
  },
  deleteRepo: async (req, res) => {
    try {
      const repo = await Repo.findByIdAndDelete(req.params.id);
      res.status(202).json({ msg: "Se ha borrado", repo });
    } catch (error) {
      res
        .status(400)
        .json({ msg: "Problemas a la hora de borrar la información" });
    }
  }
};

module.exports = repoController;
