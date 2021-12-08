# Shop

E-commerce platform built with the MERN stack & Redux.

![screenshot](https://github.com/mayurPardeshi99/shop/blob/main/Readme_Images/Homescreen.PNG)

This project was created using Node.js, Express, MongoDB, React, Redux and Bootstrap. JWT was used to handle authentication.  

## Features
- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)


## Setup

1. Clone the repository

```
git clone https://github.com/mayurPardeshi99/shop.git
cd shop
```
2. Install [mongodb](https://www.mongodb.com/) (Igonre if alredy installed)

3. Create a cloudinary account to get an API key and secret code and also create PayPal account to get PayPal client Id.

Create a .env file in the root of the project and add the following:  

```
NODE_ENV = development
DB_URL = mongodb://localhost:27017/<database_name>
JWT_SECRET = <jwt_secret>
PAYPAL_CLIENT_ID = <PayPal_client_id>
CLOUDINARY_CLOUD_NAME= <cloudinary_cloud_name>
CLOUDINARY_KEY= <cloudinary_key>
CLOUDINARY_SECRET= <cloudinary_secret>
```
### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```
### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
1234

john@example.com (Customer)
1234

jane@example.com (Customer)
1234
```
### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
