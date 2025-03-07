Expense Tracker Backend
Hi there! I'm Vishal Amuluru, and welcome to the Expense Tracker Backend repository. This project serves as the API for an Expense Tracker application, enabling users to manage their expenses, budgets, and secure authentication.

What It Does
The backend provides RESTful endpoints that allow users to:

User Authentication: Register, login, and refresh tokens.
Budget Management: Create, update, retrieve, and delete budget plans.
Expense Tracking: Add, update, view, and delete expense entries.
Secure API: Uses JWT for token-based authentication, ensuring that only authenticated users can access certain endpoints.
Built With
Node.js & Express: For building the server and API endpoints.
TypeScript: For strong typing and better code maintainability.
TypeORM: For managing database interactions (configured for MySQL).
JWT: For secure authentication.
dotenv: For managing environment variables.
ESLint/Prettier: For code quality and consistent formatting.
Getting Started
Prerequisites
Node.js (v14 or above)
MySQL (or another database if configured accordingly)
npm or yarn
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/VishalAmuluru/expense-tracker-backend.git
cd expense-tracker-backend
Install dependencies:

bash
Copy
Edit
npm install
or

bash
Copy
Edit
yarn
Environment Setup:

Create a .env file in the root directory with your environment variables. For example:

ini
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_database_name
JWT_SECRET=your_jwt_secret
Database Setup:

Make sure your database is running and accessible with the provided credentials.

Running the Server
To start the server in development mode, run:

bash
Copy
Edit
npm run dev
or

bash
Copy
Edit
yarn dev
The API should now be running on http://localhost:5000.

Project Structure
bash
Copy
Edit
expense-tracker-backend/
├── src/
│   ├── config/
│   │   └── db.ts          # Database connection configuration using TypeORM
│   ├── controllers/       # Route controllers for authentication, budgets, and expenses
│   ├── entities/          # TypeORM entities (User, Expense, Budget)
│   ├── middlewares/       # Middleware (e.g., auth middleware for protecting routes)
│   ├── routes/            # Express routes for handling API endpoints
│   ├── utils/             # Utility functions (e.g., JWT handling)
│   ├── index.ts           # Entry point of the application
│   └── ...                # Other supporting files and configuration
├── .env                   # Environment variable file
├── package.json           # Project metadata and dependencies
└── tsconfig.json          # TypeScript configuration
Testing the API
You can test the API endpoints using tools like Postman or Insomnia. Make sure to include the JWT token (when required) in the Authorization header for protected routes.

Why I Built This
I developed this backend to provide a robust and secure API for managing expenses and budgets. It demonstrates my ability to create scalable, maintainable, and secure backend services using modern tools and best practices.

Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Thanks for checking out the Expense Tracker Backend! If you have any questions or feedback, feel free to reach out.
