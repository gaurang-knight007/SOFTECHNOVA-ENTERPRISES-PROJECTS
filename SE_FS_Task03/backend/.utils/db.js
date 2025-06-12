import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongodb connect successfully");
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;