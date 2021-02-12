const Product = require('../models/product')
const {createProductSchema} = require('../models/product.joi')
const slugify = require('slugify')

// Home page
// const homePage= (req,res)=>{
//     res.status(200).json('Jude Product Cards kindly use /product to access products')
// }

// Create new product
const createProduct = async (req,res)=> {
    try {
        const data = req.body
        await createProductSchema.validateAsync(data,{abortEarly: false})
        data.slug =slugify(data.name, { lower: true} )
        const products = await Product.create(data)

        res.status(200).json({status:'success', data : products })
    }
    catch (error) {
        if(error._original) {
            res.status(400).json({status : 'error', 
            message : error.details.map((item)=> item.message),})
            return
        }
         if (error.code == '11000'){
             res.status(400)
             .json({status:'error', message : 'product already exists'})
             return
         } 
         res.status(400).json({ status: 'error', message: error})  
        
    }
}

// Get all products
const getAllProduct = async (req,res)=> {
    try{
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ status: 'error', message: error})
    }
    
}

// Get a specific product card
const getProduct = async (req,res)=> {

    try{
        const {slug} = req.params;
        const products = await Product.findOne({slug})
        if(!products) {
            res.status(404).json({ status: 'error', message: 'product not found'})   
        return
        }
        res.status(200).json({status:'success', data : products})
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', message: error})
    }
}
// Update product lists
const updateProduct = async (req,res)=> {
    try{
        const {slug} = req.params;
        const data = req.body;
        const products = await Product.findOneAndUpdate({slug}, data, {new : true})
        if(!products) {
            res.status(404).json({ status: 'error', message: 'product not found'})   
        return
        }
        res.status(200).json({status: 'success', message: products})
    } catch (error) {
        res.status(400).json({ status: 'error', message: error})
    }
}


// Delete a specific product card
const deleteProduct = async (req,res)=> {
    try{
        const {slug} = req.params;
        const products = await Product.findOneAndDelete({slug})
        if(!products) {
            res.status(404).json({ status: 'error', message: 'product not found'})   
        return
        }
        res.status(200).json({status:'success', data : products})
    } catch (error) {
        res.status(400).json({ status: 'error', message: error})
    }
}

module.exports = {
    // homePage,
    createProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct 
                  }