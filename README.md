# 🍽️ Restaurant Management API

A modern REST API for managing restaurants, users, and recommendations built with **NestJS**, **MongoDB**, and **TypeScript**.

![NestJS](https://img.shields.io/badge/NestJS-11.0-red?style=flat-square&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-9.6-green?style=flat-square&logo=mongodb)
![Node.js](https://img.shields.io/badge/Node.js-20+-grey?style=flat-square&logo=node.js)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Restaurants](#restaurants)
  - [Follows](#follows)
  - [Recommendations](#recommendations)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Development](#development)
- [Database](#database)

---

## ✨ Features

- 👥 **User Management** - Create, read, update, and delete users with favorite cuisines
- 🏪 **Restaurant Management** - Manage restaurants with multilingual support (English/Arabic)
- 📍 **Geolocation Search** - Find nearby restaurants using coordinates
- ❤️ **Follow System** - Users can follow restaurants
- 🤖 **Smart Recommendations** - Get personalized restaurant recommendations
- 📖 **Auto-generated API Documentation** - Interactive Swagger UI
- ✅ **Input Validation** - Class-based validation with `class-validator`
- 🗄️ **MongoDB Integration** - Mongoose ORM with schema validation

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **NestJS** | ^11.0.1 | Backend framework |
| **TypeScript** | Latest | Language |
| **MongoDB** | ^9.6.2 | Database |
| **Mongoose** | ^11.0.4 | MongoDB ORM |
| **Swagger/OpenAPI** | ^11.4.4 | API Documentation |
| **Jest** | ^30.0.0 | Testing framework |
| **ESLint** | ^9.18.0 | Code linting |

---

## 📦 Prerequisites

- **Node.js** >= 20.x
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd restaurant-management-api
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/restaurant-management
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant-management

# API Documentation
SWAGGER_ENABLED=true
```

---

## ▶️ Running the Application

### Development Mode (with hot reload)
```bash
npm run start:dev
```

### Production Build
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The API will be available at `http://localhost:3000`  
Swagger Documentation: `http://localhost:3000/docs`

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Root Endpoint

#### Get API Status
```http
GET /
```

**Response (200 OK):**
```json
{
  "message": "Hello World!"
}
```

---

## 👥 Users

### Create User
```http
POST /users
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "favoriteCuisines": ["Italian", "Asian", "Mediterranean"]
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "favoriteCuisines": ["Italian", "Asian", "Mediterranean"],
  "createdAt": "2024-05-22T10:30:00.000Z"
}
```

**Example using cURL:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "favoriteCuisines": ["Italian", "Asian"]
  }'
```

---

### Get All Users
```http
GET /users
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "favoriteCuisines": ["Italian", "Asian", "Mediterranean"],
    "createdAt": "2024-05-22T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "fullName": "Jane Smith",
    "favoriteCuisines": ["French", "Sushi"],
    "createdAt": "2024-05-22T11:15:00.000Z"
  }
]
```

**Example using cURL:**
```bash
curl http://localhost:3000/users
```

---

### Get Single User
```http
GET /users/:id
```

**Parameters:**
- `id` (string, required) - MongoDB ObjectId of the user

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "favoriteCuisines": ["Italian", "Asian", "Mediterranean"],
  "createdAt": "2024-05-22T10:30:00.000Z"
}
```

**Example using cURL:**
```bash
curl http://localhost:3000/users/507f1f77bcf86cd799439011
```

---

### Update User
```http
PATCH /users/:id
Content-Type: application/json
```

**Parameters:**
- `id` (string, required) - MongoDB ObjectId of the user

**Request Body:**
```json
{
  "fullName": "John Doe Updated",
  "favoriteCuisines": ["Italian", "Asian", "Mediterranean", "Indian"]
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe Updated",
  "favoriteCuisines": ["Italian", "Asian", "Mediterranean", "Indian"],
  "updatedAt": "2024-05-22T12:00:00.000Z"
}
```

**Example using cURL:**
```bash
curl -X PATCH http://localhost:3000/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe Updated",
    "favoriteCuisines": ["Italian", "Asian", "Mediterranean", "Indian"]
  }'
```

---

### Delete User
```http
DELETE /users/:id
```

**Parameters:**
- `id` (string, required) - MongoDB ObjectId of the user

**Response (200 OK):**
```json
{
  "message": "User deleted successfully",
  "_id": "507f1f77bcf86cd799439011"
}
```

**Example using cURL:**
```bash
curl -X DELETE http://localhost:3000/users/507f1f77bcf86cd799439011
```

---

## 🏪 Restaurants

### Create Restaurant
```http
POST /restaurants
Content-Type: application/json
```

**Request Body:**
```json
{
  "englishName": "Italian Bistro",
  "arabicName": "مطعم إيطالي",
  "slug": "italian-bistro",
  "cuisines": ["Italian", "Mediterranean"],
  "location": {
    "type": "Point",
    "coordinates": [31.2454, 30.0444]
  }
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439021",
  "englishName": "Italian Bistro",
  "arabicName": "مطعم إيطالي",
  "slug": "italian-bistro",
  "cuisines": ["Italian", "Mediterranean"],
  "location": {
    "type": "Point",
    "coordinates": [31.2454, 30.0444]
  },
  "createdAt": "2024-05-22T10:30:00.000Z"
}
```

**Example using cURL:**
```bash
curl -X POST http://localhost:3000/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "englishName": "Italian Bistro",
    "arabicName": "مطعم إيطالي",
    "slug": "italian-bistro",
    "cuisines": ["Italian", "Mediterranean"],
    "location": {
      "type": "Point",
      "coordinates": [31.2454, 30.0444]
    }
  }'
```

---

### Get All Restaurants
```http
GET /restaurants
GET /restaurants?cuisine=Italian
```

**Query Parameters (optional):**
- `cuisine` (string) - Filter by cuisine type

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439021",
    "englishName": "Italian Bistro",
    "arabicName": "مطعم إيطالي",
    "slug": "italian-bistro",
    "cuisines": ["Italian", "Mediterranean"],
    "location": {
      "type": "Point",
      "coordinates": [31.2454, 30.0444]
    }
  },
  {
    "_id": "507f1f77bcf86cd799439022",
    "englishName": "Sushi Palace",
    "arabicName": "قصر السوشي",
    "slug": "sushi-palace",
    "cuisines": ["Japanese", "Asian"],
    "location": {
      "type": "Point",
      "coordinates": [31.2400, 30.0400]
    }
  }
]
```

**Example using cURL:**
```bash
# Get all restaurants
curl http://localhost:3000/restaurants

