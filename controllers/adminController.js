const blogSettingModel = require('../models/blogSettingModel');
const BlogSetting = require('../models/blogSettingModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const bcrypt = require('bcrypt');

const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10);

        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}


const blogSetup = async(req,res) => {

    try {
        
        var blogSetting = await BlogSetting.find({});

        if(blogSetting.length > 0 ){
            res.redirect('/login')
        }
        else{
            res.render();
        }

    } catch (error) {
        console.log(error.message);
    }

}
const blogSetupSave = async(req,res) => {


    try {
        const blog_title = req.body.blog_title;
        const blog_image = req.file.filename;
        const blog_description = req.body.description;
        const name = req.body.name;
        const email = req.body.email;
        const password = await securePassword(req.body.password);

        const blogSetting = new blogSettingModel({
            blog_title:blog_title,
            blog_logo:blog_image,
            description:blog_description

        });

        await blogSetting.save();
        
        const user = User({
            name:name,
            email:email,
            password:password,
            is_admin:1
        });

        const userdata = await user.save();
        if (userdata) {
            res.redirect('/login');
        } else {
            res.render('blogSetup',{message:'blog not setup properly'});
        }

    } catch (error) {
        console.log(error.message);
    }
}


const dashboard = async(req,res)=> {
    try {

        res.render('admin/dashboard');
        
    } catch (error) {
        console.log(error.message);  
      }
}

const loadPostDashboard = async (req,res) => {
    
    try {
        
        res.render('admin/postDashboard');

    } catch (error) {
        console.log(error.message);
    }

}

const addPost = async(req,res) => {

try {
    
    imagePath = '';

    if(req.body.image !== undefined){
       imagePath = req.body.image; 
    }

    const post = new Post({
        title:req.body.title,
        content:req.body.content,
        image: image
    });

    const postData = await post.save();

    res.render('admin/postDashboard',{message:'Post added Successfully!'});

} catch (error) {
    console.log(error.message);
}

}

const uploadPostImage = async (req,res) => {

    try {
        var imagePath='/images';
        imagePath = imagePath + '/' + req.file.filename;

        res.send({success:true,msg:'post image upload succesfully',path:imagePath});
        
    } catch (error) {
        res.send({success:false,msg:error.message});
    }
}

module.exports = {
    login,
    blogSetup,
    blogSetupSave,
    dashboard,
    loadPostDashboard, 
    addPost,
    securePassword,
    uploadPostImage
}