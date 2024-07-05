const Worker = require('../models/workersModel');

exports.createWorker = async (req, res) => {
  try {
    const { user_id, restaurant_id } = req.body;

    const newWorker = await Worker.create({
      user_id,
      restaurant_id
    });

    res.status(201).json({ worker_id: newWorker.worker_id, worker: newWorker.dataValues });
  } catch (err) {
    console.error('Error creating worker:', err);
    res.status(400).json({ error: 'Failed to create worker', details: err.message });
  }
};

exports.updateWorker = async (req, res) => {
  try {
    const { user_id, restaurant_id } = req.body;
    const { id } = req.params;

    const worker = await Worker.findByPk(id);
    if (!worker) {
      return res.status(404).send({ message: 'Worker not found' });
    }

    worker.user_id = user_id;
    worker.restaurant_id = restaurant_id;
    await worker.save();

    res.json(worker);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.findAll();
    res.json(workers);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getWorkerByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const worker = await Worker.findOne({ where: { user_id: userId } });
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(worker);
  } catch (error) {
    console.error('Error fetching worker by user ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the worker' });
  }
};

exports.deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByPk(req.params.id);
    if (!worker) {
      return res.status(404).send({ message: 'Worker not found' });
    }

    await worker.destroy();
    res.send({ message: 'Worker deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
