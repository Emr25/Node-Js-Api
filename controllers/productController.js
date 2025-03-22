const mongoose = require("mongoose");
const Product = require("../models/ProductModel");



//GET ALL
module.exports.getAll=async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

//GET SİNGLE
module.exports.getSingle=async(req,res)=>{
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message : "Product is noy valid"})

        const product = await Product
        if(!product){
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json(product);
    } catch (error) {
        
        res.status(404).json({message : "Product not found"})
    }
}

//POST DATA

module.exports.postProduct = async(req,res)=>{
    try {
        const product = req.body

        const createdProduct = await Product.create({
            ...product,
            creatorId : req.creatorId
        })
        res.status(201).json(createdProduct)

    } catch (error) {
        console.log(error.message)
        res.json({message: "Create Product failed"})
    }
}

//UPDATE DATA
module.exports.updateProduct = async (req,res)=>{
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({message : "Product is not valid"})
        }
    const oldProduct =  await Product.findById(id)

    if (!oldProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    if(req.creatorId !== oldProduct.creatorId) {
        return res.sendStatus (403)
    }
   
    const {title , content , creator , image }= req.body
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {title,content , creator , image , _id : id},
        {new : true}
    )
     
    res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error.message)
        res.json({message : "Update failed"})
    }
}

//DELETE DATA

module.exports.deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({message : "Product id is not valid"})

        const oldProduct = await Product.findById(id)
        if(req.creatorId !== oldProduct.creatorId) {
            return res.sendStatus(403)
        }
        await Product.findByIdAndDelete(id)
        res.status(200)
    } catch (error) {
        console.log(error.message)
        res.json({message : "Product delete failed"})
    }
}


