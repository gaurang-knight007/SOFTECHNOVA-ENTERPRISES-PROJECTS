import getDataURI from "../.utils/dataURI.js";
import { Company } from "../models/company.model.js";
import cloudinary from "../.utils/cloudinary.js";

export const companyRegister = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(404).json({
                message: "Something is missing.",
                success: false
            })
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "This Campany already exist.",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company is registerd successfully",
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getCompanyByUser = async (req, res) => {
    try {
        const companies = await Company.find({ userId: req.id });
        if (!companies) {
            return res.status(404).json({
                message: "Companies Not found",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const comapanyId = req.params.id;

        const company = await Company.findById(comapanyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                status: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { companyName, description, location, website } = req.body;

        const file = req.file;
        const fileUri = getDataURI(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { name: companyName, description, location, website, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company information update successfully.",
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}