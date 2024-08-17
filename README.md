
# YouTube Backend

**Videotube** is a robust and scalable backend platform built using Node.js, Express.js, and MongoDB. The project is designed to provide a comprehensive and secure infrastructure for building a video-sharing platform, similar to YouTube. The platform enables users to upload, manage, and share videos, as well as interact with each other through comments and likes.

Key Features:

**User Management**: The project features a robust user management system, allowing users to register, login, and manage their accounts. The system includes features such as password hashing, salting, and verification.

**Video Rest API**: The platform provides a RESTful API for creating, reading, updating, and deleting videos. The API includes features such as video uploading, video thumbnail generation, and video metadata management.

**Post (Image) Rest API**: In addition to videos, the platform also supports uploading and managing images (posts) through a separate REST API.

**MongoDB Aggregation**: The project utilizes MongoDB's powerful aggregation framework to perform complex queries and data processing tasks.

**Authentication**: The platform includes a robust authentication system, using JSON Web Tokens (JWT) to secure user sessions and protect sensitive data.


## Authors

- [@dinesh Prajapati](https://www.github.com/dineshEth)


## Run Locally

Clone the project

```bash
  git clone https://github.com/dineshEth/youtube-backend.git
```

Go to the project directory

```bash
  cd youtube-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Tech Highlights


- Built using Node.js and Express.js for the backend

- Utilizes MongoDB as the primary database storage solution

- Implemented using modern web development best practices and design patterns

- Includes extensive use of MongoDB's aggregation framework for data processing and analysis

- Features robust authentication and authorization mechanisms to ensure secure data access


## Lessons Learned

**Node.js**: You will learn how to build a robust and scalable backend application using Node.js, including how to handle requests and responses, manage dependencies, and use various Node.js modules.

**Express.js**: You will learn how to use Express.js to create a RESTful API, handle HTTP requests, and implement middleware functions.

**MongoDB**: You will learn how to use MongoDB as a NoSQL database, including how to create collections, perform CRUD operations, and use MongoDB's aggregation framework.

**API Design**: You will learn how to design and implement a robust API, including how to handle requests and responses, manage errors, and implement authentication and authorization.

**Database Modeling**: You will learn how to design and implement a database schema for a complex application like a video-sharing platform.

**Problem-Solving**: You will learn how to break down complex problems into smaller, manageable tasks, and develop solutions to those tasks.

**Code Organization**: You will learn how to organize your code in a logical and maintainable way, using techniques such as modularization, dependency injection, and separation of concerns.

**Error Handling**: You will learn how to handle errors and exceptions in your code, including how to log errors, notify users, and implement retry mechanisms.

**Testing**: You will learn how to write unit tests and integration tests for your code, including how to use testing frameworks such as Jest or Mocha.


## API Reference

#### user signup

```http
  POST /api/v1/users/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** unique |
| `firstname` | `string` | **Required**.  |
| `lastname` | `string` | **Required**.  |
| `avatar` | `image` | **Required**.  size < 20kb |
| `coverimage` | `image` | **Required**.  size < 20kb |
| `password` | `string` | **Required**. |
| `email` | `string` | **Required**. unqie  |

#### user login

```http
  POST /api/v1/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**.  if not username |
| `username`| `string` | **Required**.  |
| `password`| `string` | **Required**. if not email  |

#### user logout

```http
  POST /api/v1/users/logout
```
#### user logout

```http
  GET /api/v1/users/profile/{{username}}
```

#### subscibe or unsubscribe channel

```http
  POST /api/v1/subscription/subscribe/{{id}}
```

#### video create

```http
  POST /api/v1/videos/{{username}}/upload
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** |
| `description` | `string` | **Required**.  |
| `videofile` | `video` | **Required**.  |
| `thumbnail` | `image` | |
| `isPublic` | `string` |  |

#### video delete

```http
  DELETE /api/v1/videos/{{username}}/{{id}}/delete
```

#### video get by id

```http
  GET api/v1/videos/{{id}}
```

#### video getUsers vidoes

```http
  GET /api/v1/videos/{{username}}
```
#### video commentOnVideo

```http
  POST /api/v1/videos/video/{{id}}/comment
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `comment`   | `string` | **Required**. |

#### video deleteComment

```http
  DELETE /api/v1/videos/video/{{id}}/comment
```
#### video like and unlike video

```http
  POST /api/v1/videos/video/{{id}}/like
```
#### post create

```http
  POST /api/v1/posts/post
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `post` | `image` | **Required**.  |
| `description` | `string` |   |

#### post edit

```http
  POST /api/v1/posts/post/{{id}}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `description` | `string` |   |

#### post delete

```http
  DELETE /api/v1/posts/post/{{id}}
```

#### post get by id

```http
  GET /api/v1/posts/post/{{id}}
```
#### post getuserposts

```http
  GET /api/v1/posts/post/{{username}}
```