const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Blog = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	date: {
		type: Date
	},
	owner: {
		name: String,
		email: String,
		photo_url: String
	}	
},{
	collection: 'blogs'
});

module.exports = mongoose.model('Blog', Blog);