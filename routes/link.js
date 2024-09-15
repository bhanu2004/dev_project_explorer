const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");


router.post("/create", linkController.create);
router.get("/get", linkController.getAll);
router.put("/update/:_id", linkController.updateOne);
router.delete("/delete/:_id", linkController.deleteOne);


module.exports = router;