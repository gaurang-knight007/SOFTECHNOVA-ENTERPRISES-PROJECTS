import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobtype, experience, position, companyId } = req.body;

        if (!title || !description || !requirements || !salary || !location || !jobtype || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                status: true
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary,
            location,
            jobtype,
            experience,
            position,
            companyId,
            created_by: req.id
        })

        return res.status(201).json({
            message: "Job created successfully.",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const jobAdminCreated = async (req, res) => {
    try {

        const jobs = await Job.find({ created_by: req.id }).populate({
            path: 'companyId'
        });
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs are found.",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const findJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate({
            path: 'applications'
        });

        if (!job) {
            return res.status(400).json({
                message: "No job is found.",
                success: true
            })
        }

        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "companyId"
        }).sort({ createdAt: -1 })
        if (!jobs) {
            return res.status(404).json({
                message: "No job is found.",
                success: true
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getJobFromWishList = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findOne({ _id: userId }).populate({
            path: 'wishlist',
            populate: {
                path: 'companyId',
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }

        return res.status(200).json({
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.id;
        const params = req.params;
        const user = await User.findOne({ _id: userId });

        user.wishlist.push(params.id);
        await user.save();

        return res.status(200).json({
            message: "Added to Wishlist",
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.id;
        const params = req.params;
        await User.updateOne(
            { _id: userId },
            { $pull: { wishlist: params.id } }
        );

        return res.status(200).json({
            message: "Job removed successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}