# 🚀 Lifted API

Lifted API is a secure, RESTful backend service that powers user authentication, motivational quotes, and user management for the Lifted application. It is built using **Node.js**, **Express**, **MongoDB**, and includes **Arcjet security**, **Swagger API documentation**, and scalable production deployment support.

---

## ✅ Features

- 🔐 **User Authentication & Authorization**
  - Register, login, logout
  - Secure cookie-based authentication (HTTP-only)
  - Password hashing with bcrypt

- 🎯 **Motivational Quote System**
  - CRUD operations for quotes

- 🛡 **Arcjet Security Integration**
  - Bot detection
  - Request rate-limiting
  - SQL injection & common attack prevention (Shield Rule)

- 📖 **Interactive API Documentation**
  - Available at `/api-docs` via Swagger UI
  - Supports live request testing

---


### API Servers
```
https://lifted-api.onrender.com/
```

### Swagger UI
You can try out the API and see documenation on our public Swagger UI at https://lifted-api.onrender.com/api-docs. (Takes a few seconds to load.)

<!-- ## API Reference

- [Get Random quote](#get-random-quote)
- [List Quotes](#list-quotes)
- [Get Quote By ID](#get-quote-by-id)
- [Create Private Quote](#create-private-quote)
- [Edit Private Quote By ID](#edit-private-quote-by-id)
- [Delete Private Quote By ID](#delete-private-quote-by-id)
- [Get User By ID](#get-user-by-id)
- [Edit User By ID](#edit-user-by-id)
- [Delete User By ID](#delete-user-by-id)
- [Sign Up](#sign-up)
- [Sign In](#sign-in) -->

<!-- ## 📌 API Routes
### 🔑 Authentication (`/api/v1/auth`)
| Method | Endpoint | Description |
| ---- | ----- | ------|
POST	| /register	| Create new user
POST	| /login |	Login + cookie auth
POST	| /logout	| Clear session cooki -->