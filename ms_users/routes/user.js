// routes/user.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.get('/email', UserController.getUserByEmail);
router.delete('/:id', UserController.softDeleteUser);

module.exports = router;
