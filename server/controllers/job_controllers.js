import { Job } from "../models/job_model.js";
import { User } from "../models/user_model.js";

export const createJob = async (req , res) => {

    try {
        const {title , description , salary = "N/A" , employmentType , country,state,city ,category } = req.body;


        if(!title || !description || !employmentType || !category) {
            return res.status(400).json({message : "All fields are required" , success : false});
        }

        const newJob = await Job.create({
            title ,
            description ,
            country,
            state,
            city,
            category ,
            employer : req.userId ,
            employmentType ,
            salary
        });


        return res.status(200).json({message : "job created successfully" , newJob})
    } catch (error) {
        console.log("Error creating job :", error.message);
        return res.status(500).json({message: "Error creating job", error: error.message});
    }
}


export const getAllJobs = async (req , res) => {
    try {
        const jobs = await Job.find();

        return res.status(200).json( {message : "jobs are fetched" , success : true , jobs})
    } catch (error) {
        console.log("Error fetching jobs :", error.message);
        return res.status(500).json({message: "Error fetching jobs", error: error.message});
    }
}

export const getJobById = async (req , res) => {
    try {
        const {id} = req.params;

        const job = await Job.findById(id).populate("employer") ;

        if(!job) {
            return res.status(404).json({message : "job not found" , success : false})
        }

        return res.status(200).json({message : "job is fetched" , succuss : true , job})
    } catch (error) {
        console.log("Error fetching job :", error.message);
        return res.status(500).json({message: "Error fetching job", error: error.message});
    }
}

export const updateJob = async (req , res) => {
    try {
        const {id} = req.params;
        const {title , description , salary = "N/A" , employmentType , location = "N/A" ,category } = req.body;
        const job = await Job.findById(id);

        if(!job) {
            return res.status(404).json({message : "job not found" , success : false })
        }

        if(job.employer !== req.userId) {
            return res.status(400).json({message : "You cannot update this job" , success : false})
        }

        const updatedJob = await Job.findByIdAndUpdate(id , {
            title , description , salary , employmentType , location , category
        });

        if(!updatedJob) {
            return res.status(400).json({message : "Updating job failed" , success : false})
        }

        return res.status(200).json({message : "updated the job successfully" , success : true})
    } catch (error) {
        console.log("Error updating job :", error.message);
        return res.status(500).json({message: "Error updating job", error: error.message});
    }
}

export const deleteJobById = async (req , res) => {
    try {
        const {id} = req.params ;

        const deleteJob = await Job.findByIdAndDelete(id) ;

        if(!deleteJob) {
            return res.status(400).json({message : "deleting job failed" , success : false});
        }

        return res.status(200).json({message : "job deleted successfully" , success : true})
    } catch (error) {
        console.log("Error deleting job :", error.message);
        return res.status(500).json({message: "Error deleting job", error: error.message});
    }
}
export const applyToJob = async (req , res) => {
    try {

        if(!req.file) {
            return res.status(400).json({message : "file is required"})
        }
        const {id} = req.params;
        const portfolioLinks  = JSON.parse(req.body.portfolioLinks) ;
        const {education , experience} = req.body;
        const job = await Job.findById(id) ;
        if(!job) {
            return res.status(404).json({message : "job not found" , success : false});
        }

        const filePath = req.file.path.replace(/\\/g ,'/' );
        
        job.applications.push({
            applicant : req.userId,
            resume : filePath ,
            portfolioLinks ,
            education,
            experience
        })

        await job.save();


        

        
        return res.status(200).json({message : "applied to job" , success : true})
    } catch (error) {
        console.log("Error applying to job :", error.message);
        return res.status(500).json({message: "Error applying to job", error: error.message});
    }
}


export const getAllJobsThatUserApplied = async (req , res) => {
    try {
        const jobs = await Job.find({'applications.applicant': req.userId}).select('-applications');

        if(!jobs.length) {
            return res.status(404).json({message : "No jobs found for this applicant"});
        }
        return res.status(200).json({jobs , success : true})
    } catch (error) {
        console.log("Error fetching jobs that user applied :", error.message);
        return res.status(500).json({message: "Error fetching jobs", error: error.message});
    }
}

export const getApplicationsForJob = async (req , res) => {
    try {
        const {id} = req.params;
        const job = await Job.findById(id) ;
        
        if(!job) {
            return res.status(404).json({message : "job not found" , success : false})
        }

        await job.populate('applications.applicant')

        return res.status(200).json({applications : job.applications , success : true })
    } catch (error) {
        console.log("Error fetching applications :", error.message);
        return res.status(500).json({message: "Error fetching applications", error: error.message});
    }
}


export const updateStatus = async (req , res) => {
    try {
        const {applicationId} = req.params;
        const {status} = req.body;

        if(!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({message : "invalid status" , success : false});
        }

        const job = await Job.findOne({"applications._id" : applicationId}) ;

        if (!job) {
            return res.status(404).json({ message: "Application not found", success: false });
        }
        
        const application =  job.applications.id(applicationId);
        
        if (!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }

        if (job.employer.toString() !== req.userId && req.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to update this application", success: false });
        }

        application.status = status;
        await job.save();


        return res.status(200).json({message : "status updated successfully" , success : true})

    } catch (error) {
        console.log("Error updating status :", error.message);
        return res.status(500).json({message: "Error updating status", error: error.message});
    }
}

export const searchJob = async (req, res) => {
    const { category, tags, title, location, companyName } = req.query;

    try {
        const query = {};

        if (category) {
            query.category = { $regex: category, $options: "i" };
        }

        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagsArray }; // No regex needed, exact match for tags
        }

        if (title) {
            query.$text = { $search: title };  // Full-text search for job title
        }

        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        if (companyName) {
            query.companyName = { $regex: companyName, $options: "i" };
        }

        const jobs = await Job.find(query, title ? { score: { $meta: "textScore" } } : {})
            .sort(title ? { score: { $meta: "textScore" } } : {})
            .exec();

        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
};

export const getJobByUserId = async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const jobs = await Job.find({ 'employer': userId });

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error at fetching job', error: error.message });
    }
};
export const getJobByLoc = async (req, res) => {
    const {district}=req.params 
    console.log(">>>>",district);
       
    try {
       
        const jobs = await Job.find({ 'city':district });

        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error at fetching business', error: error.message });
    }
};
