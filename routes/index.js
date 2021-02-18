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

router.get('/remove/:id', (req, res) => {
  const removeItem = async () => {
    try {
      await Item.findByIdAndDelete(req.params.id).exec();
      console.log("Successfully delete toDo");
      res.redirect("/");
    }
    catch (err) {
      console.log(err);
    }
  }
  removeItem();
});

router.get('/update/:id', (req, res) => {
  const findItemForUpdate = async () => {
    try {
      const item = await Item.findById(req.params.id).exec();
      res.render('update', { item: item, title: 'Modifier la tâche' });
    }
    catch (err) {
      console.log(err);
    }
  }
  findItemForUpdate();
});

router.post('/update/:id/done', (req, res) => {
  const updateItem = async () => {
    try {
      const updatedItem = await Item.updateOne({ _id: req.params.id }, { $set: { text: req.body.text }}).exec();
      const items = await Item.find({}).exec();
      res.render('./', { title: 'Ma ToDoList', items: items });
    }
    catch (err) {
      console.log(err);
    }
  }
  updateItem();
});

router.get('/allItemsDone', function(req, res, next) {
  const findAllItemsDone = async () => {
    try {
      const items = await Item.find({isDone: "true" }).exec();
      res.render('allItemsDone', { title: 'Ma ToDoList faite', items: items });
    }
    catch (err) {
      console.log(err);
    }
  }
  findAllItemsDone();
});

router.get('/doneItem/:id', function(req, res, next) {
  const updateItemSetDone = async () => {
    try {
      const updatedItem = await Item.updateOne({ _id: req.params.id }, { $set: { isDone: true }}).exec();
      const items = await Item.find({}).exec();
      res.render('./', { title: 'Ma ToDoList', items: items });
    }
    catch (err) {
      console.log(err);
    }
  }
  updateItemSetDone();
});

module.exports = router;