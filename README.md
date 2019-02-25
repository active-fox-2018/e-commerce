# E - Commerce

**Users Endpoint**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|------|---------|---------| ---------| --------- | -- | -- |
| POST | /register |  | name(string), email(string), password(string), role(string), picture(file) | Create user | return new User Object | return error
| POST | /login |  | email (string), password (string) | Login user | return Jwt Token | return error
| POST | /verifyToken |  | token (jwt) | verify jwt token | return User | return error

**Products Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| GET | /products | | | Get All Products | return All Products | return error
| GET | /products/:productId | | | Get One Product | return One Product | return error
| POST | /products | token(role must an 'admin') | name(string), price(number), stock(number), image(file), createdAt(date) | Create new Product | return New Product Object | return error
| PUT | /products/:productId | token(role must an 'admin') | name(string), price(number), stock(number), image(file), createdAt(date) | Update A Product | return Updated Product Object | return error
| DELETE | /products/:productId | token(role must an 'admin') | | Delete Product | return Deleted Product Object | return error

**Carts Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| GET | /carts | token |  | Get LoggedIn User Cart | return User Cart | return error
| PUT | /carts/addProducts | token | productId(string), qty(string) | Add Products to User Cart | return ProductId and qty | return error
| PUT | /carts/reduceProducts | token | productId(string) | Reduce Product in User Cart | return ProductId and qty | return error
| PUT | /carts/checkout | token | total(number) | Clear cart and make new Transaction | return new Transaction object | return error

**Transactions Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| GET | /transactions | token(must be an 'admin') | | Get All Users transactions | return All transactions | return error
| GET | /transactions/myTransactions | token | | Get All LoggedIn User transactions | return All User transactions | return error
| POST | /transactions | token | userId(ObjectId), products(array of ObjectId), total(number) | Create new transaction | return New transaction Object | return error
| PUT | /transactions/:transactionId | token | status(string), createdAt(date) | Update a transaction | return Updated transaction Object | return error

### Usage


Make new file `.env` With Template:

```
JWT_SECRET=
CLIENT_ID=
CLOUD_BUCKET=
GCLOUD_PROJECT=
KEYFILE_PATH=
```

Run these commands:

 ```
 $ service mongod start
 $ npm install
 $ npm run dev
 ```