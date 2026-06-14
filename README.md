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

## Day 4 — View & List Documents

* Create Get Documents API
* Protect Documents API using JWT
* Fetch User Documents from MongoDB
* Create Documents Page
* Display Uploaded Documents
* Setup Axios Service
* Install react-pdf
* Create PDF Viewer Component
* Add PDF Preview Functionality
* Build Basic Dashboard UI
* Test End-to-End Document Listing

## Day 5 — Signature Schema & Logic

* Create Signature Model
* Add documentId Reference
* Add signer Reference
* Add Signature Status Field
* Add Signature Coordinates (x, y)
* Add Page Number Support
* Create Save Signature API
* Protect Signature API using JWT
* Save Signature Data in MongoDB
* Create Document Viewer Page
* Setup React PDF Viewer
* Add PDF Preview Route
* Display Signature Placeholder
* Test End-to-End Signature Workflow

## Day 6 — PDF Editor Integration

* Create Document Viewer Page
* Pass Document ID using Route Params
* Pass PDF URL using React Router State
* Integrate React PDF Viewer
* Configure PDF.js Worker
* Display PDF Inside Application
* Create Draggable Signature Placeholder
* Implement Custom Drag and Drop Logic
* Capture Signature Coordinates (X, Y)
* Display Live Coordinate Tracking
* Create Signature Service
* Connect Save Signature API
* Send Document ID and Coordinates
* Save Signature Position to MongoDB
* Test End-to-End Signature Placement Flow

## Day 7 — Buffer & Testing

* Debug Frontend and Backend Integration
* Verify JWT Authentication Flow
* Test User Registration API
* Test User Login API
* Test PDF Upload API
* Test Document Retrieval API
* Test Signature Save API
* Validate MongoDB Collections
* Create Postman API Collection
* Fix UI and API Integration Issues
* Perform End-to-End Application Testing

## Day 8 — Generate Final Signed PDF

- Integrated PDF-Lib
- Generated signed PDF dynamically
- Embedded signer information
- Embedded timestamp
- Saved signed PDF to disk
- Updated document status to SIGNED
- Added signed PDF preview
- Added signed PDF download

## Day 9 — Email Invitations & Public Signature Links

* Generated UUID-based public signature links
* Implemented token-based public access system
* Created Public Signature Page
* Developed public signature API endpoint
* Added signature retrieval using public token
* Configured Nodemailer for email delivery
* Integrated Gmail SMTP service
* Implemented Email Invitation API
* Designed professional email template
* Added secure document signing links in emails
* Implemented public PDF access workflow
* Tested email delivery and public signing flow
* Verified token validation and document retrieval
* Successfully completed end-to-end signature invitation process


