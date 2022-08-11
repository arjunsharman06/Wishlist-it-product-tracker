const router = require('express').Router();
const { Product, Category} = require('../../models');

router.get('/', (req, res) => {
    // findAll is the equivalent of the SQL query: SELECT * FROM category;
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            }
        ]
    })
        .then(dbProductData  => res.json(dbProductData ))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  
  router.get('/:id', (req, res) => {
    // find one category by its `id` value
    Product.findOne({
      //using the 'where' option to indicate where we want to find a category where its id value equals whatever req.params.id is
      // This is similiar to the SQL query: SELECT * FROM category WHERE id = ?
        where: {
            id: req.params.id
        },
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            }
        ]
    })
        .then(dbProductData  => {
          /* Since we are searching by id, it is possible a search could be done for a nonexistent id value. 
            if the .then() method returns nothing from the query, a 404 status is sent to the client to indicate that it worked
            but no data was found for that requested id.  */ 
            if (!dbProductData ) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  
  // create a new category
  router.post('/', (req, res) => {
    // To insert data SQL's .create() method is used. 
    // A key/value pair is used where the key is what defined the Category model and values are what we get from req.body.
    Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        //category_id: req.body.category_id
    })
        .then(dbProductData  => res.json(dbProductData ))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  
  // update a category by its `id` value
  router.put('/:id', (req, res) => {
   /* The .update() method combines the parameters for creating data and looking up data. 
   We pass in req.body to provide the new data we want to use in the update and req.params.id to indicate 
   where exactly we want that new data to be used. */
   Product.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbProductData  => {
            if (!dbProductData [0]) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  
  // delete a category by its `id` value
  router.delete('/:id', (req, res) => {
    /* To delete data, the destroy method is used and an identifier (where) to indicate where we would like to delete the data 
      from the Category database table. */
      Product.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbProductData  => {
            if (!dbProductData ) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(dbProductData );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  

module.exports = router;