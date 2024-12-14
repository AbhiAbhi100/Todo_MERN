const { userModel, toDoModel } = require('../models/ToDoModel');

module.exports.getToDos = async (req, res) => {
  const toDos = await toDoModel.find();
  res.send(toDos);
};

module.exports.saveToDo = (req, res) => {
  const { toDo, addedBy } = req.body;

  toDoModel
    .create({ toDo, addedBy })
    .then((newToDo) => {
      console.log('ToDo Saved Successfully..');

      return userModel.findByIdAndUpdate(
        addedBy,
        { $push: { tasks: newToDo._id } },
        { new: true }
      );
    })
    .then((updatedUser) => {
      console.log('User Updated Successfully..');
      res
        .status(201)
        .send({ message: 'created successfully', user: updatedUser });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Error occurred' });
    });
};

module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;

  toDoModel
    .findByIdAndUpdate(id, { toDo })
    .then(() => {
      res.send('Updated successfully...');
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: 'Something went wrong!' });
    });
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;

  toDoModel
    .findByIdAndDelete(id)
    .then(() => {
      res.send('Deleted Successfully...');
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: 'Something went wrong!' });
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  userModel
    .findById(id)
    .populate('tasks')
    .then((data) => {
      console.log('data', data);
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
};
module.exports.createUser = async (req, res) => {
  const { name, email, password } = await req.body;
  userModel
    .create({ name, email, password })
    .then((data) => {
      console.log('Saved Successfully..');
      res.status(201).send(data);
    })
    .catch((err) => console.log(err));
};
