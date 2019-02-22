const models = require('../models')

class ProductController {
    static async find(req, res) {
        try {
            let productData = await models.Product.find({}).lean()
            res.status(200).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let productData = await models.Product.findOne({ _id: req.params.productId }).lean()
            res.status(200).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let productData = await models.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
            })
            res.status(201).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let productData = await models.Product.findOneAndUpdate({ _id: req.params.productId }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                }
            })
            res.status(201).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let productData = await models.Product.findOneAndDelete({ _id: req.params.productId })
            res.status(200).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async fileUpload(req, res) {
        try {
            let productData = await models.Product.findById(req.params.productId)
            if (!productData) {
                throw { message: 'product not found' }
            }
            if (req.file) {
                productData.fileUrl = req.file.cloudStoragePublicUrl
                productData.save()
            }
            res.status(200).send(productData)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = ProductController
