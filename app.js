var express = require("express")
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const flash = require("express-flash");
require("dotenv").config();

const app = express();
const cors = require("cors");
const path = require("path");
const session=require('express-session')
const cookieP=require('cookie-parser')
//route 
const authRoutes = require("./routes/auth");
const OrgRoutes = require("./routes/organization");
const uploadpic = require("./routes/configs/logoUpload")
//middleware
app.use(cors());


//session
var Oneday= 1000*60*60*24
app.use(session({
  secret:process.env.jwtSecret,
  saveUninitialized:true,
  cookie:{maxAge:Oneday},
  resave:false

}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', authRoutes);
app.use('/organization', OrgRoutes);
app.use('logoupload', uploadpic);


app.use(express.static(path.join(__dirname, 'frontend/build')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
}


app.use(cookieP())

app.use(flash());
//error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.status(500).json({ message: err.message, error: req.app.get('env') === 'development' ? err : {} });

});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});