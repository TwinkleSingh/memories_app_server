import mongoose from 'mongoose';
import PostMessage from "../models/postMessages.js";

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();
        
        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({message: error});
    }
    // res.send('THIS WORKS');
}

export const createPosts = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({message : error});
    }
}

export const updatePost = async (req,res) => {
    const {id : _id} = req.params;

    const post = req.body;
    
    //check if it is a moongose id 
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with that id`);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, {new : true});
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);

    res.json({ message : "Post deleted successfully."});
}

export const likePost = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount : post.likeCount + 1}, {new : true});

    res.json(updatedPost);
}

//Update by ID Method
// export const updatePost = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }
