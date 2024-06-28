const Menu = require('../models/modelMenu');

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).send({ message: 'Menu not found' });
    }
    res.json(menu);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!menu) {
      return res.status(404).send({ message: 'Menu not found' });
    }
    res.json(menu);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).send({ message: 'Menu not found' });
    }
    res.send({ message: 'Menu deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
