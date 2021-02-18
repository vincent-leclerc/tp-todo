require('../db');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.find({}).exec();
    res.render('index', { title: 'Ma ToDoList', items: items });
  }
  catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  const itemText = req.body.item;
  try {
    const item = await new Item ({
      text: itemText,
      isDone: false
    });

    await item.save();
    res.redirect("/");
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/remove/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id).exec();
    res.redirect("/");
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/update/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).exec();
    res.render('update', { item: item, title: 'Modifier la tâche' });
  }
  catch (err) {
    console.log(err);
  }
});

router.post('/update/:id/done', async (req, res) => {
  try {
    await Item.updateOne({ _id: req.params.id }, { $set: { text: req.body.text }}).exec();
    const items = await Item.find({}).exec();
    res.render('./', { title: 'Ma ToDoList', items: items });
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/allItemsDone', async (req, res, next) => {
  try {
    const items = await Item.find({isDone: "true" }).exec();
    res.render('allItemsDone', { title: 'Ma ToDoList faite', items: items });
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/doneItem/:id', async (req, res, next) => {
  try {
    await Item.updateOne({ _id: req.params.id }, { $set: { isDone: true }}).exec();
    const items = await Item.find({}).exec();
    res.render('./', { title: 'Ma ToDoList', items: items });
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;