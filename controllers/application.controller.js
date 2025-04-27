import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const applyjob = async (req, res) => {
    try {
        const user_id = req.id;
        const job_id = req.params.id;
        console.log(user_id, job_id);
        if (!job_id) {
            return res.status(400).json({ message: "Job Id is required" });
        }
        const existingApplication = await Application.findOne({ job:job_id, applicant:user_id });
        if (existingApplication) {
            return res.status(400).json({ message: "Application already exists" ,
                success: false

            });
        }
        const job = await Job.findById(job_id);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        const newApplication = await Application.create({
            job:job_id,
            applicant:user_id
        });
        job.application.push(newApplication._id);
        await job.save();
        return res.status(201).json({ message: "Application submitted successfully", success: true });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getappliedJobs = async (req, res) => {
    try {
        const user_id = req.id;
        const application = await Application.find({ applicant: user_id }).sort({ createdAt: -1 }).populate({
            path:'job',
            options:{ sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }  
        });
        if(!application){
            return res.status(404).json({ message: "No applications found", success: false });
        }
        return res.status(200).json({ application, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getapplicant = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'application',
            sort: { createdAt: -1 },
            populate: { path: 'applicant', sort: { createdAt: -1 } }
        });
        if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
        }
        return res.status(200).json({ job, success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const status = req.body.status;
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({ message: "Status updated successfully", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
