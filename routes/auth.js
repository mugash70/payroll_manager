var express = require('express');
const session = require('express-session');
var app = express.Router()
const bcrypt = require("bcrypt");



// app.post('/login',(req,res) => {
//     session=req.session;
//     if(session.userid){
//         res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//     }else
//     res.sendFile('views/index.html',{root:__dirname})
// });


app.post("/login", async (req, res, next) => {
    try {
      const { email } = req.body;
      await pool.query(`SELECT * FROM employees WHERE email = $1`, [email], (err, response) => {
        validateUser(req.body.email,req.body.password);
        if (err) {console.log(err.stack)} else {
          if (response.rows.length === 0) {res.status(400).json({ msg: "user not found" });}
          else if (response.rows[0].length != 0) {let token = jwtGenerator(response.rows[0].emp_id);
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

app.post('/createuser',(req,res) => {
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


app.get('/logout',(req,res) => {

    req.session.destroy();
    res.redirect('/');
});




const validateUser = (email,password) => {
    const userEmail = typeof req.body.email === 'string' && req.body.email.trim() != '';
    const userPassword = typeof req.body.password === 'string' && req.body.password.trim() != '';
    if (userEmail) {return userEmail}
    else {next(new Error({ msg: "Invalid user" }));}
    if (userPassword) {return userPassword}
    else {next(new Error({ msg: "Invalid user" }));}
}

module.exports = app;