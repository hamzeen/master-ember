/* eslint-env node */
'use strict';

module.exports = function(app) {
  const express = require('express');
  let rentalsRouter = express.Router();
  var rentals = [
      {
        type: 'rentals',
        id: 1,
        attributes: {
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          type: 'Estate',
          bedrooms: 15,
          image: 'https://a2.muscache.com/im/pictures/7051cc36-0ee9-4224-a1f1-9ca821764193.jpg?aki_policy=medium'
        }
      }, {
        type: 'Entire home/apt',
        id: 2,
        attributes: {
          title: 'Urban Living',
          owner: 'Mike Teavee',
          city: 'Seattle',
          type: 'Condo',
          bedrooms: 1,
          image: 'https://a2.muscache.com/im/pictures/89646919/d751f179_original.jpg?aki_policy=medium'
        }
      }, {
        type: 'Entire home/apt',
        id: 3,
        attributes: {
          title: 'Downtown Charm',
          owner: 'Violet Beauregarde',
          city: 'Portland',
          type: 'Apartment',
          bedrooms: 3,
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
        }
      }, {
        type: 'Private room',
        id: 3,
        attributes: {
          title: 'House with a view',
          owner: 'Sofia De la Cruz',
          city: 'Michigan',
          type: 'Apartment',
          bedrooms: 1,
          image: 'https://a2.muscache.com/im/pictures/90842296/10d4b096_original.jpg?aki_policy=medium'
        }
      }
  ];

  rentalsRouter.get('/', function(req, res) {
    res.send({rentals});
  });

  rentalsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  rentalsRouter.get('/:city', function(req, res) {
    let val = req.params.city.split("=");
    let filteredRentals = rentals.filter(function(i) {
      return i.attributes.city.toLowerCase().indexOf(val[1].toLowerCase()) !== -1;
    });

    if(filteredRentals.length>=1) {
      res.send({
        'data': filteredRentals
      });
    } else {
      res.send({
        'data': 'no records found'
      });
    }
  });

  rentalsRouter.put('/:id', function(req, res) {
    res.send({
      'rentals': {
        id: req.params.id
      }
    });
  });

  rentalsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/rentals', require('body-parser').json());
  app.use('/api/rentals', rentalsRouter);
};
