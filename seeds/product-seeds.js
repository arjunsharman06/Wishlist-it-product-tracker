const { Product } = require('../models');

const productData = [
  {
    "product_name": "War and Peace",
    "price": "29.99",
    "desired_price": "21.99",
    "product_note": "I need this book for my English course.",
    "category_id": "1",
    "tagIds": [1]
  },
  {
    "product_name": "Bulk case of computer paper",
    "price": "59.99",
    "quantity": "2",
    "category_id": "11",
    "tagIds": [1]
  },
  {
    "product_name": "BenQ monitor",
    "price": "299.99",
    "desired_price": "199",
    "product_note": "For my new gaming rig.",
    "quantity": "2",
    "category_id": "6",
    "tagIds": [2]
  },
  {
    "product_name": "weights",
    "price": "599.99",
    "desired_price": "449.99",
    "product_note": "Buff boy in the new year",
    "category_id": "10",
    "tagIds": [3]
  },
  {
    "product_name": "Air fryer",
    "price": "99.99",
    "desired_price": "89.99",
    "category_id": "8",
    "tagIds": [1]
  }
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
