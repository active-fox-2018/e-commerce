# E-Commerce Server Documentation

List of user routes:

|   Route       | HTTP  |Header(s) |Body    | Description
|---------------|:------|:---------|:-------|:-----------
|/users/register     |POST    | none     | email:String (**Required**), password:String (**Required**), full_name:String(**Required**)   | User registration
|/users/login |POST    | none     | email:String (**Required**), password:String (**Required**)   | User login
|/users     |GET   | none     | none | Get all users
|/users/:id |GET    | none     | none | Get certain user by Id
|/users/users/:id |PUT    | none     | email:String (**Required**), password:String (**Required**), full_name:String (**Required**) | Update a user with new data by Id
|/users/users/:id |DELETE | access_token     | none   | Delete a user by Id
|/products    |GET   | none     | none   | Get all product list
|/products    |POST   | access_token, role:Admin     | name:String, price:Number, stock:Number, imageUrl:String | Add/Register a product 
|/products/:id    |GET   | none     | none | Get a single product by id
|/products/:id    |PUT   | access_token, role:Admin     | name:String, price:Number, stock:Number, imageUrl:String | Edit a single product
|/cart    |GET   | access_token | none | Get user's cart
|/cart/:productId    |PUT   | access_token | none | Increase user's cart quantity and add the product
|/cart/:productId    |PUT   | access_token | none | Decrease user's cart quantity and remove the product
|/cart    |DELETE   | access_token | none | Delete all products in cart

# Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install <br/>
$ npm start <br/>
$ npm run dev

Access the API via http://localhost:8080