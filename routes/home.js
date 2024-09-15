const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/get-creds", homeController.getCred);
router.get("/get-all", homeController.getAll);
router.get("/search", homeController.searchItem);


module.exports = router;