//TO D0 - change nMW TO APPR SERVICE

const Post = require('../models/post');
const { getUserByUserEmail } = require('./user');



async function getAllPosts() {
    return Post.find({}).lean();
    
}


async function getPostById(id){
    return Post.findById(id).lean();
}




async function getPostnAndVotes(id){
    return Post.findById(id).populate('author').populate('votesOnPost').lean();
}

async function createPost(post, mail){
    const result = new Post(post);
    const user  = await getUserByUserEmail(mail)
    console.log(user);
    console.log(result._id);
    user.myPosts.push(result._id)
    
    
    

    await user.save();
    await result.save();
    
    
    
}

async function deletePostById(id) {
    await Post.findByIdAndDelete(id);
}

async function getPostsByAuthor(userId){
    return Post.find({author: userId}).populate("author", "firstName lastName email");
}




async function vote(postId, userId, value) {
    const post = await Post.findById(postId);
    
  
    if (post.votesOnPost.includes(userId)) {
      throw new Error("User has already voted");
    }
  
    post.votesOnPost.push(userId);
    post.rating += value;
  
    await post.save();
  }
  


async function updatePost(id, post ) {
    
    const existing = await Post.findById(id);

    existing.title = post.title;
    existing.keyword = post.keyword;
    existing.location = post.location;
    existing.dateOfCreation = post.dateOfCreation;
    existing.image = post.image;
    existing.description = post.description;
    
 

    await existing.save();
}


module.exports = {
    getAllPosts,
    getPostById,
    getPostnAndVotes,
    createPost,
    vote,
    deletePostById,
    updatePost,
    getPostsByAuthor,

};