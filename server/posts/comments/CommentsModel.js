const db = require('../../db');
const { Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const commentSchema = new db.Schema({
	body: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: "Post"
	}
});

commentSchema.plugin(mongoosePaginate);

const Comment = db.model('Comment', commentSchema);

module.exports = Comment;