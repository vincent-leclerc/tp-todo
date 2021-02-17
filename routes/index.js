require('../db');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

/* GET home page. */
router.get('/', function(req, res, next) {

  const findAllItems = async () => {
    try {
      const items = await Item.find({}).exec();
      console.log(items);
      res.render('index', { title: 'Ma ToDoList', items: items });
    }
    catch (err) {
      console.log(err);
    }
  }
  findAllItems();
});

router.post('/', (req, res) => {
  const itemText = req.body.item;

  const insertItem = async () => {
    try {
      const item = await new Item ({
        text: itemText,
        isDone: false
      });

      await item.save();
      console.log("Successfully inserted item");
      res.redirect("/");
    }
    catch (err) {
      console.log(err);
    }
  }
  insertItem();
  
});

module.exports = router;
