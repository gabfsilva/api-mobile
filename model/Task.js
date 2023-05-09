const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  description: {
    type: String
  }
},{
    collection: 'task'
});

module.exports = mongoose.model('Task', Task);