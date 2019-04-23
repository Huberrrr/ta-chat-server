const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
	name: { type: String, required: true },
	gid: { type: String, required: true },
	picture: { type: String, required: true },
	rooms: { type: Array, default: [], required: true }
});

let schemaControl = {
	User: mongoose.model("User", User),
}
module.exports = schemaControl;
