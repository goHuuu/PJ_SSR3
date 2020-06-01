const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
//pour check l'ident du mec a chaque fois
const Auth = require('../models/Auth');


//GET

//cherche tous les article
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({message:err});
    }
    res.send('We are on posts 2');
});

//cherche un artcle en particulier
router.get('/:postId', async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json({message:err});
    }
    
});

//POST

//upload un article
router.post('/', async (req,res) => {
    console.log(req.body);

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        recette: req.body.recette,
        ingredients: req.body.ingredients
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
  
});

//DEL

//supprime un article
router.delete('/:postId', async (req,res) => {
    try {
            const removedPost = await Post.remove({_id: req.params.postId});
            res.json(removedPost);
        } catch (error) {
            res.json({ message: err });
    }
    
});

//UPD

//met à jour un article
router.patch('/:postId', async (req,res) => {

    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.postId}, 
            { $set: {title: req.body.title}
        });
        res.json(updatePost);
    } catch (error) {
        res.json({ message: err });
    }
    
})

module.exports = router;