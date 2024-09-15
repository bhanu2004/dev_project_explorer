const express = require("express");
const router = express.Router();



const Project = require("./project");
router.use("/project", Project);

const Link = require("./link");
router.use("/link", Link);

const Home = require("./home");
router.use("/home", Home);





module.exports = router;
