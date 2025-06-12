const { addMovie, getAllMovie, getSingleMovie } = require("../controllers/ContentController");
const express = require("express");
const router = express.Router();

router.post("/addmovie", addMovie);
router.get("/getmovie",getAllMovie)
router.get("/getsinglemovie/:id",getSingleMovie)
module.exports = router;
