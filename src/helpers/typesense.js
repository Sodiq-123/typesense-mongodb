let Typesense = require('typesense');
const dotenv = require('dotenv').config()

let client = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: 443,
      protocol: 'https'
    }
  ],
  apiKey: process.env.API_KEY,
  connectionTimeoutSeconds: 5
});

let bookSchema = {
  "name": "books",
  "fields": [
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "authors",
      "type": "string[]",
      "facet": true
    },

    {
      "name": "publication_year",
      "type": "int32",
      "facet": true
    },
    {
      "name": "ratings_count",
      "type": 'int32'
    },
    {
      "name": "average_rating",
      "type": "float",
      "facet": true
    }
  ],
  "default_sorting_field": "ratings_count",
};

client
  .collections()
  .create(bookSchema)
  .then(() => {
    console.log('collection created');
  })
  .catch((err) => {
    console.log('collection already exists');
  })
  .then(() => {
    client
      .collections()
      .retrieve('books')
      .then((collection) => {
        console.log('collection retrieved')
      })
      .catch((err) => {
        console.log(err);
      })
  })

module.exports = client;