# Filter by cuisine
curl "http://localhost:3000/restaurants?cuisine=Italian"
```

---

### Get Restaurant by Slug
```http
GET /restaurants/:slug
```

**Parameters:**
- `slug` (string, required) - URL-friendly identifier for the restaurant

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439021",
  "englishName": "Italian Bistro",
  "arabicName": "مطعم إيطالي",
  "slug": "italian-bistro",
  "cuisines": ["Italian", "Mediterranean"],
  "location": {
    "type": "Point",
    "coordinates": [31.2454, 30.0444]
  }
}
```

**Example using cURL:**
```bash
curl http://localhost:3000/restaurants/italian-bistro
```

---

### Find Nearby Restaurants
```http
GET /restaurants/nearby/search?lng=31.2454&lat=30.0444
```

**Query Parameters (required):**
- `lng` (number) - Longitude
- `lat` (number) - Latitude

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439021",
    "englishName": "Italian Bistro",
    "arabicName": "مطعم إيطالي",
    "slug": "italian-bistro",
    "cuisines": ["Italian", "Mediterranean"],
    "location": {
      "type": "Point",
      "coordinates": [31.2454, 30.0444]
    },
    "distance": 0.5
  }
]
```

**Example using cURL:**
```bash
curl "http://localhost:3000/restaurants/nearby/search?lng=31.2454&lat=30.0444"
```

---

## ❤️ Follows

### Follow Restaurant
```http
POST /follows
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "restaurantId": "507f1f77bcf86cd799439021"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439031",
  "userId": "507f1f77bcf86cd799439011",
  "restaurantId": "507f1f77bcf86cd799439021",
  "createdAt": "2024-05-22T10:30:00.000Z"
}
```

**Example using cURL:**
```bash
curl -X POST http://localhost:3000/follows \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "restaurantId": "507f1f77bcf86cd799439021"
  }'
```

---

### Get All Follows
```http
GET /follows
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439031",
    "userId": "507f1f77bcf86cd799439011",
    "restaurantId": "507f1f77bcf86cd799439021",
    "createdAt": "2024-05-22T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439032",
    "userId": "507f1f77bcf86cd799439011",
    "restaurantId": "507f1f77bcf86cd799439022",
    "createdAt": "2024-05-22T11:15:00.000Z"
  }
]
```

**Example using cURL:**
```bash
curl http://localhost:3000/follows
```

---

## 🤖 Recommendations

### Get Recommendations for User
```http
GET /recommendations/:userId
```

**Parameters:**
- `userId` (string, required) - MongoDB ObjectId of the user

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439021",
    "englishName": "Italian Bistro",
    "arabicName": "مطعم إيطالي",
    "slug": "italian-bistro",
    "cuisines": ["Italian", "Mediterranean"],
    "location": {
      "type": "Point",
      "coordinates": [31.2454, 30.0444]
    },
    "matchScore": 0.95
  },
  {
    "_id": "507f1f77bcf86cd799439025",
    "englishName": "Mediterranean Grill",
    "arabicName": "مشواة البحر المتوسط",
    "slug": "mediterranean-grill",
    "cuisines": ["Mediterranean", "Turkish"],
    "location": {
      "type": "Point",
      "coordinates": [31.2500, 30.0500]
    },
    "matchScore": 0.87
  }
]
```

