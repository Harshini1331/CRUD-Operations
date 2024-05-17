const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/ProductModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/product',async(req,res)=>{
    try {
        const product = await Product.find({})
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/product/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/product',async(req,res)=>{
    try {
        const products = await Product.create(req.body)
        res.status(200).json(products)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
})

app.put('/product/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product)
        {
            return res.status(404).json({message:'cannot find product with ID ${id}'})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

app.delete('/product/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product)
        {
            return res.status(404).json({message:'cannot find product with ID ${id}'})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

mongoose.connect('mongodb+srv://harshini:harshini123@cluster0.jfw49id.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("connected to MongoDB")
    app.listen(3000, () =>{
        console.log('Node API app is running on port 3000')
    })
    
}).catch((error)=>{
    console.log(error)
})
