const mongoose = require('mongoose');
const schemaControl = require('../db/schemaControl');
const secrets = require('./secrets.json');

mongoose.connect(secrets.dbUrl, {
  useNewUrlParser: true
});

let db = mongoose.connection;
db.once('open', () => {console.log("Database Connection Successful")});

//logout
let logout = async function logout(req, res){
  req.logout();
  res.redirect('/');
}

let apiControl = {
  logout: logout,
}

module.exports = apiControl;
