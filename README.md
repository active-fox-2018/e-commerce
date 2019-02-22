# e-commerce

A simple e-commerce app

The server requires nodejs, npm, and MongoDB to run properly.  
Before running the server, copy or rename the .env-template file to .env, and edit it accordingly.  

To run the server, go to the server directory and enter:
```
$ npm install
$ npm start
```

To run the client, go to the client/ecommerce directory and enter:
```
$ npm install
$ npm run serve
```

# API Documentation
## Login
```
POST /api/users/login
```
### Body:
email: registered email address  
password: password associated with the specified email  

## Register
```
POST /api/users/register
```
### Body:
name: user's full name  
email: user's email address  
password: user's password  

# The following requests require a token which can be obtained from login
### Header
```
token: <token>
```

## View a list of products
```
GET /api/products
```

## View a single product
```
GET /api/products/:productId
```

## Add a new product 
(requires an admin role)
```
POST /api/products
```
### Body
name : product name  
description : product description  
price : product price  

## Update a product 
(requires an admin role)
```
PUT /api/products/:productId
```
### Body
name : product name  
description : product description  
price : product price  

## Delete a product 
(requires an admin role)
```
DELETE /api/products/:productId
```

## List all items in the cart
```
GET /api/carts
```

## View a single product in the cart
```
GET /api/carts/:cartId
```

## Add a product to the cart
```
POST /api/carts
```
### Body
productId : id of the product which can be obtained from ```GET /api/products```  
amount : total amount of items to be purchased

## Delete a product from the cart
```
DELETE /api/carts/:cartId
```

## Checkout all items in the cart
```
POST /api/transactions/checkout
```

## View transaction history
```
GET /api/transactions
```

## View transaction history of all customers
(requires an admin role)
```
GET /api/transactions/all
```

## Give a payment confirmation
```
POST /api/trasactions/pay/:transactionId
```

## Inform the customers that the payment is confirmed and the order is being processed
(requires an admin role)
```
POST /api/trasactions/send/:transactionId
```

## Give a confirmation that the order has arrived and close the transaction
```
POST /api/trasactions/finish/:transactionId
```
