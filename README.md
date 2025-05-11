# Food Hub - README

## Overview

Food Hub is a mobile application built with React Native (Expo) and Express.js. It connects customers with restaurants, allowing them to browse menus, add items to their cart, and place orders. The app supports two delivery methods: online delivery and on-site pickup. Restaurants can manage their menus and account details via an admin page.

## Features

### Customer Features

- Browse a list of restaurants.
- View restaurant menus and select items.
- Add items to the cart and place orders.
- Choose between online delivery or on-site pickup.
- Secure authentication with login and registration.

### Restaurant Admin Features

- Modify restaurant profile and account details.
- Add, update, or remove menu items.
- Manage incoming orders.

## Authentication

- Login and Register pages for both customers and restaurants.

## Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Express.js
- **Database:** PostgreSQL / MySQL

## Database Schema

| Table            | Description                                 |
| ---------------- | ------------------------------------------- |
| `restaurant`     | Stores restaurant details and account info. |
| `user`           | Stores customer details.                    |
| `order`          | Stores order details and statuses.          |
| `product`        | Stores menu items for restaurants.          |
| `transaction`    | Logs payment transactions.                  |
| `payment_method` | Stores available payment methods.           |

## Installation & Setup

### Backend (Express.js)

```bash
git clone [https://github.com/yourusername/food-hub.git](https://github.com/yourusername/food-hub.git)
cd food-hub/backend

npm install

npm start
```

### Frontend(React Native)

```bash
   #start frontend

   cd ../frontend

   npm install

   expo start
```

## Screenshots

1.  Authentication

## Login

![Login Page](documentation/images/login.png)

## Register

![Register Page](documentation/images/register.png)

## Logout

![Logout Page](documentation/images/logout.png)

## Login Successful

![Login Success Page](documentation/images/login_success.png)

2.  Customer Pages

## Customer Landing Page

![Customer Landing Page](documentation/images/customer_landing_page.png)

## Restaurant Menu Page

![Restaurant Landing Page](documentation/images/resturant_menu.png)

## Add To Cart Page

![Add To Cart Page](documentation/images/add_to_cart.png)

## Order Page

![Order Page](documentation/images/order.png)

## Order By Delivery Page

![Order By Delivery Page](documentation/images/order_by_deliver.png)

## Order By Online Page

![COrder By Online Page](documentation/images/order_by_online.png)

## Online Payment Page

![Online Payment Page](documentation/images/online_payment.png)

3. Restaurant Admin Pages

## Restaurant Logout Page

![Restaurant Logout Page](documentation/images/restaurant_logout.png)

## Restaurant Admin Page

![Restaurant Admin Page](documentation/images/restarant_admin_page.png)

## Update Product Page

![Update Product Page](documentation/images/update_product.png)

## Update Restaurant Page

![Update Restaurant Page](documentation/images/update_restaurant.png)
