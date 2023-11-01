const bodyParser = require("body-parser");
const express = require("express");
const Message = require("../models/message");
const Comment = require("../models/comment");
const User = require("../models/user");
const mongoose = require("mongoose");
const app = express();
const statuses = require('./../constants/constants');
const cors = require('cors');

mongoose.connect('mongodb+srv://karensoftengineer:lwzVuqj54lxDDanO@cluster0.qnckn94.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err))

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());

// add comment
app.post('/messages/:messageId/comments', (req, res) => {
  const messageId = req.params.messageId;
  const newComment = req.body;

  Message.findById(messageId)
    .then((message) => {
      if (!message) {
        res.status(statuses.pageNotFound).send('Message not found');
        return;
      }

      // Create a new message document
      const comment = new Comment({
        author: newComment.author,
        timestamp: newComment.timestamp,
        content: newComment.content,
        message: messageId,
      });

      return comment.save()
        .then(() => {
          message.comments.push(comment);
          return message.save()
            .then(() => {
              res.status(statuses.success).json(message);
            });
        });
    })
    .catch((error) => {
      res.status(statuses.serverError).send('Internal Server Error');
    });
});

// login
app.post('/login',  (req, res) => {
  console.log(11)
  const username = req.body.name;
  console.log(req.body);
  User.create({ name: username })
    .then(data => {
      console.log(data);
      res.status(statuses.success).json({ status: statuses.success, data });
    })
    .catch(error => {
      res.status(statuses.serverError).json(error);
    });
});

// get user
app.get(`/user`, (req, res) => {
  const username = req.query.username
  User.find({ name: username })
    .then((result) => {
      if (result.length > 0) {
        res.status(statuses.success).json({ status: statuses.success, result: result[0] });
      } else {
        res.status(statuses.pageNotFound).json({ status: statuses.pageNotFound, message: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(statuses.serverError).json({ status: statuses.serverError, error: error.message });
    });
});

// get messages
app.get('/messages', (req, res) => {
  Message.find()
    .select({ __v: 0 })
    .populate('author', { __v: 0 })
    .populate({
      path: 'comments',
      populate: { path: 'author', __v: 0 },
    })
    .exec()
    .then((messages) => {
      res.status(statuses.success).json({ status: statuses.success, data: messages });
    })
    .catch((error) => {
      res.status(statuses.serverError).json(error);
    });
});

// create message
app.post('/message', (req, res) => {
  const newMessage = req.body;

  Message.create({ content: newMessage.content, author: newMessage.author })
    .then((data) => {
      res.status(statuses.success).json({ status: statuses.success, data });
    })
    .catch((error) => {
      res.status(statuses.serverError).json(error);
    });
});

module.exports = app;

