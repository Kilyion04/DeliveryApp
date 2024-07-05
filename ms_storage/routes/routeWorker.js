const express = require('express');
const router = express.Router();
const workersController = require('../controllers/workersController');

router.post('/workers', workersController.createWorker);
router.get('/workers/user/:userId', workersController.getWorkerByUserId);

module.exports = router;
