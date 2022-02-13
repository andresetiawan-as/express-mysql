var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator')

// Import Table
const { Product } = require('../models')

const v = new Validator();

// Create Product
router.post('/', async(req, res, next) => {
    const schema = {
        name: 'string|optional',
        brand: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema)

    if(validate.length){ //Jika ada error validation masuk kesini
        return res
            .status(400)
            .json(validate);
    }

    // Simpen ke db
    const product = await Product.create(req.body);
    
    res.json({
        status: 200,
        message: "Successful.",
        product: product
    })
})

// Get All Product
router.get('/', async (req, res, next) => {
    const products = await Product.findAll()

    return res.json({
        status: 200,
        message: "Success.",
        product: products
    })
})

// Get Product by ID
router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const products = await Product.findByPk(id)

    return res.json({
        status: 200,
        message: "Success.",
        product: products || {}
    })
})

// Update Product
router.put('/:id', async(req, res, next) => {
    const id = req.params.id;

    let product = await Product.findByPk(id);

    if(!product){ //Jika id ga ketemu di db
        res.json({
            status: 400,
            message: "Product Not Found."
        })
    }

    const schema = {
        name: 'string|optional',
        brand: 'string|optional',
        description: 'string|optional'
    }
    const validate = v.validate(req.body, schema)
    if (validate.length) { //Jika ada error validation masuk kesini
        return res
            .status(400)
            .json(validate);
    }

    product = await product.update(req.body) //Update data ke DB

    res.json({
        status: 200,
        message: "Successful.",
        product: product
    })
})

// Delete Product
router.delete('/:id', async(req, res, next) => {
    const id = req.params.id

    const product = await Product.findByPk(id);

    if(!product){
        res.json({
            status: 400,
            message: "Product Not Found."
        })
    }

    await product.destroy(); //Delete product by ID di DB

    res.json({
        status: 200,
        message: "Success"
    })
})

module.exports = router;
