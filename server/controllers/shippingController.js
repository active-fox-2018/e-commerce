const axios = require('axios')

module.exports = {
    getProvince: (req, res) => {
        axios({
            url: 'https://api.rajaongkir.com/starter/province',
            method: 'GET',
            headers: {
                key: process.env.ONGKIR_KEY
            }
        })
            .then(({ data }) => {
                res.status(200).json(data.rajaongkir.results)
            }).catch((err) => {
                res.status(500).json(err)
            });
    },
    getCity: (req, res) => {
        axios({
            method: 'GET',
            url: `https://api.rajaongkir.com/starter/city?province=${req.params.provinceId}`,
            headers: {
                key: process.env.ONGKIR_KEY
            }
        })
            .then(({ data }) => {
                res.status(200).json(data.rajaongkir.results)
            }).catch((err) => {
                res.status(500).json(err)
            });
    },
    getCost: (req, res) => {
        let courier = req.body.courier
        let data_courier = courier.toLowerCase()
        axios({
            method: 'POST',
            url: `https://api.rajaongkir.com/starter/cost`,
            headers: {
                key: process.env.ONGKIR_KEY
            },
            data: {
                origin: '153',
                destination: req.body.destination,
                weight: 1000,
                courier: data_courier
            }
        })
            .then(({ data }) => {
                res.status(200).json(data.rajaongkir.results[0].costs)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }
}