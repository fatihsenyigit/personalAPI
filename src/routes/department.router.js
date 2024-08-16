"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const department = require("../controllers/department.controller");
// butun permissions lari cagirabiliriz. const {isAdmin, isLead} destructuring de yapabiliriz
const permissions = require('../middlewares/permissions')

/* ------------------------------------------------------- */
router.route("/").get(permissions.isLogin, department.list).post(permissions.isAdmin, department.create);

router
  .route("/:id")
  .get(department.read)
  .put(department.update)
  .patch(department.update)
  .delete(department.delete);

router.get("/:id/personnels",permissions.isAdmin, department.personnels);

module.exports = router;

