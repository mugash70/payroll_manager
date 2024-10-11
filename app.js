var express = require("express")
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const flash = require("express-flash");
require("dotenv").config();

const app = express();
const cors = require("cors");
const path = require("path");



const cookieP=require('cookie-parser')
const verifyToken =require("./middleware/authmiddleware.js")
//route 
const authRoutes = require("./routes/auth");
const OrgRoutes = require("./routes/organization");
const uploadpic = require("./routes/configs/logoUpload")
const EmpRoute = require("./routes/employees")
const EntRoute = require("./routes/entity")

const GrRoute = require("./routes/grades")
const transactions = require("./routes/transactions")
const RoleRoute = require("./routes/role")
const ReportsRoute = require("./routes/report")
const BDRoute = require("./routes/employees")

const session=require('express-session')
const PgSession = require('connect-pg-simple')(session);
const pool = require("./database/config.js");
//middleware
app.use(cors());

//session

app.use(session({
  store: new PgSession({pool: pool,
    createTableIfMissing: true, 
    tableName: 'session' }),
  secret:process.env.JWTSTUFF,
  resave: false,
  saveUninitialized: false, 
  cookie: { 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use((req, res, next) => {
  req.session.save((err) => {
    if (err) {
      console.error('Session save error:', err);
    }
    next();
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',authRoutes);
app.use('/organization',verifyToken,OrgRoutes);
app.use('/upload',uploadpic);
app.use('/employees',verifyToken,EmpRoute);
app.use('/entity',verifyToken, EntRoute);
app.use('/grades',verifyToken, GrRoute);
app.use('/transactions',verifyToken, transactions)

app.use(express.static(path.join(__dirname, 'middleware')));
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});
app.use(cookieP())
app.use(flash());
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.status(500).json({ message: err.message, error: req.app.get('env') === 'dev' ? err : {} });
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});