**Example using cURL:**
```bash
curl http://localhost:3000/recommendations/507f1f77bcf86cd799439011
```

---

## 🧪 Testing

### Unit Tests
Run all unit tests:
```bash
npm run test
```

Watch mode (re-run on file changes):
```bash
npm run test:watch
```

Test coverage report:
```bash
npm run test:cov
```

---

### E2E Tests (Integration Tests)
Run end-to-end tests:
```bash
npm run test:e2e
```

---

### Manual API Testing with Postman/Insomnia

#### 1. **Import Collection**
   - Open [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)
   - Create a new collection called "Restaurant Management API"

#### 2. **Test Workflow Example**

**Step 1: Create a User**
```
POST http://localhost:3000/users
{
  "fullName": "John Doe",
  "favoriteCuisines": ["Italian", "Asian"]
}
```

**Step 2: Create a Restaurant**
```
POST http://localhost:3000/restaurants
{
  "englishName": "Italian Bistro",
  "arabicName": "مطعم إيطالي",
  "slug": "italian-bistro",
  "cuisines": ["Italian", "Mediterranean"],
  "location": {
    "type": "Point",
    "coordinates": [31.2454, 30.0444]
  }
}
```

**Step 3: Follow the Restaurant**
```
POST http://localhost:3000/follows
{
  "userId": "<user_id_from_step_1>",
  "restaurantId": "<restaurant_id_from_step_2>"
}
```

**Step 4: Get Recommendations**
```
GET http://localhost:3000/recommendations/<user_id_from_step_1>
```

---

### Using Swagger UI
Navigate to `http://localhost:3000/docs` in your browser to access the interactive Swagger documentation where you can test all endpoints directly.

---

## 📁 Project Structure

```
restaurant-management-api/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   │
│   ├── common/                 # Shared utilities
│   │   ├── filters/            # Exception filters
│   │   └── pipes/              # Custom pipes
│   │       └── mongo-id-pipe.ts
│   │
│   ├── users/                  # Users module
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── schemas/
│   │       └── user.schema.ts
│   │
│   ├── restaurants/            # Restaurants module
│   │   ├── restaurants.module.ts
│   │   ├── restaurants.controller.ts
│   │   ├── restaurants.service.ts
│   │   ├── dto/
│   │   │   ├── create-restaurant.dto.ts
│   │   │   └── update-restaurant.dto.ts
│   │   └── schemas/
│   │       └── restaurant.schema.ts
│   │
│   ├── follows/                # Follows module
│   │   ├── follows.module.ts
│   │   ├── follows.controller.ts
│   │   ├── follows.service.ts
│   │   ├── dto/
│   │   │   └── create-follow.dto.ts
│   │   └── schemas/
│   │       └── follow.schema.ts
│   │
│   └── recommendations/        # Recommendations module
│       ├── recommendations.module.ts
│       ├── recommendations.controller.ts
│       └── recommendations.service.ts
│
├── test/                       # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
├── eslint.config.mjs
└── README.md
```

---

## 👨‍💻 Development

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

### Building
```bash
npm run build
```

The compiled JavaScript will be in the `dist/` directory.

---

## 🗄️ Database

### MongoDB Schema

#### Users Collection
```json
{
  "_id": ObjectId,
  "fullName": String,
  "favoriteCuisines": [String],
  "createdAt": Date,
  "updatedAt": Date
}
```

#### Restaurants Collection
```json
{
  "_id": ObjectId,
  "englishName": String,
  "arabicName": String,
  "slug": String,
  "cuisines": [String],
  "location": {
    "type": "Point",
    "coordinates": [Number, Number]
  },
  "createdAt": Date,
  "updatedAt": Date
}
```

#### Follows Collection
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "restaurantId": ObjectId,
  "createdAt": Date
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines
- Use TypeScript with strict mode
- Follow NestJS best practices
- Add tests for new features
- Use meaningful variable and function names
- Format code using `npm run format`

---

## 📝 License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.

---

## 📧 Support

For support, please open an issue on the GitHub repository or contact the development team.

---

## 🎯 Roadmap

- [ ] Authentication & Authorization (JWT)
- [ ] Restaurant ratings and reviews
- [ ] Advanced search filters
- [ ] Push notifications
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

## 🙏 Acknowledgments

- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** May 22, 2024  
**Status:** 🟢 Active Development
