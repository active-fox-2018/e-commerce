const Cart = require('../models/cart')

module.exports = {
    create(req,res) {     
        Cart
            .create({})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json({error : err})
            })
    },
    update(req,res) {
        Cart    
            .findOneAndUpdate({
                _id : req.params.id
            }, {
                $push : { bucket : req.body}
            }, {
                new : true
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    delete(req,res) {
        Cart
            .findOneAndDelete({
                _id : req.params.id
            })
            .then(()=> {
                res.status(200).json({message : 'delete success'})
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}