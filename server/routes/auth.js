const router = require('express').Router();
const user =require(`../models/User`);
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const jwt = require(`jsonwebtoken`);

//REGISTER
router.post(`/register`,async (req,res)=>{//async used to wait for complition
    //Create a new user object at set values acc to request
    console.log(req.body);
    const newUser = new user({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    });
    //Try to save the user to database and if an error then catc block will run
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post(`/login`, async (req,res)=>{
    try{
        //Find user to DB
        const user=await User.findOne({ username : req.body.username });
        //If not found the user
        !user && res.status(401).json("Incorrect Username");
        //check password after decrypt it
        const hashedPassword = CryptoJS.AES.decrypt( user.password , process.env.PASS_SEC );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password &&res.status(401).json("Incorrect password");
        //to Destract user from password 
        

        const accessToken= jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        },process.env.JWT_SEC,
        {expiresIn : '1d'});
        const {password, ...others } =user._doc;// DB has stored data in `_doc` folder

        res.status(200).send({...others, accessToken});
    }
    catch(err){
    }
});



module.exports = router;