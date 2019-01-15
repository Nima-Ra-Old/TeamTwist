/**
Modules of API are added here to be used when app calls them.
They are oriented by their length.
**/
const { db } = require("../config.js");
const changePassword  = require('./api_modules/changePassword.js');
const changeUsername = require('./api_modules/changeUsername.js');
const getStatistics = require('./api_modules/getStatistics.js');
const changeEmail = require('./api_modules/changeEmail.js');
const changePhone = require('./api_modules/changePhone.js');
const changePhoto = require('./api_modules/changePhoto.js');
const getProjects = require('./api_modules/getProjects.js');
const getMembers = require('./api_modules/getMembers.js');
const changeName = require('./api_modules/changeName.js');
const createUser = require('./api_modules/createUser.js');
const verifyUser = require('./api_modules/verifyUser.js');
const getCredit = require('./api_modules/getCredit.js');
const getTeams = require('./api_modules/getTeams.js');
const getTodos = require('./api_modules/getTodos.js');
const getUser = require('./api_modules/getUser.js');
const charge = require('./api_modules/charge.js');
const sendPicture = require('./api_modules/sendPicture.js');
const revokeToken = require('./api_modules/revokeToken.js');
const deleteTodo = require('./api_modules/deleteTodo.js');
const addTodo = require('./api_modules/addTodo.js');


let apiLoader = {
  changePassword: function(db, app){
    var method = changePassword.changePassword(db, app);
    return method;
  },
  changeUsername: function (db, app){
    var method = changeUsername.changeUsername(db, app);
    return method;
  },
  getStatistics: function (db, app){
    var method = getStatistics.getStatistics(db, app);
    return method;
  },
  changeEmail: function (db, app){
    var method = changeEmail.changeEmail(db, app);
    return method;
  },
  changePhone: function (db, app){
    var method = changePhone.changePhone(db, app);
    return method;
  },
  changePhoto: function (db, app){
    var method = changePhoto.changePhoto(db, app);
    return method;
  },
  getProjects: function (db, app){
    var method = getProjects.getProjects(db, app);
    return method;
  },
  getMembers: function (db, app){
    var method = getMembers.getMembers(db, app);
    return method;
  },
  changeName: function (db, app){
    var method = changeName.changeName(db, app);
    return method;
  },
  getCredit: function (db, app){
    var method = getCredit.getCredit(db, app);
    return method;
  },
  getTeams: function (db, app){
    var method = getTeams.getTeams(db, app);
    return method;
  },
  getTodos: function (db, app){
    var method = getTodos.getTodos(db, app);
    return method;
  },
  getUser: function (db, app){
    var method = getUser.getUser(db, app);
    return method;
  },
  charge: function (db, app){
    var method = charge.charge(db, app);
    return method;
  },
  createUser: function (db, app, smtpTransport){
    var method = createUser.createUser(db, app, smtpTransport);
    return method;
  },
  verifyUser: function (db, app){
    var method = verifyUser.verifyUser(db, app);
    return method;
  },
  sendPicture: function (app){
    var method = sendPicture.sendPicture(app);
    return method;
  },
  revokeToken: function (db, app){
    var method = revokeToken.revokeToken(db, app);
    return method;
  },
  deleteTodo: function (db, app){
    var method = deleteTodo.deleteTodo(db, app);
    return method;
  },
  addTodo: function (db, app){
    var method = addTodo.addTodo(db, app);
    return method;
  }
}

// here modules are exported to use in the ../main.js file as api constant so they should use module.exports
module.exports = apiLoader
