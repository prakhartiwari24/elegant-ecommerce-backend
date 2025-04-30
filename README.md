# E-Commerce Admin Portal — Backend

This is the backend service for the E-Commerce Admin Portal. It provides:

- **User Authentication** (JWT, role-based: admin/user)
- **Product Management** (CRUD + pagination + search)
- **Category Management** (CRUD)
- **Order Viewing** (list & detail)
- **Validation** (Joi) and **Error Handling**
- **Security** (bcrypt password hashing, rate-limiting)
- **Logging** (winston)

### Tech Stack

- **Node.js** 18 + **TypeScript**
- **Express.js**
- **Sequelize ORM** + **MySQL**
- **Joi** for request validation
- **jsonwebtoken** for JWT
- **bcryptjs** for password hashing
- **express-rate-limit** for login throttling
- **winston** for structured logging

---

## Prerequisites

- **Node.js** ≥ 18
- **MySQL** server
- (optional) **Docker** & **docker-compose**

---

## Setup & Local Development

**Clone repository**

```bash
git clone https://github.com/your-org/ecommerce-backend.git
cd ecommerce-backend
npm ci
```

## Setup & Local Development

Create a file called .env in the project root:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret
PORT=5002
```

## Database migrations & seed

```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Run

```
npm run dev
```

Server listens on http://localhost:5002

## API Endpoints

1. Authentication

- `POST /auth/signup`

  - Body: `{ "email": string, "password": string, "role": "admin"|"user" }`

  - Response: `{ status, message, data: { success, token, expiresIn, email, id } }`

- `POST /auth/login`
  - Body: `{ "email": string, "password": string }`
  - Response: `{ status, message, data: { success, token, expiresIn, email, id } }`

2.  Categories
    All routes under /categories require a valid JWT in Authorization: Bearer <token>. Write operations require role="admin".

    - GET `/categories`

    - GET `/categories/:id`

    - POST `/categories` `Body: { "name": string }`

    - PUT `/categories/:id` `Body: { "name": string }`

    - DELETE `/categories/:id`

3.  Products
    All routes under `/products` require a valid JWT. Create/update/delete require `admin` role.

    - GET `/products?page=1&limit=10&search=foo`

    - GET `/products/:id`

    - POST `/products` Body: `{ "name": string, "price": number, "categoryId": number, "description"?: string }`

    - PUT `/products/:id` Body: `{ "name": string, "price": number, "categoryId": number, "description"?: string }`

    - DELETE `/products/:id`

4.  Orders
    All routes under `/orders` require a valid JWT. Any authenticated user may list/view.

    - GET `/orders`
    - GET `/orders/:id`

## NPM Scripts

`npm run dev` — start in development mode (hot-reload)
`npm start` — run compiled code (dist/app.js)

## Author

Prakhar Tiwari
prakhartiwari20@gmail.com
