const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const Product = require('../models/Product')
const User = require('../models/User')
const Cart = require('../models/Cart')

chai.use(chaiHttp)

var token = ''
var fakeToken = 'akdokmdk'
var wrongJwtSecret = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmFiNjJmNDAxYzIzMWM5MDZlYTcwYyJ9.P6gOsFof3relhVzdFy_hxqSi_9s0rguAFRAB56uK968`
var notMongooseId = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmFiNjJmNDAxYzIzMWM5MDZlYWMifQ.mAac0-2oCwqiW8pBHHXpYSEm9Ug52gNk8x5YP-JlFPM`
var productId = ''

describe('CART', () => {
    
})