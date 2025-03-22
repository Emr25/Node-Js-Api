 const User = require("../models/UserModel")
 const bcrypt = require("bcryptjs")
 const jwt = require("jsonwebtoken")

 const jwtSecret = 'super-secret-key'; // Sabit secret key
 
 function createToken (id) {
    return jwt.sign({id},jwtSecret,{expiresIn:"1h"})
    
 }

 module.exports.getUser=async(req,res)=>{
    try {
        const tumUser = await User.find({})
    res.json(tumUser)
    } catch (error) {
        console.error('Kullanıcılar getirilirken hata oluştu:', error);
        res.status(500).json({ message: 'Bir hata oluştu.', error });
    }
    
 }

 //SIGN IN 
 module.exports.postSign = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // E-posta ve kullanıcı adı için ayrı ayrı kontrol
        const emailExists = await User.exists({ email });
        const usernameExists = await User.exists({ username });

        if (emailExists) {
            return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
        }

        if (usernameExists) {
            return res.status(400).json({ message: "Bu kullanıcı adı zaten kayıtlı." });
        }

        // Şifreyi hashle
        const hashedPass = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluştur
        const newUser = new User({
            email,
            username,
            password: hashedPass,
        });

        // Kullanıcıyı kaydet
        const user = await newUser.save();

        // Token oluştur ve cookie'ye ekle
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Başarılı yanıt
        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi.", user });
    } catch (error) {
        console.error("Kullanıcı kaydı sırasında hata oluştu:", error);
        res.status(500).json({ message: "Bir hata oluştu.", error: error.message });
    }
};



 //LOGIN 
 module.exports.postLogin = async(req,res)=>{
      
    try {
        const user = await User.findOne({email : req.body.email})
        if(!user) return res.json("Email Wrong")

        const validate = await bcrypt.compare(req.body.password,user.password)
        if(!validate) return res.json("wrong password")

        const token = createToken(user._id)
        res.cookie("jwt",token)
        res.json("Hoşgeldiniz")

    } catch (error) {
         res.status(500).json({error:"Eror Login process"})    
    }
 }




 //LOGOUT
 module.exports.postLogout=async(req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.json("Logout successful")
 }