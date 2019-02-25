const Product = require('../models/product')


module.exports = {
    create(req, res) {
        console.log(req.body.data,"========//========");
        
        let data = ''
        if(req.file) {
            data = JSON.parse(req.body.data)
            data.image = req.file.cloudStoragePublicUrl
        } else {
            data = req.body.data
        }

        Product
            .create({
                name: data.name,
                description: data.description,
                stock: data.stock,
                price: data.price,
                image: data.image
            })
            .then(data => {

                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err);
                
                let path = Object.keys(err.errors)
                res.status(400).json({ error: err.errors[path[0]].message.slice(0, err.errors[path[0]].message.length - 1) })
            })
    },

    findAll(req, res) {
        Product
            .find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    update(req, res) {
        console.log(req.body.data);
        
        let data = ''
        if(req.file) {
            data = JSON.parse(req.body.data)
            data.image = req.file.cloudStoragePublicUrl
        } else {
            data = JSON.parse(req.body.data)
        }

        // let data = JSON.parse(req.body.data)
        // console.log(data,"====masuk controller=========")
        // if(req.file) {
        //     data.image = req.file.cloudStoragePublicUrl
        // } 
        Product
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $set: {
                        name : data.name,
                        description : data.description,
                        stock : data.stock,
                        price : data.price,
                        image : data.image
                    }
                }, {
                    new: true
                })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err,"===========didlam updaet");
                
                res.status(500).json(err)
            })
    },

    delete(req, res) {
        Product
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).json({ message: 'deleted' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}