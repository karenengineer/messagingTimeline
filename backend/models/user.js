const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const user = new Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
});

user.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
})

const User = mongoose.model('User', user);

module.exports = User;
