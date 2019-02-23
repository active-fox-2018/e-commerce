const axios = require('axios')
const key = process.env.KINGONGKIR

class KingCon {
    static getProvince (req, res) {
        axios({
            method: 'get',
            url: `https://api.rajaongkir.com/starter/province`,
            headers: {
                key
            }
        })
            .then(({ data }) => {
                for (var i = 0; i < data.rajaongkir.results.length; i++) {
                    data.rajaongkir.results[i].value = data.rajaongkir.results[i].province_id
                    delete data.rajaongkir.results[i].province_id
                    data.rajaongkir.results[i].text = data.rajaongkir.results[i].province
                    delete data.rajaongkir.results[i].province
                }
                res.status(200).json(data.rajaongkir.results)
            })
            .catch(err => {
                console.log(err.response)
                res.status(400).json({
                    msg: err.response
                })
            })
    }

    static getCity (req, res) {
        axios({
            method: 'get',
            url: `https://api.rajaongkir.com/starter/city?province=${req.query.province}`,
            headers: {
                key
            }
        })
            .then(({ data }) => {
                let temp = []
                for (var i = 0; i < data.rajaongkir.results.length; i++) {
                    temp.push({
                        text: data.rajaongkir.results[i].city_name, 
                        value: data.rajaongkir.results[i].city_id
                    })
                }
                res.status(200).json(temp)
            })
            .catch(err => {
                console.log(err.response)
                res.status(400).json({
                    msg: err.response
                })
            })
    }

    static getCost (req, res) {
        axios({
            method: 'post',
            url: `https://api.rajaongkir.com/starter/cost`,
            headers: {
                key
            },
            data: {
                origin: 152, //jakarta pusat
                destination: req.body.destination,
                weight: 1000,
                courier: req.body.courier
            }
        })
            .then(({ data }) => {
                res.status(200).json(data.rajaongkir.results)
            })
            .catch(err => {
                console.log(err.response)
                res.status(400).json({
                    msg: err.response
                })
            })
    }
}

module.exports = KingCon