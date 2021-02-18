const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schéma
const itemSchema = {
  text: String,
  isDone: Boolean
}

const Item = mongoose.model("Item", itemSchema);
  
// const item1 = new Item ({
//   text: "Test text",
//   isDone: false
// });

// item1.save();
  