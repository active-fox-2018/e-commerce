# E-COMMERCE
This app is documented for Hacktiv8 Assignment
Built with Express and Mongoose

List: of basic routes:

|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/register_|**POST**|none|email, name, password|register manual|
|_/login_|**POST**|none|email, password|login user|
|_/products_|**GET**|none|none|Get Products|
|_/products/:id_|**GET**|none|none|Get Product By Id|
|_/products/search_|**GET**|none|search by query|Search Product|
|_/products_|**POST**|token:admin| Formdata(title, description, stock, image, price)|create products and upload feature image|
|_/products/:id_|**DELETE**|token:admin|none|Delete product admin only|
|_/products/:id_|**PUT**|none|search by query|Update Product admin only|
|_/carts_|**GET**|token:user|none|get User Cart|
|_/carts/checkout_|**PUT**|token:user|none|Checkout User Car|
|_/carts/products/:id_|**PUT**|token:user|none|Add To Cart|
|_/carts/products_|**DELETE**|token:user|none|Clear Cart|
|_/carts/products/:id_|**DELETE**|token:user|none|Remove From Cart|


<!-- |_/articles/:id_|**POST**|token:user]Formdata(title OR/AND content OR/AND image)|update articles|
|_/articles/:id_|**PUT**|token:user|status|modify article status (authorized user only)|
|_/articles/:id_|**DELETE**|token : user|none|delete articles (authorized user only)|
|_/user/articles_|**GET**|token : user|none|get all user articles| -->

Additional Information:

### - **Register User**

Register Feature From Manual Register

+ **URL**
  
  /register

+ **Method**

  POST

+ **Data Params**
  
  email[string], name[string], password[string]

+ **Success Response**

      { token : token, data: newUser }


+ **Error Response**

      { message : error validation }

### - **Login User**

Login Feature From Manual Register

+ **URL**
  
  /login

+ **Method**

  POST

+ **Data Params**
  
  email[string], password[string]

+ **Success Response**

      { token : token }


+ **Error Response**

      { message : error validation }

### - **Create Products**

Create New Products 

+ **URL**
  
  /products

+ **Method**

  POST

+ **Data Params**

  headers : { token }
  title[string], description[string], image[string], stock[number] seller[ObjectId]

  
+ **Success Response**

      { newData }


+ **Error Response**

      { message : error validation }

      
### - **Find All Product**

+ **URL**
  
  /products

+ **Method**

  GET

+ **Data Params**

  none

  
+ **Success Response**

      { data: products }


+ **Error Response**

      { message: internal server error }

### - **Search Product**

+ **URL**
  
  /products/search

+ **Method**

  GET

+ **Data Params**

  req.query.search

  
+ **Success Response**

      { data: products, message: 'n products has been found' }


+ **Error Response**

      { message: internal server error }

### - **Find Product By ID**

Find Product details

+ **URL**
  
  /products/:id

+ **Method**

  GET

+ **Data Params**

  req.params.id

  
+ **Success Response**

      { data: product, message: 'product found }


+ **Error Response**

      { message: 'product not found' } / { message: internal server error}

### - **Delete Product**

Delete Product By ID (Admin Only)

+ **URL**
  
  /products/:id

+ **Method**

  DELETE

+ **Data Params**

  req.params.id

  
+ **Success Response**




+ **Error Response**



### - **Update Product**

+ **URL**
  
  /products/:id

+ **Method**

  PUT

+ **Data Params**

  req.params.id

  
+ **Success Response**

      { updated }


+ **Error Response**

      { error validation }