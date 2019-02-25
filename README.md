# e-commerce

A simple e-commerce web-app made with vue

# Server API Routes


### Authentication Routes

| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /register     | POST      |none  | email:string, password:string | Create cart and generate token   | 
| /login| POST | none | email:string, pasword: string | authenticate registered cart and generate token |

### Cart CRUD Routes

| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /carts    | GET   |token  | none |Get all cart info (admin only)   | 
| /carts/:id| GET | token | none | Get a cart's info (admin and authenticated cart only) |
| /carts    | POST   |token  | email:string, password:string |Create  a cart (admin only)   | 
| /carts/:id    | PUT |token  | email:string, password:string, role:string |Update a cart's attributes (admin only)   |

### Product CRUD Routes
| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /products    | GET   |token  | none |Get all cart info (admin only)   | 
| /products/:id| GET | token | none | Get a cart's info (admin and authenticated cart only) |
| /products    | POST   |token  | email:string, password:string |Create  a cart (admin only)   | 
| /products/:id    | PUT |token  | email:string, password:string, role:string |Update a cart's attributes (admin only)   |
| /products/:id    | DELETE |token  | none |delete a cart (admin and authenticated cart only)   |