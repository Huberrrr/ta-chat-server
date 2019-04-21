const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
	name: { type: String, required: true },
	rooms: { type: Array, default: [], required: true }
});
let Room = new Schema({
	name: { type: String, required: true },
	owners: { type: Array, required: true },
	members: { type: Array, required: true },
	messages: { type: Array, default: [], required: true },
	modifier: { type: Number, default: 10, required: true }
});
let Message = new Schema({
	owner: { type: String, required: true },
	message: { type: String, required: true },
	timestamp: { type: Date, default: Date.now, required: true }
});

let schemaControl = {
	User: mongoose.model("User", User),
	Room: mongoose.model("Room", Room),
	Message: mongoose.model("Message", Message),
}
module.exports = schemaControl;
