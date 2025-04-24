REM Initialize a new Bun project with default settings
bun init -y

REM Add necessary dependencies for the project
bun add express cors mongoose helmet dotenv morgan bcrypt jsonwebtoken joi winston express-async-errors ollama supertest

REM Add development dependencies for TypeScript type definitions
bun add -D @types/node @types/express @types/cors @types/mongoose @types/helmet @types/dotenv @types/morgan @types/bcrypt @types/jsonwebtoken @types/joi @types/winston @types/supertest

REM Create a directory for controllers
mkdir controllers

REM Create a directory for models
mkdir models

REM Create a directory for routes
mkdir routes

REM Create a directory for middlewares
mkdir middlewares

REM Create a directory for validators
mkdir validators

REM Create a directory for database configurations
mkdir database

REM Create a directory for logger configurations
mkdir logger

REM Create a directory for tests
mkdir tests

REM Create a directory for http requests
mkdir http




REM Create a .env file for environment variables
echo PORT=3000 > .env
echo DB_URI=mongodb://localhost:27017/mydatabase >> .env
echo JWT_SECRET=mysecretkey >> .env

REM Create a .env.example file for example environment variables
echo PORT=3000 > .env.example
echo MONGO_URI=mongodb://localhost:27017/mydatabase >> .env.example
echo JWT_SECRET=mysecretkey >> .env.example



REM Git initialization
git init

REM Initial commit
git add .
git commit -m "Initial commit"
