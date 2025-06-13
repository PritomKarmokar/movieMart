## movieMart
- 🎬 Movie Rental Service Backend

### 🛠️ Tech Stack

- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **Zod** for validation
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Winston** for logging


### 🚀 Features

### Admin

- ✅ Signup & Signin with JWT authentication
- 🎥 Add new movies
- 📋 View all available movies

### Customer

- ✅ Signup & Signin with JWT authentication
- 🎥 Rent a movie
- 📋 View all movies
- 🧾 See list of rented movies


### 📦 Installation
1. **Clone the repository:**
```bash
git clone git@github.com:PritomKarmokar/movieMart.git
cd movieMart
```
2. **Install dependencies**
```bash
npm install
```
3. **Environment Setup**
```bash
cp .env.example .env
```
4. **Run the development server**
```bash
npm run dev
```

### 🔐 API Endpoints

### Admin Routes (`/admin`)

| Method | Endpoint    | Description        |
|--------|-------------|--------------------|
| POST   | `/signup`   | Register new admin |
| POST   | `/signin`   | Login admin        |
| POST   | `/movies`   | Add a new movie    |
| GET    | `/movies`   | Get all movies     |

### Customer Routes (`/customer`)

| Method | Endpoint                | Description                   |
|--------|-------------------------|-------------------------------|
| POST   | `/signup`               | Register new customer         |
| POST   | `/signin`               | Login customer                |
| POST   | `/rent/movie/:movieId` | Rent a movie                  |
| GET    | `/movies`               | List all movies               |
| GET    | `/rentedMovies`         | View rented movies by customer |

### ⚠️ Notes
- JWT token must be included in `Authorization` header for protected routes
```bash
Authorization: Bearer <token>
```
### 📖 License
- MIT License — feel free to use and modify.