const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
});

const Category = model('Category', categorySchema);

module.exports = Category;
