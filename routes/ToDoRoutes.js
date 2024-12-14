const { Router } = require('express');
const {
  getToDos,
  saveToDo,
  updateToDo,
  deleteToDo,
  createUser,
  getUser,
} = require('../controller/ToDoController');

const router = Router();

router.get('/get', getToDos);
router.post('/save', saveToDo);
router.put('/update/:id', updateToDo);
router.delete('/delete/:id', deleteToDo);

router.post('/create-user', createUser);
router.get('/get-user/:id', getUser);
router.post(
  '/login'

  // login users
);
router.get(
  '/login/:id'

  // user details + user's todo
);

module.exports = router;
