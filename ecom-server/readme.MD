## E-commerce

**User Routes :**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/users/register|POST|none|body.name:String, body.email:String, body.Password:String | create new user |
|/users/login|POST|none|none|login and generate access_token|
|/users/|GET|access_token|none|get all user data(admin only)|

<br>

**Shopping product Routes :**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/products/|POST|access_token|body.name:String, body.description:String, body.amount:Number, body.image:String| create new item (author only) |
|/products/:id|GET|none|params.id| read/see item with id matched with params|
|/products/|GET|none|query.name|get all products, or item with name in query|
|/products/:id|PUT|access_token|params.id, body.name:String, body.description:String, body.amount:Number| update all item data with specific id(author only)|
|/products/:id|PATCH|access_token|params.id, body | update specific item data with specific id(author only) |
|/products/:id|DELETE|access_token|params.id| delete item with specific id(author and admin)|

<br>

**Cart Routes :**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/carts/create|POST|access_token|userId:objectId, itemId:objectId, status:String(default: `not confirmed`)|create new cart(author only)|
|/carts/|GET|access_token|query.itemId.name | get all products on cart database or specific based on query itemId name|



