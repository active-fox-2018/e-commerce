# e-commerce

website: relicstore.janursmad.com

Usage :

Make sure you have Node.js and npm installed in your computer, and then run these commands:
```
$ npm install
$ npm start
```
```
Access the API via http://localhost:3000/
```

APIs LISTS

List of User API

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /register | POST | none | name:String ***(REQUIRED)*** , email:String ***(REQUIRED)*** , password:String ***(REQUIRED)*** | register a user |
| /login| GET | POST | none | log in into application |


List of Product API

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /products | GET | none | none  | get all products data |
| /products/:id | GET | none | none | get a single product info |
| /products | POST | token | name:String ***(REQUIRED)***, description:String, price:Number ***(REQUIRED)***, stock:Number ***(REQUIRED)***, img:String | post a new product |
| /products/:id | PUT | token | none | udpdate current data of a product |
| /products/:id | DELETE | token | none | delete a single product |

List of Cart API

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /carts | POST | token | qty:Number, userId:String, productId:String  | insert product to cart |
| /carts | GET | token | none | get authenticated users cart |
| /carts | PUT | token | qty:Number, userId:String, productId:String | update qty of a product in cart |
| /carts | PATCH | token | qty:Number | checkout items in cart |
| /carts | DELETE | token | none | remove a single item in cart |

List of Transaction API

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /transactions | GET | token | none  | get all authenticated users transactions |
| /transactions/admin | GET | token | none | get all transactions for admin |
| /transactions/:id | PATCH | token | none | update a single transaction status |

List of Shipping API

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /shippings/province | GET | none | none  | get province data from rajaongkir Api |
| /shippings/city/:provinceId | GET | none | none | get city data from rajaongkir Api |
| /shippings/cost | POST | token | none | calculate shipping cost from rajaongkir Api |
