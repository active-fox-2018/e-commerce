const Product = require('../models/product')

module.exports = {
    createProduct: function (req, res) {
        console.log(JSON.parse(req.body.data),'aaaaaa')
        let obj = JSON.parse(req.body.data)
        // console.log(typeof req.body.name)
        Product
            .create({
                name: obj.name,
                description: obj.description,
                amount: obj.amount,
                image: req.file.cloudStoragePublicUrl,
                price : obj.price
            })
            .then(createResult => {
                console.log('masuk database')
                console.log(createResult)
                res.status(201).json(createResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getAllProduct: function (req, res) {
        Product
            .find({})
            .then(findResult => {
                res.status(200).json(findResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    deleteProduct: function (req,res) {
        Product
            .findOneAndDelete({_id : req.params.id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    editProduct : function(req,res) {
        Product
            .findOneAndUpdate({_id : req.params.id}, {$set : req.body}, {new:true})
            .then(updateResult => {
                res.status(200).json(updateResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}