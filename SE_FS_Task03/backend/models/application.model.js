import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'selected', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

export const Application = mongoose.model('application', applicationSchema);