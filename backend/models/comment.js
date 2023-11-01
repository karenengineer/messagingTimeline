const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'userId is required']
    },
  timestamp: Date,
  content: String,
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
    required: [true, 'messageId is required']
  }
}, {timestamps: true});

commentSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }});

const Comment = mongoose.model('Comment', commentSchema);

module.exports =  Comment;
