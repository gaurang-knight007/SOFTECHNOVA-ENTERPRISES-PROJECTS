const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define the routes
const AuthRoute = require("./routes/AuthRoute");
const ContentRoute = require("./routes/ContentRoute");
const ReviewRoute = require("./routes/ReviewRoute");

//Routes Middleware
app.use("/", AuthRoute);
app.use("/movie", ContentRoute);
app.use("/review",ReviewRoute);

const PORT = process.env.PORT || 2000;

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect", error);
  });
