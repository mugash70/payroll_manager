var express = require('express');
const session = require('express-session');
var app = express.Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const pool = require("../database/config.js");
var sendEmail= require('./email.js')
const verifyToken = require('../middleware/authmiddleware');
const crypto = require('crypto');

app.post("/login", async (req, res, next) => {
    try {
      const { email,password } = req.body;
      await pool.query(`SELECT * FROM users WHERE email = $1`, [email], async (err, response) => {
        validateUser(email,password);
      
   
        if (err) {console.log(err.stack)} else {
          if (response.rows.length === 0) {res.status(400).json({ msg: "user not found" })}
          
          else if (response.rows[0].length != 0) {
            const isPasswordMatch = await bcrypt.compare(password, response.rows[0].password);
        
            if(isPasswordMatch){
            const token = jwt.sign({ userId:response.rows[0].emp_id }, process.env.JWTSTUFF);

            res.status(200).json({
              token, user: response.rows[0]
            });
          }else{
            res.status(401).json({ msg: "Wrong password" })
          }
           
          }

        }
      });
    }
    catch (error) {
      res.status(500).json({ msg: "Error logging in" })
      console.log(error);
    }
  });

app.get('/createuser',(req,res) => {
    const myusername = 'user1'
    const mypassword = 'mypassword'
    var session;
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/user/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})




app.post('/forgot', async (req, res) => {
    const { email } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
        return res.status(404).send(`User Mail not found contact Admin`);
    } else {
        const token = crypto.randomBytes(20).toString('hex');
        const resetLink = `${req.protocol}://${req.get('host')}/reset/${token}`;
        const resetEmailTemplate = `
            We received a request to reset the password for your account. If you did not make this request, please ignore this email.
            To reset your password, please click on the following link:
            ${resetLink}
            This link is valid for [expiration period,24 hours]. If you don't reset your password within this time, you'll need to submit another request.
            Thank you,
            [Your Company Name]
        `;

        sendEmail(email, "Password Reset Request", resetEmailTemplate);
        res.status(200).send({data:"Password reset instructions have been sent to your email."});
    }
});



app.post('/reset-password', async (req, res) => {
  try {
    const { email, old_password, new_password, c_new_password } = req.body;
    if (new_password !== c_new_password) {
        return res.status(400).send('New password and Confirm password must match');
    }
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
        return res.status(404).send('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(old_password, user.rows[0].password);
    if (!isPasswordMatch) {
        return res.status(401).send('Incorrect old password');
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
    res.status(200).send({msg:'Password updated successfully'});
} catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
}
});

app.get('/logout',(req,res) => {

    req.session.destroy();
    res.redirect('/');
});




const validateUser = (email,password) => {
    const userEmail = typeof email === 'string' && email.trim() != '';
    const userPassword = typeof password === 'string' && password.trim() != '';
    if (userEmail) {return userEmail}
    else {next(new Error({ msg: "Invalid user" }));}
    if (userPassword) {return userPassword}
    else {next(new Error({ msg: "Invalid user" }));}
}

module.exports = app;