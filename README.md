# e-commerce

#api documentation

<!-- CRUD endpoints untuk Item (minimal ada name, image, price, stock) -->

| Title        | URL       | Method | Request Body | Request Header| Sucsess Response | Error Response | notes|
| :---         |:---       | :---   |   :---:      |  :---         |       ---        |       :---     |   ---|
|register user |/register  | POST   | email, password, name | none |  email, password, name, | status(500).(internal server error) | |
|login user    |/login     | POST   | email, password| none        | token            | status(500).(internal server error) | |
|Find Item   | /items    | GET    | name, image, price, stock |  none | | |
|update Item   | /items/:id   | PUT    | name, image, price, stock |  none | | |
|
|create Item   | /items    | POST    | name, image, price, stock |  none | | |
|
|Delete Item   | /items/:id    | Delet    | name, image, price, stock |  none | | |
|
