# Grocery Store by Hassan

A full-stack grocery e-commerce web application where customers can explore grocery products, add items to their cart, and place orders online. The project includes a frontend, backend API, and database for managing users, products, and orders.

## 1. Project Overview

Grocery Store by Hassan is designed to provide a simple and convenient online grocery shopping experience. Customers can browse different product categories, view product details, manage their shopping cart, and place orders by providing their delivery information.

The application uses a separate frontend and backend, connected through REST APIs. Customer and administrator accounts are handled through authentication and role-based access.

## 2. Main Features

- **User Registration and Login:** Customers can create accounts and securely log in.
- **Product Browsing:** View grocery products organized into different categories.
- **Product Search:** Find products using the search functionality.
- **Shopping Cart:** Add products, review selected items, and manage quantities.
- **Checkout:** Enter customer name, phone number, city, and complete delivery address.
- **Order Placement:** Submit grocery orders through the application.
- **Payment Options:** Support for Cash on Delivery and simulated online payment.
- **Admin Authentication:** Separate administrator access using role-based authentication.
- **Responsive Interface:** Designed to work on desktop and mobile devices.

## 3. Technologies and Tools Used

### Frontend

- **Next.js:** React-based framework used to build the website and manage application pages.
- **React.js:** Used to create reusable and interactive user interface components.
- **TypeScript:** Adds type safety and helps make the application code more reliable.
- **Tailwind CSS:** Used for styling, layouts, spacing, and responsive design.
- **JavaScript:** Supports application logic and interactive functionality.

### Backend

- **NestJS:** Backend framework used to develop APIs and handle application functionality.
- **Node.js:** JavaScript runtime used to execute the backend application.
- **Prisma ORM:** Manages communication between the backend and PostgreSQL database.
- **JWT (JSON Web Tokens):** Used for user authentication and protected access.
- **REST API:** Connects the frontend with backend services.

### Database

- **PostgreSQL:** Relational database used to store application information, including users, products, and orders.
- **Neon:** Cloud-hosted PostgreSQL database service used for the deployed application.

### Development and Deployment Tools

- **Visual Studio Code:** Used for writing and managing project code.
- **Git:** Used for version control and tracking project changes.
- **GitHub:** Used to store and manage the project's source code.
- **Vercel:** Used to deploy the Next.js frontend.
- **Back4App:** Used to deploy the backend API.
- **npm:** Used for installing and managing project dependencies.

**Folder descriptions:**

- `frontend/`: Contains website pages, components, styling, and product data used by the frontend.
- `backend/`: Contains the NestJS API, authentication, database configuration, and backend functionality.
- `scraper/`: Contains product data collected and prepared for the application.
- `prepare_products.py`: Python script used for preparing product data.
- `README.md`: Contains project documentation and setup instructions.

## 5. Database and Authentication

PostgreSQL is used to manage application data. Prisma ORM provides a structured way to interact with the database.

The application uses JWT-based authentication to manage user sessions and protect relevant API routes. Different user roles are supported to separate customer and administrator access.

## 6. Installation and Setup

### Requirements

- Node.js
- npm
- PostgreSQL database
- Git

### Clone the Repository

```bash
git clone https://github.com/Hassan-Amir-debug/grocery-store.git
cd grocery-store
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run at:

`http://localhost:3000`

### Backend Setup

Open another terminal:

```bash
cd backend
npm install
```

Configure the required environment variables in the backend `.env` file, including the PostgreSQL database connection string and JWT secret.

Then run the database migrations:

```bash
npx prisma migrate deploy
```

Start the backend:

```bash
npm run start:dev
```

The backend will normally run at:

`http://localhost:3000`

*Note: The frontend and backend must use separate available ports when running locally.*

## 7. Live Deployment

- **Frontend:** https://grocery-store-hassan.vercel.app
- **GitHub Repository:** https://github.com/Hassan-Amir-debug/grocery-store

The frontend is deployed using Vercel. The backend is deployed separately, and the application uses a cloud PostgreSQL database.

## 8. Project Purpose

This project was developed to gain practical experience in full-stack web development. It demonstrates how frontend interfaces, backend APIs, authentication, databases, and deployment services work together to build an e-commerce application.

It also provides hands-on experience with modern development tools and technologies used in real-world web applications.

---

**Developed by:** Hassan

**Project Name:** Grocery Store by Hassan