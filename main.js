const colors = require('colors');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const md5 = require('md5');
const app = express();
const {db, smtpTransport} = require("./config.js");
const api = require("./API/api.js");
const auth = require("./src/server/auth/auth.js");
const panel = require("./src/server/panel/dashboard.js");
const cookieParser = require('cookie-parser');


app.use(express.static(__dirname + "/src/client"));
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.enable('trust proxy');


app.get('/', function(req, res, next){
  res.sendFile(__dirname + "/src/client/landingPage/landingPage.html");
});

app.get('/login', function(req, res, next){
  res.sendFile(__dirname + "/src/client/auth/login/login.html");
});

app.get('/signup', function(req, res, next){
  res.sendFile(__dirname + "/src/client/auth/signup/signup.html");
});

app.get('/api', function(req, res, next){
  res.sendFile(__dirname + "/src/client/API/api.html");
});

// Auth
auth.postSignup(db , app);
auth.postLogin(db, app);
auth.postVerifyAccount(db, app);


// API loading
api.createUser(db, app, smtpTransport);
api.changePassword(db, app);
api.changeUsername(db, app);
api.getStatistics(db, app);
api.changeEmail(db, app);
api.changePhone(db, app);
api.changePhoto(db, app);
api.getProjects(db, app);
api.revokeToken(db, app);
api.getMembers(db, app);
api.changeName(db, app);
api.verifyUser(db, app);
api.getCredit(db, app);
api.getTeams(db, app);
api.getTodos(db, app);
api.getUser(db, app);
api.charge(db, app);
api.sendPicture(app);
api.deleteTodo(db, app);
api.addTodo(db, app);
api.getDeadlines(db, app);
api.addDeadline(db, app);
api.deleteDeadline(db, app);
// Panel
panel.dashboard(db, app);

app.listen(8545);
