var express = require('express');
const session = require('express-session');
var app = express.Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const pool = require("../database/config.js");
const verifyToken = require('../middleware/authmiddleware');


// app.post('/login',(req,res) => {
//     session=req.session;
//     if(session.userid){
//         res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//     }else
//     res.sendFile('views/index.html',{root:__dirname})
// });


app.post("/login", async (req, res, next) => {
    try {
      const { email,password } = req.body;
      await pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, response) => {
        validateUser(email,password);
        if (err) {console.log(err.stack)} else {
          if (response.rows.length === 0) {res.status(400).json({ msg: "user not found" });}
          else if (response.rows[0].length != 0) {
            const token = jwt.sign({ userId:response.rows[0].emp_id }, process.env.JWTSTUFF, 
              // {expiresIn: '1h',}
              );

            res.status(200).json({
              token, user: { id: response.rows[0].emp_id, email: response.rows[0].email, name: response.rows[0].name }
            });
          }
        }
      });
    }
    catch (error) {
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

app.get('/forgot',async (req,res) => {
  var {email} =req.body
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rows.length === 0) {
      return res.status(404).send(`User not found contact Admin :<a href='mailto:contact@example.com'>click to contact</a>`);
  }else{
    
  }
})


app.post('/reset-password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        return res.status(400).send('your New password and Confirm password must match');
    }
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
        return res.status(404).send('User not found');
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.rows[0].password);
    if (!isPasswordMatch) {
        return res.status(401).send('Incorrect old password');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
    res.status(200).send('Password updated successfully');
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