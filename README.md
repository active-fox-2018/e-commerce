# e-commerce

#products-routes
|    Route     |  HTTP  | Header(s)| Body   | Description | Error Response(s) | Succeed Response(s) |
---------------|--------|----------|--------| ----------- | ----------- |---------------------|
/products    | GET   | none | none |Get all products | (500) "Internal Server Error" | (200) - Get all products
/products/search/:productName   | GET   | none | none| Find product with product's name | (500) "Internal Server Error", (404) Product Not Found| (200) - Product found
/products     | POST   | Admin token | name:String(**Required**), price:Number(**Required**), stock:Number(**Required**), image:String, description: String  | Create a product | Empty name: (400) "Please fill up product's name", Empty price: (400) "Please fill up product's price", Empty stock: (400) "Please fill up product's stock", Without Token: (401) "Sorry, only admin is authorized to make changes" | (201) "You have successfullt added a product"
/products/:productId | PATCH | Admin token | Anything you want to change from the product | Edit product | Without Token: (401) "Sorry, only admin is authorized to make changes" | (200) "You have successfully updated a product |
/products/:productId | DELETE    | Admin token | none |Delete a product | Without Token: (401) "Sorry, only admin is authorized to make changes" | (200) "You have successfully updated a product |

____________________________________________________________________________________

#users-routes
|    Route     |  HTTP  | Header(s)| Body   | Description | Error Response(s) | Succeed Response(s) |
---------------|--------|----------|--------| ----------- | ----------- |---------------------|
/users/register     | POST   | none | fullname:String(**Required**), email:String(**Required**), password:String(**Required**)| Register new user | Empty fullname: (400) "Please fill up your Fullname", Empty email: (400) "Please fill up your Email", Empty password: (400) "Please fill up your Password", Invalid Email: (400) "Please fill a valid Email address", Short password: (400) "Password should be at least 6 characters", Duplicate email: (400) "Sorry, Email has been used" | (201) "You have successfully registered a new account |
/users/login | POST | none | email:String(**Required**), password:String(**Required**) |User Login | Wrong password: (400) "Sorry, wrong password", Unregistered email: (400) "Sorry, your Email is not registered", Empty email: (400) "Sorry, please fill up your Email", Empty password: (400) "Sorry, please fill up your Password" | (200) "You have successfully logged in to your account" - Got User Token |
/users | PATCH | User token | Products | Add product(s) to cart |(401) "Sorry, please login first" | (200) You have successfully added a product to your cart |
____________________________________________________________________________________

#transactions-routes
|    Route     |  HTTP  | Header(s)| Body   | Description | Error Response(s) | Succeed Response(s) |
---------------|--------|----------|--------| ----------- | ----------- |---------------------|
/transactions | POST   | User token | products:Array of ObjectId | New transaction | (401) "Sorry, please login first" | (200) "Your transaction is being processed"
/transactions /buyer   | GET   | User token | none | Get all transaction (Buyer's perspective) | (401) "Sorry, please login first | (200) - All transactions history made by the user |
/transactions/buyer/:transactionId  | PATCH   | User token | Updated transction status | Update transaction's status | (400) "Sorry, please login first" | (200) "Your transaction's status has been updated | 
/transactions  | GET   | Admin token | none | Get all transactions (Seller's perspective) | (401) "Sorry, you are not authorized to access this page | (200) - All transactions history |
____________________________________________________________________________________

#admin-routes
|    Route     |  HTTP  | Header(s)| Body   | Description | Error Response(s) | Succeed Response(s) |
---------------|--------|----------|--------| ----------- | ----------- |---------------------|
| /admin/login | POST | username: String(**Required**), password: String(**Required**) | none | Unregistered username: (400) "Sorry, Username is not registered", Wrong password: (400) Sorry, wrong password" | (200) "You have successfully logged in as an Admin" |