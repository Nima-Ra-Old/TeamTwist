const signup = require("./signup.js");
const verifyAccount = require("./verifyAccount.js");
const login = require("./login.js")

module.exports = {
  postSignup: function (db, app){
    return signup.postSignup(db,app);
  },
  postVerifyAccount: function (db, app){
    return verifyAccount.postVerifyAccount(db, app);
  },
  postLogin: function(db, app){
    return login.postLogin(db, app);
  }
}
