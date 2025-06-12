const contentData = require("../models/ContentModel");
const cloudinary = require("../middleware/cloudinary");


const addMovie = async (req, res) => {
  // res.json("wrkign");
  const { title, year, image, description } = req.body;

  if (!title || !year || !image || !description) {
    return res.status(401).json({ message: "Fill up all the Details" });
  }

  const uploadResult = await cloudinary.uploader
    .upload(image, {
      folder: "MovieRev",
      resource_type: "image",
    })
    .catch((error) => {
      console.log(error);
    });

  const addmovie = await contentData.create({
    title,
    year,
    image: uploadResult.secure_url,
    description,
  });
  if (!addmovie) {
    return res.status(400).json({ message: "Fail adding movie" });
  }
  res.status(200).json(addmovie);
};


const getAllMovie=async(req,res)=>{
const movie = await contentData.find();
if(!movie){
  res.status(401).json({message:"Error in getting movie data"})
}
res.status(200).json(movie);
}

const getSingleMovie =async(req,res)=>{
  const {id}=req.params;
  const movie = await contentData.findById(id);
  if(!movie){
    res.status(401).json({message:"error getting movie data"});
  }
  res.status(200).json(movie);
}

module.exports = {
  addMovie,
  getAllMovie,
  getSingleMovie
};
