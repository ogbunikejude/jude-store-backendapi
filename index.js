var express = require('express')
var app = express()
var mongoose = require('mongoose')
const Product = require('./models/product')

app.use(express.json())

// Home page
app.get('/', (req,res)=>{
    res.send('Jude Product Cards kindly use /product to access products')
}
)
// Create new product
app.post('/product', async (req,res, next)=> {
    try {
        const data = req.body
        const products = await Product.create(data)

        res.send(products)
    }
    catch (error) {
        next(error)
    }
})

// Get product card
app.get('/product', async (req,res, next)=> {
    try{
        const products = await Product.find()
        res.send(products)
    } catch (error) {
        next(error)
    }
    
})

// Get a specific product card
app.get('/product/:id', async (req,res, next)=> {

    try{
        const {id} = req.params;
        const products = await Product.findOne({_id: id})
        res.send(products)
    } catch (error) {
        next(error)
    }
})

// Update product lists
app.patch('/product/:id', async (req,res, next)=> {
    try{
        const {id} = req.params;
        const data = req.body;
        const products = await Product.findOneAndUpdate({_id: id}, data, {new : true})
        res.send(products)
    } catch (error) {
        next(error)
    }
})
// Delete a specific product card
app.delete('/product/:id', async (req,res, next)=> {
    try{
        const {id} = req.params;
        const products = await Product.findOneAndDelete({_id: id})
        res.send(products)
    } catch (error) {
        next(error)
    }
})

mongoose.connect('mongodb+srv://ogbunikejude:08069055060Abc@jude-cluster.qbsiy.mongodb.net/mongodbtutorial?retryWrites=true&w=majority', {
    useNewUrlParser: true,
useUnifiedTopology: true}). then (()=> {
    app.listen(9000, ()=>{
    console.log('Server running at port 9000')
}) 
console.log('mongoDB connected') 
})
