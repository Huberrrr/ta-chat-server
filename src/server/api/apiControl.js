const mongoose = require('mongoose');
const schemaControl = require('../db/schemaControl');
const secrets = require('./secrets.json');

mongoose.connect(secrets.dbUrl, {
  useNewUrlParser: true
});

let db = mongoose.connection;
mongoose.connection.once('open', () => {console.log("Database Connection Successful")});

async function check_permissions(req, res, id){
  let user = await schemaControl.User.findById(id).catch(err => { console.log("malformed id"); return true; });
  if(user){
    return false;
  }
  else{
    return true;
  }
}

let dashboard = async function dashboard(req, res){
  return res.status(200).send({ success: "dashboard" });
}

//register a new acount
let register = async function register(req, res){
  //passport registration
  if(!db.readyState){ return res.status(500).send({ error: "register: Database connection is down" }); }
}

//login
let login = async function login(req, res){
  if(!db.readyState){ return res.status(500).send({ error: "login: Database connection is down" }); }
  if(await check_permissions(req, res, req.body.id)){ return; }
}

//logout
let logout = async function logout(req, res){
  if(!db.readyState){ return res.status(500).send({ error: "logout: Database connection is down" }); }
  if(await check_permissions(req, res, req.body.id)){ return; }
}

//create a new room
let create_room = async function create_room(req, res){
  if(!db.readyState){ return res.status(500).send({ error: "create_room: Database connection is down" }); }
  if(await check_permissions(req, res, req.body.id)){ return; }
}

//send message to a room
let send_message = async function send_message(req, res){
  if(!db.readyState){ return res.status(500).send({ error: "send_message: Database connection is down" }); }
  if(await check_permissions(req, res, req.body.id)){ return; }
}

//delete room, messages, adjust modfier, kick members, etc.
let manage_room = async function manage_room(req, res){
  if(!db.readyState){ return res.status(500).send({ error: "manage_room: Database connection is down" }); }
  if(await check_permissions(req, res, req.body.id)){ return; }
}

//apis for retrieving information

//get user dashboard
let get_user_dashboard = async function get_user_dashboard(req, res){
  if(!db.readyState){ return res.status(500).send({ error: "get_user_dashboard: Database connection is down" }); }
  if(await check_permissions(req, res, req.body.id)){ return; }
}

//get room information (settings, members, admins, owner, banned)
let get_room_settings = async function get_room_settings(req, res){
  if(!db.readyState){ return res.status(500).send({ error: "get_room_settings: Database connection is down" }); }
  if(await check_permissions(req, res, req.body.id)){ return; }
}

//get room messages
let get_room_messages = async function get_room_messages(req, res){
  if(!db.readyState){ return res.status(500).send({ error: "get_room_messages: Database connection is down" }); }
  if(await check_permissions(req, res, req.body.id)){ return; }
}

let apiControl = {
  dashboard: dashboard,
  register: register,
  login: login,
  logout: logout,
  create_room: create_room,
  send_message: send_message,
  manage_room: manage_room,
  get_user_dashboard: get_user_dashboard,
  get_room_settings: get_room_settings,
  get_room_messages: get_room_messages
}

module.exports = apiControl;
