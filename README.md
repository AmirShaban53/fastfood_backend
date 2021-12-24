![CircleCI](https://img.shields.io/circleci/build/github/AmirShaban53/fastfood_backend?label=circleCi&logo=circleci)
![Coveralls](https://img.shields.io/coveralls/github/AmirShaban53/fastfood_backend)

# FAST FOOD API

food delivery app.

## Description

This is a restful API desgined to for a fast food resturant inodrer to be used in online
orders and delivery.

## Built With

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework

## Getting Started


### installation and setup

* download project from github.com/AmirShaban53/fastfood_backend/
* run the following in the terminal
```
npm install
```
   

### Usage

* How to run the program

```
#to start development server
npm run dev-start

#to run unit tests and code coverage
npm run coverage
```

## Features
* Users can create their own user account.
* Users can sign in.
* users can view menu items.
* Admin can create a new menu item.
* Admin can edit a specific menu item.
* Admin can delete a specific menu off item.
* Admin can can view all orders.
* admin can view a specific order.
* admin can edit a specific order.
* User view their past orders.
* User can place order.


## Endpoints
|  Method  |  Endpoint  |  Task  |
|  --- |  --- |  ---  |
|  `POST`   |  `/auth/signup`   |  `User signup`  |
|  `POST`   |  `/auth/login`    |  `User login`   |
|  `GET`    |  `/menu`          |  `users can view menu items`  |
|  `POST`   |  `/menu`          |  `Admin can create a new menu item`  |
|  `PATCH`  |  `/menu/:id`      |  `Admin can edit a specific menu item`  |
|  `DELETE` |  `/menu/:id`      |  `Admin can delete a specific menu item`  |
|  `GET`    |  `/orders`        |  `admin can view all orders`  |
|  `GET`    |  `/orders/:id`    |  `admin can view a specific order`  |
|  `PATCH`  |  `/orders/:id`    |  `admin can edit specific order`  |
|  `GET`    |  `/users/orders`  |  `User can view their past placed` |
|  `POST`   |  `/users/orders`  |  `User can place orders`  |

## Credit
created by Amir Budda Shaban



