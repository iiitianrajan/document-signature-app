# 📄 Document Signature App

A production-inspired Document Signature Web Application that allows users to upload PDF documents, place signature fields, sign documents digitally, share signing links, and maintain audit logs.

This project is being developed as part of my Software Development Internship and follows a structured day-wise implementation plan.

---

# 🚀 Project Overview

The Document Signature App is inspired by platforms like DocuSign and Adobe Sign.

The application enables:

* User Authentication & Authorization
* Secure PDF Uploads
* PDF Preview & Rendering
* Drag-and-Drop Signature Placement
* Digital Signature Workflow
* Public Signing Links
* Audit Logging
* Signed PDF Generation
* Document Status Tracking

---

# 🎯 Project Goals

* Learn enterprise-level application architecture
* Understand document lifecycle management
* Work with PDF processing libraries
* Implement JWT Authentication
* Build real-world SaaS workflows
* Gain hands-on MERN stack experience

---

# 🛠 Tech Stack

## Frontend

* React (Vite)
* React Router DOM
* Tailwind CSS
* Axios
* React PDF
* DnD Kit

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer
* BcryptJS

## Deployment

* Vercel (Frontend)
* Railway / Render (Backend)
* MongoDB Atlas

---

# 📁 Project Structure

document-signature-app/

├── frontend/

├── backend/

├── .gitignore

└── README.md

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
cd document-signature-app
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📅 Development Progress Tracker

## Day 1 — Project Setup

* Setup Git Repository
* Setup Frontend (React + Vite)
* Setup Backend (Express)
* Configure Tailwind CSS
* Configure MongoDB Atlas
* Create Initial Folder Structure
* Create Test API


## Day 2 — Authentication System (JWT)

* Create User Model
* Implement User Registration API
* Implement User Login API
* Hash Passwords using Bcrypt
* Generate JWT Token on Login
* Create Authentication Middleware
* Create Protected Route
* Validate JWT Token
* Test Authentication APIs using Postman
* Verify User Data in MongoDB

## Day 3 — File Upload API

* Create Document Model
* Setup Multer Middleware
* Create Upload Folder
* Implement PDF Upload API
* Restrict Uploads to PDF Files
* Store File Metadata in MongoDB
* Protect Upload Route using JWT
* Create Get Documents API
* Test File Upload using Postman
* Verify Uploaded Documents in MongoDB