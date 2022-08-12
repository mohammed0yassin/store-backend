# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index
    '/products' [GET]
- Show
    '/products/:id' [GET]
- Create [token required]
    '/products' [POST]
- Delete [token required]
    '/products/:id' [DELETE]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
    '/users' [GET]
- Show [token required]
    '/users/:id' [GET]
- Create
    '/users/' [POST]
- login
    '/login/' [POST]
- DELETE [token required]
    '/users/:id' [POST]

#### Orders
- Current Order by user (args: user id)[token required]
    '/orders/' [GET]
- New Order by user (args: user id)[token required]
    '/orders/' [POST]
- Add Product to active Order by user (args: user id)[token required]
    '/orders/:id/products' [POST]
- Delete Order by user (args: user id)[token required]
    '/orders/:id' [DELETE]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id: SERIAL PRIMARY KEY
- name: string
- price: number
- [OPTIONAL] category

#### User
- id: SERIAL PRIMARY KEY
- username: string (unique)
- firstName: string
- lastName: string
- password_digest: string

#### Orders
- id: SERIAL PRIMARY KEY
- user_id: number[foreign key to users table]
- status of order (active or complete): boolean [active: true] [complete: false]
- product_ids: number[] (list of products ids to be used in Order-Products table)

#### Order-Products
- id: SERIAL PRIMARY KEY
- order_id: number[foreign key to orders table]
- product_id: number[foreign key to products table]

#### Sample databsse schema
![Alt text](./users_schema.png?raw=true "Users")