# Product Management (Backend)

This is the backend application for the Product System project. It provides RESTful APIs for user authentication and product management.



## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/products/tools/compass) installed and running
- [Postman](https://www.postman.com/downloads/) installed and running

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Sonali-Mali93/Backend-ProductApp.git

```
2. Go to the project directory

```bash
cd Backend-ProductApp

```
3. Install dependencies::
```bash
npm install 

```
4. Create a .env file in the root directory and Add your MongoDB connection string:
```bash
MONGODB_URI=mongodb://username:password@localhost:27017/Backend-ProductApp.git
```

## Running the Application
```bash
npm start
```

The application will be accessible at http://localhost:3001

## Usage

## Authentication


### Register New user

- Use the `POST`endpoint  `/register` endpoint to register a new user. Send a JSON object in the request body with the `username and password`.

### Login User

- Use the `POST` endpoint  `/login` endpoint to authenticate a user and generate a JWT token.

## Product Management

### Add the Product Details
- Use the `POST`endpoint  `/product` endpoint to add a new product.

### Retrieving All Products
- Use the `GET`endpoint  `/product` endpoint to get all products.



### Updating a Product Details
-Use the `PUT` endpoint`/product/:productId` endpoint to update a product by ID.

### Deleting a Product Details
- Use the `DELETE` endpoint `/product/:productId` endpoint to delete a product by ID.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`
`PORT`


## Authors

- [@Sonali-Mali93](https://github.com/Sonali-Mali93)


