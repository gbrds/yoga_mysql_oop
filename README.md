# Express MVC App

## Description
A simple Express MVC application with user registration, login, article management, and author tracking. Supports both JSON API endpoints (for Postman) and web views (EJS templates).

---

## API Endpoints (Postman)

### Articles
- **Create Article**  
  `POST /articles/create`  
  **Body (JSON):**  
  ```json
  {
    "name": "Article Name",
    "slug": "article-slug",
    "image": "image-url",
    "body": "Article content",
    "author_id": 1
  }
  ```

- **Get All Articles**  
  `GET /articles`  
  **Response:** JSON array of articles

- **Delete Article**  
  `DELETE /articles/delete/:id`  
  Deletes article based on article ID.

- **Edit Article**  
  `PUT /articles/edit/:id`  
  **Body (JSON):**  
  ```json
  {
    "name": "Updated Name",
    "slug": "updated-slug",
    "image": "updated-image-url",
    "body": "Updated content",
    "author_id": 1
  }
  ```

### Users
- **Register User**  
  `POST /users/register`  
  **Body (x-www-form-urlencoded):**  
  ```
  username=exampleuser
  password=examplepass
  email=example@example.com
  ```

- **Register Admin**
  `POST /users/register`
  **Body (JSON):**
  ```json
  {
    "username": "exampleuser",
    "password": "examplepass",
    "email": "example@example.com",
    "overwrite": "true"
  }
  ```
  **Body (x-www-form-urlencoded):**
  ```
  username=exampleuser
  password=examplepass
  email=example@example.com
  overwrite=true
  ```
### Authors
- **Get All Authors**  
  `GET /authors`  
  **Response:** JSON array of authors

---

## Web Endpoints

- **Login User**  
  `GET /users/login`  
  Displays login form (EJS).  
  `POST /users/login`  
  Submits form data; on success redirects to `/dashboard`.

- **Dashboard**  
  `GET /dashboard`  
  Protected page that shows user info after login.

---

## Installation

```bash
npm install
```

## Run the App

```bash
npm start
```

---

## Features
- User registration and login with session management
- Create, edit, delete, and view articles
- View all authors
- Web interface for login and dashboard
- JSON API endpoints for Postman
- Role-based Access
  - Every user has a role: ```user``` (Defailt) or ```admin```
  - Role is stored in the ```users``` table and also in the session after login
  - When registering through Postman, you can set ```"overwrite": true``` to create an admin user
  - Admin users are redirected to ```/admin/dashboard```, while normal users go to ```/dashboard```
  - Admin-only routes (like article delete/edit) check the user’s role before allowing access
  - If a non-admin tries to access an admin route, they get 403 Access Denied