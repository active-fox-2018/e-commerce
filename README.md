# e-commerce



List of routes:

|   Route               | HTTP  |   Header(s) |Body    | Description

|---------------        |:------    |:---------|:-------|:-----------

|/users                 |POST       | none     | name : string (**Required**), email:String (**Required**),password:String (**Required**), cart : objectId(**required**) | create new users

|/users/login           |POST       | none     | email:String (**Required**), password: string (**Required**) | user login

|/products              |GET        | none     | none   | get all product data

|/products              |POST       | required | name :string (**required**), description :string (**Required**), price:string (**Required**) , stock:string (**Required**), image :image file (**Required**)  | post new product - admin only

|/product/:id           |PATCH      | required | data to update   | edit product - admin only

|/product/:id           |DELETE     | required | none  | delete - product - admin only

|/carts                 |POST       | required | none  | create cart

|/carts/:id             |PATCH      | required | array of productId  | add user bought product

|/carts/:id             |DELETE     | required | goole id_token (**requred**)  |  delete cart - admin only


# Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install <br/>

$ npm start <br/>

$ npm run dev
