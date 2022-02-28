const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
  title: {
    type: String,
    required: true, 
    default: 'No Title',
  },
  authors: {
    type: [String],
    required: true
  },
  publication_year: {
    type: Number,
    required: true
  },
  ratings_count: {
    type: Number,
    required: true
  },
  average_rating: {
    type: Number,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
});

const Books = mongoose.model('Books', booksSchema)

module.exports = Books;
