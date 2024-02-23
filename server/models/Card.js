const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  front: {
    type: String,
    required: true,
    trim: true,
  },
  back: {
    type: String,
    required: true,
    trim: true,
  },

  category: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
});
const Card = model('Card', cardSchema)

module.exports = Card;