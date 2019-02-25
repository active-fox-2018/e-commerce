# e-commerce

#api documentation


| Title        | URL       | Method | Request Body | Request Header| Sucsess Response | Error Response | notes|
| :---         |:---       | :---   |   :---:      |  :---         |       ---        |       :---     |   ---|
|register user |/register  | POST   | email, password, name | none |  email, password, name, | status(500).(internal server error) | |
|register admin |/register/admin | POST   | email, password, name | none |  email, password, name, | status(500).(internal server error) | |
|login user    |/login     | POST   | email, password| none        | token            | status(500).(internal server error) | |
|edit user     |/users     |PUT     | email, name  | token         | email, password, name status(200) |  status(500).(internal server error) | |
|Find Item   | /items    | GET    | none|  none | status(200) name, stock, price, image(url) |  status(500).(internal server error) |
|update Item   | /items/:id   | PUT    | name, image, price, stock |  token |  name, stock, price, image(url)  | status(500).(internal server error) |
|create Item   | /items    | POST    | name, image, price, stock |  token |  name, stock, price, image(url)  status(201)| status(500).(internal server error) |
|Delete Item   | /items/:id    | Delete    |none |  token | name, stock, price, image(url)  status(200) | status(500).(internal server error) |
|get All Transaction | /transactions | get | none | token | _id, UserId, CartId, TotalPrice, created_at, updated_at status(200)|   status(500).(internal server error) |
|get All Carts By User | /carts | GET | none | token | _id, item, quantity status(200) |  status(500).(internal server error) |
|Add Item into Cart | /addToCart | POST | item (id), quantity | token | _id, item, quantity status(201) |  status(500).(internal server error) |
|remove cart | /removeCart/:id | delete | none | token | _id, item, quantity status(200)  |  status(500).(internal server error) |
|checkout all cart | /checkout | POST | none | token | transaction._id, UserId, CartId, TotalPrice, created_at, updated_at status(201) |   status(500).(internal server error) |
|update Status in transaction by User | /transaction/:id/:status | PUT | transaction._id, UserId, CartId, TotalPrice, created_at, updated_at status(201) |   status(500).(internal server error) |

```bash
npm install
fill the env template
node app.js

```
