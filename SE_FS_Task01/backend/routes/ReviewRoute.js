const express= require("express");
const router = express.Router();
const {sentReview, getReview}=require("../controllers/ReviewController");


router.post("/sentReview",sentReview);
router.get("/getreview/:movieId",getReview);

module.exports= router;
