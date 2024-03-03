const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const User = require("../models/User");
var nodemailer = require("nodemailer");
const createJwtToken = require('../token');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "subhadipadhikary83@gmail.com",
      pass: "rjly zbjd goft xkwm",
    },
    secure: true,
  });

router.post("/validate", async (req, res) => {
    console.log("t1");
    try {
      console.log("t2");
      const token = req.query.token;
      const payload = jwt.verify(token, "ASIUDOASNDUH(*@HQIENDQ");
      const user = await User.findById(payload.user).select("-password");
      user.password = req.body.password;
      user.save();
      res.json({ message: "Password Changed Successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.post("/mail", async (req, res) => {
try {
    const email = req.body.email;
    const user = await User.findOne({
    email,
    }).select("-password");
    
    if (!user) {
    return res.json({ error: "User not found" });
    }
    const token = createJwtToken(user._id);
    const mailData = {
    from: "subhadipadhikary83@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: `
    link - ${process.env.FRONTEND_URL}/ForgotPassword?token=${token}
    `,
    };
    transporter.sendMail(mailData);
    // const user = await User.findById(req.body.id).select("-password");
    // const token = createJwtToken(user);
    res.json({ message: "Password reset link sent successfully!" });
} catch (error) {
    res.json({ error: error.message });
}
});

module.exports = router;