const express = require("express");
const router = express.Router();

const coursesHandler = require("./handler/courses");

const verifyToken = require("../middlewares/verifyToken");
const roles = require("../middlewares/permission");

router.get("/", coursesHandler.getAll);
router.get("/:id", coursesHandler.get);

router.post("/", verifyToken, roles("admin"), coursesHandler.create);
router.put("/:id", verifyToken, roles("admin"), coursesHandler.update);
router.delete("/:id", verifyToken, roles("admin"), coursesHandler.destroy);

module.exports = router;
