const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
	title: String,
	description: String,
	rating: String
}, {
	versionKey: false
});

module.exports = mongoose.model('Recipe', Recipe);
