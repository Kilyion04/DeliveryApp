const axios = require('axios');
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
    const { menu_name, menu_description, article_list, restaurant_id } = req.body;

    const articlePromises = article_list.map(id => axios.get(`http://localhost:3010/api/ms_articles/${id}`));
    const articleResponses = await Promise.all(articlePromises);
    const articles = articleResponses.map(response => response.data);

    const totalPrice = articles.reduce((total, article) => total + article.article_price, 0) * 0.8;

    const menu = new Menu({
      restaurant_id,
      menu_name,
      menu_description,
      menu_price: totalPrice,
      article_list
    });

    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    console.error('Error creating menu:', err);
    res.status(500).send(err);
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const { menu_name, menu_description, article_list } = req.body;

    // Fetch articles details from ms_articles service
    const articlePromises = article_list.map(id => axios.get(`http://localhost:3010/api/ms_articles/${id}`));
    const articleResponses = await Promise.all(articlePromises);
    const articles = articleResponses.map(response => response.data);

    // Calculate total price (sum of articles' prices * 0.8)
    const totalPrice = articles.reduce((total, article) => total + article.article_price, 0) * 0.8;

    const updatedMenu = {
      menu_name,
      menu_description,
      menu_price: totalPrice,
      article_list
    };

    const menu = await Menu.findByIdAndUpdate(req.params.id, updatedMenu, { new: true, runValidators: true });
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
