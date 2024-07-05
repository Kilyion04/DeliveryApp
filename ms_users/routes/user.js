const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes and associate them with controller methods
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.softDeleteUser);
router.get('/email/:email', userController.getUserByEmail);
router.put('/:id/status', userController.updateUserStatus);

module.exports = router;
