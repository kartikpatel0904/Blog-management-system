const Post = require('../models/postModel');


const loadBlog = async(req,res) =>{

   try {
    
        const posts = await Post.find({});
        res.render('blog',{posts:posts});

   } catch (error) {
    console.log(error.message);
   }

}

const loadPost = async(req,res) => {

    try {
        const post = await Post.findOne({"id":req.params.id});

        res.render('post',{post:post});

    } catch (error) {
        console.log(error.message);
    }
}

const addComment = async (req,res) =>{

    try {

        var post_id = req.body.post_id;
        var username = req.body.username;
        var comment = req.body.comment;

        await Post.findByIdAndUpdate({_id:post_id},{
            $push:{
                "commnets":{username:username , comment:comment}
            }
        });


        res.status(200).send({success:true,msg:"Comment added"});
    } catch (error) {
        res.status(200).send({success:false,msg:error.message});
    }
}

module.exports = {
    loadBlog, 
    loadPost,
    addComment
}