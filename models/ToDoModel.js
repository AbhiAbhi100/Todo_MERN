const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ToDo',
    },
  ],
});

const userModel = mongoose.model('User', userSchema);
const toDoModel = mongoose.model('ToDo', toDoSchema);

module.exports = { userModel, toDoModel };
