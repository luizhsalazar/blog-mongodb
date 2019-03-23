const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
	title: {
		type: String
	},
	subtitle: {
		type: String
	},
	root_content: {
		type: String
	},
	date: {
		type: Date
	},
	blog_id: {
		type: Schema.Types.ObjectId, ref: 'Blog'
	},
	sections: [
		{
			title: String,
			subtitle: String,
			content: String,
			subSections: [
				{
					title: String,
					subtitle: String,
					content: String
				}
			]
		}
	]
},{
	collection: 'posts'
});

module.exports = mongoose.model('Post', Post);