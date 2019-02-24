# e-commerce
<h1> Comecom </h1>
<br>

**LIST OF USER ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/users|GET|none|none|Get all users data|
|/users|POST|none|name: String **(REQUIRED)**, email: String **(REQUIRED)**, password: String **(REQUIRED)**, address: Date **(REQUIRED)**, phone: String, image: file|Create new user (manual) & generate jwt |
|/users/gooSign|POST|none|id_token: String **(REQUIRED)**|Create new user (google) and generate jwt|
|/users/login|POST|none|email:String **(REQUIRED)**, password:String **(REQUIRED)**|generate jwt |
|/users|PUT|token|name: String , email: String , password: String , address: Date, phone: String, image: file|Update user data|
|/users|DELETE|token|none|Delete user|
|/users/me|GET|token|none|Get logged in user info |

<br>
<br>

**LIST OF Products ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/products|GET|none|none| get all products|
|/products/:id|GET|none|none| get one products|
|/products|POST|token|name: String  **(REQUIRED)** , description: String  **(REQUIRED)** , price; Number  **(REQUIRED)** , image: file, qty: Number| Create new Product|
|/products/:id|PUT|token|name: String  **(REQUIRED)** , description: String  **(REQUIRED)** , price; Number  **(REQUIRED)** , image: file, qty: Number| Update a product|
|/products/:id|DELETE|token|none|Delete a products|

<br>
<br>

**LIST OF CARTS ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/carts|GET|token|none| get my carts|
|/carts/:id|GET|token|none| get one carts|
|/carts/history|GET|token|none| get checkout carts|
|/carts/:id(productId)|POST|token|qty: Number **(REQUIRED)** | Create new cart|
|/carts/:id/checkout|PUT|token|none| Checkout one cart|
|/carts|PUT|token|none| Checkout current user cart|
|/carts/:id/recieved|PUT|token|none| recieved one cart|
|/carts/:id|PUT|token|none| Update one cart|
|/carts|DELETE|token|none|Delete all carts|
|/carts/:id|DELETE|token|none|Delete a carts|

<br>
**Usage:**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```
And don't forget to fill the .env file 

Link Server:

Link deploy: 