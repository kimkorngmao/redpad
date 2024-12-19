### **Auth API**

#### **Register a New User**
- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `201 Created`: User registered successfully.
  - `400 Bad Request`: Missing or invalid fields.
  - `500 Internal Server Error`: Server-side issue.

#### **Login a User**
- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user and issue a token.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK`: Returns a JWT token.
  - `400 Bad Request`: Invalid username or password.
  - `500 Internal Server Error`: Server-side issue.

---

### **Cart API**

#### **Get Current User's Cart**
- **URL:** `/carts/me`
- **Method:** `GET`
- **Description:** Retrieve the current user's cart.
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: Returns the cart items.
  - `500 Internal Server Error`: Server-side issue.

#### **Add Item to Cart**
- **URL:** `/carts`
- **Method:** `POST`
- **Description:** Add an item to the user's cart.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "itemId": "integer",
    "quantity": "integer"
  }
  ```
- **Response:**
  - `201 Created`: Item added to the cart.
  - `400 Bad Request`: Missing or invalid fields.
  - `404 Not Found`: Item does not exist.
  - `500 Internal Server Error`: Server-side issue.

#### **Remove Item from Cart**
- **URL:** `/carts/:id`
- **Method:** `DELETE`
- **Description:** Remove an item from the user's cart.
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: The item ID to remove.
- **Response:**
  - `200 OK`: Item removed from the cart.
  - `500 Internal Server Error`: Server-side issue.

---

### **Category API**

#### **Get All Categories**
- **URL:** `/categories`
- **Method:** `GET`
- **Description:** Retrieve all categories.
- **Response:**
  - `200 OK`: Returns the list of categories.
  - `500 Internal Server Error`: Server-side issue.

#### **Create a New Category**
- **URL:** `/categories`
- **Method:** `POST`
- **Description:** Create a new category.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string (optional)"
  }
  ```
- **Response:**
  - `201 Created`: Category created successfully.
  - `400 Bad Request`: Missing or invalid fields.
  - `500 Internal Server Error`: Server-side issue.

#### **Get a Single Category**
- **URL:** `/categories/:id`
- **Method:** `GET`
- **Description:** Retrieve a specific category.
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: The category ID to retrieve.
- **Response:**
  - `200 OK`: Returns the category details.
  - `404 Not Found`: Category not found.
  - `500 Internal Server Error`: Server-side issue.

#### **Update a Category**
- **URL:** `/categories/:id`
- **Method:** `PUT`
- **Description:** Update a specific category.
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: The category ID to update.
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string (optional)"
  }
  ```
- **Response:**
  - `200 OK`: Category updated successfully.
  - `500 Internal Server Error`: Server-side issue.

#### **Delete a Category**
- **URL:** `/categories/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific category.
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: The category ID to delete.
- **Response:**
  - `200 OK`: Category deleted successfully.
  - `500 Internal Server Error`: Server-side issue.

---

### **Product API**

#### **Get All Products**
- **URL:** `/products`
- **Method:** `GET`
- **Description:** Retrieve all products with associated images.
- **Response:**
  - `200 OK`: Returns a list of all products.
  - `500 Internal Server Error`: Server-side issue.

#### **Get Products by User**
- **URL:** `/products/user/:username`
- **Method:** `GET`
- **Description:** Retrieve all products listed by a specific user.
- **Parameters:**
  - `username`: The username of the user whose products are retrieved.
- **Response:**
  - `200 OK`: Returns user details and their products.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Server-side issue.

#### **Get Product by ID**
- **URL:** `/products/:id`
- **Method:** `GET`
- **Description:** Retrieve details of a specific product by its ID.
- **Parameters:**
  - `id`: The ID of the product to retrieve.
- **Response:**
  - `200 OK`: Returns the product details, including images.
  - `404 Not Found`: Product not found.
  - `500 Internal Server Error`: Server-side issue.

#### **Create a New Product**
- **URL:** `/products`
- **Method:** `POST`
- **Description:** Create a new product.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "qty_in_stock": "integer",
    "price": "number",
    "discount_price": "number (optional)"
  }
  ```
- **Files:** Up to 10 images as multipart files.
- **Response:**
  - `201 Created`: Product created successfully.
  - `500 Internal Server Error`: Server-side issue.

#### **Update a Product**
- **URL:** `/products/:id`
- **Method:** `PUT`
- **Description:** Update a product's details.
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: The ID of the product to update.
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "qty_in_stock": "integer",
    "price": "number",
    "discount_price": "number (optional)"
  }
  ```
- **Response:**
  - `200 OK`: Product updated successfully.
  - `500 Internal Server Error`: Server-side issue.

#### **Delete a Product**
- **URL:** `/products/:id`
- **Method:** `DELETE`
- **Description:** Delete a product.
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: The ID of the product to delete.
- **Response:**
  - `200 OK`: Product deleted successfully.
  - `500 Internal Server Error`: Server-side issue.

---

### **User API**

#### **Get Current User**
- **URL:** `/users/me`
- **Method:** `GET`
- **Description:** Retrieve details of the currently authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: Returns the current user's details.
  - `500 Internal Server Error`: Server-side issue.

#### **Update Current User**
- **URL:** `/users/me`
- **Method:** `PUT`
- **Description:** Update details of the currently authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "username": "string",
    "first_name": "string",
    "last_name": "string"
  }
  ```
- **Response:**
  - `200 OK`: User updated successfully.
  - `500 Internal Server Error`: Server-side issue.
