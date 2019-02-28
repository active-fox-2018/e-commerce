const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const LocationSchema = new Schema({
    city_id: Number,
    province_id: Number,
    province: String,
    type: String,
    location_name: String,
    postal_code: Number
})

const Location = mongoose.model("Location", LocationSchema)

module.exports = Location