const express = require('express');
const router = express.Router();
const Auth = require('../models/Auth');

//GET

//get tous les user
router.get('/all', async (req, res) => {
    try {
        const users = await Auth.find();
        res.json(users);
    } catch (error) {
        res.json({message:err});
    }
    res.send('We are on posts 2');
});

//POST

//get one user
router.post('/', async (req,res) => {
    try {
        const usr = await Auth.findOne({'username': req.body.username, 'password': req.body.password});
        res.json(usr);
    } catch (error) {
        res.json({message:err});
    }
    res.send('We are on auth');
});

//enregistre un user
router.post('/', async (req,res) => {
    console.log(req.body);
    const usr = new Auth({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    try{
        const registeredUsr = await usr.save();
        res.json(registeredUsr);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;