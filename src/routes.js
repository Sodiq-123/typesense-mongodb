const express = require('express');
const router = express.Router();
const Books = require('../src/models/books');
const client = require('./helpers/typesense');
const books = require('./books.json');


// add all 10000 books from books.json to mongoDB
router.post('/add', (req, res) => {
  try {
    const bookData = books.map(book => {
      const { title, authors, publication_year, ratings_count, average_rating, image_url } = book;
      const titleField = title === '' ? 'No Title' : title;
      return {
        title: titleField,
        authors: authors,
        publication_year: publication_year,
        ratings_count: ratings_count,
        average_rating: average_rating,
        image_url: image_url
      }
    });
    // console.log('bookData:', bookData.filter(book => !book.authors));
    // insert to mongoDB
    Books.insertMany(bookData, (err, docs) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        return res.status(201).json(docs);
      }
    });
    // insert to typesense
    client
      .collections('books')
      .documents()
      .createMany(bookData)
      .then(response => {
      console.log(response);
    }).catch(error => {
      console.log('error:', error);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

// search/get books by query
router.get('/search', (req, res) => {
  try {
    const { q } = req.query;
    const searchParameters = {
      'q': q,
      'query_by': 'title',
      'sort_by': 'ratings_count:desc'
    }
    client
      .collections('books') 
      .documents()
      .search(searchParameters)
      .then(response => {
        return res.status(200).json(response);
      }
    ).catch(error => {
      console.log('error:', error);
    }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

// get all books from mongoDB but paginate
router.get('/all', (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const allBooks = Books.find().skip(skip).limit(limit).exec((err, books) => {
    if (err) {
      console.log(err);
      return res.status(404).json({
        title: '',
        authors: '',
        publication_year: '',
        ratings_count: '',
        average_rating: ''
      });
    }
    return res.status(200).json(books);
  });
});


module.exports = router;
