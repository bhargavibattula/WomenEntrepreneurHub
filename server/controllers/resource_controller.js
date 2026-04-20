import { Resource } from "../models/resourse_model.js"
import { User } from "../models/user_model.js";

export const createResource = async(req,res)=>{
    const{title,content,category , tags} = req.body
    try {

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       if(user.role==="admin"||user.role==="entrepreneur"){

        const resource= new Resource({
            title,
            content,
            category,
            author:user._id,
            tags,
            lastUpdatedBy : user._id,
            version : 1
        })
        const savedResource=await resource.save();
        res.status(200).json({success:true,message:"Resouce Created Successfully",savedResource})
       }
       else{
        return res.status(403).json({ message: 'Permission denied' });
       } 
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Error creating resource",
            error: error.message
        });
    }
   
}
export const getAllResources = async (req, res) => {
    try {
        const Resources = await Resource.find().populate('author', 'name');         
        res.status(200).json(Resources);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching Resources",
            error: error.message
        });
    }
};

export const getResourceById = async (req, res) => {
    const resouceId = req.params.id
    try {
        const resource = await Resource.findById(resouceId).populate("author") ;         
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching Resource",
            error: error.message
        });
    }
};

export const getResourceByCategory = async (req, res) => {
    const ResourceCategory = req.params.category
    console.log(ResourceCategory);
    
    try {
        const resource = await Resource.find({category:ResourceCategory}).populate('author', 'name') ;         
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching Resource",
            error: error.message
        });
    }
};


export const updateResourceById = async (req, res) => {
    const resourceId = req.params.id;
    const { 
        title,
        content,
        category,
        tags,
        version,
    } = req.body;

    try {
        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (resource.author.toString() === req.userId.toString()&&user.role==="entrepreneur"||user.role === "admin"){
        if (title !== undefined) resource.title = title;
        if (content !== undefined) resource.content = content;
        if (category !== undefined) resource.category = category;
        if (tags !== undefined) resource.tags = tags;
        if (version !== undefined) resource.version = version;
        resource.lastUpdatedBy=req.userId
        await resource.save();
        res.status(200).json({success:true,message:"Resource updated successfully",resource});
        }
        else {
            return res.status(403).json({ message: 'Permission denied' });
        }
    } catch (error) {
        console.error(error);log
        res.status(500).json({ message: 'Error updating business', error: error.message });
    }
};


export const deleteBusinessById = async (req, res) => {
    const resourceId = req.params.id;
    const owner = req.userId;
    try {
        const resource = await Resource.findById(resourceId);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        const user = await User.findById(owner);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       
        if (user.role === "admin" || resource.owner.toString() === req.userId.toString()) {
            await Resource.findByIdAndDelete(resource);
            return res.status(200).json({ message: 'Resource deleted successfully' });
        } else {
            return res.status(403).json({ message: 'Permission denied' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting Resource', error: error.message });
    }
};

export const searchResource = async (req, res) => {
    const { category, tags, title } = req.query;

    try {
        const query = {};

        // Category filter with regex (case-insensitive)
        if (category) {

            query.category = { $regex: category, $options: "i" };
        }

        // Tags filter (matching any of the provided tags)
        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagsArray }; // No regex needed, we match exact tags
        }

        // Title filter with full-text search or regex (if text search is configured)
        if (title) {
            query.title = {$regex : title , $options : "i"};
        }

        const resources = await Resource.find(query)

        res.status(200).json(resources);
    } catch (error) {
        console.error("Error fetching resources: ", error);
        res.status(500).json({ message: 'Error fetching resources', error: error.message });
    }
};

export const getResourcesByUserId = async (req, res) => {
    const userId = req.userId;
    console.log("Hello ")
    try {
        const resources = await Resource.find({ 'author': userId });

        return res.status(200).json(resources);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error at fetching job', error: error.message });
    }
};