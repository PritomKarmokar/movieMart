## 📋 Project Review & Future Plans

This file outlines current limitations, planned improvements, and ideas for future development of the **Movie Rental Service** backend.

---

### ✅ Completed Features

- Admin & Customer authentication (signup/signin)
- JWT-based route protection
- Admin can create and list all movies
- Customers can view, rent, and list rented movies
- Basic validation using Zod
- Logging via Winston
- Date formatting for consistency

---

### 🛠️ In Progress Todos

- [ ] Add unit tests using Jest / Supertest
- [ ] Add dockerfile, docker-compose file

---

### 🚀 Planned Features (Future Enhancements)

### 🎟️ Rentals & Inventory

- [ ] Track rental start date and due date for each movie
- [ ] Automatically update `piecesAvailable` on rent & return
- [ ] Allow users to return movies
- [ ] Add fine calculation for late returns

### 📦 API & Documentation

- [ ] Add Swagger/OpenAPI documentation
- [ ] Version the API (`/api/v1`)

Feel free to contribute by submitting issues or PRs. Every improvement counts!
