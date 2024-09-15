const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");


router.post("/create", projectController.create);
router.get("/get", projectController.getAll);
router.put("/update/:_id", projectController.updateOne);
router.delete("/delete/:_id", projectController.deleteOne);


module.exports = router;