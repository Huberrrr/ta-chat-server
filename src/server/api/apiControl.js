const mongoose = require('mongoose');
const schemaControl = require('../db/schemaControl');
const secrets = require('./secrets.json');


mongoose.connect(url, {
  useNewUrlParser: true
});

let db = mongoose.connection;
mongoose.connection.once('open', () => {console.log("Database Connection Successful")});

let apiControl = {

}

module.exports = apiControl;
