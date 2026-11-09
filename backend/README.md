# IBCM SuperEduAI – Backend

## About the Project

SuperEduAI is a university project developed for IBCM. It aims to provide an AI-powered educational platform that supports students, lecturers, and administrators.

This repository contains the backend implementation, developed using Python and FastAPI.

## Technology Stack

- **Python** – Backend programming language
- **FastAPI** – REST API framework
- **Pydantic** – Data validation
- **Uvicorn** – ASGI server
- **JWT** – Authentication tokens
- **pwdlib / Argon2** – Password hashing
- **Pytest** – Testing

## Current Features

- REST API structure
- Health-check endpoint
- Student endpoints
- Authentication using email and password
- JWT access tokens
- Password hashing
- Role-based authorization for:
  - Students
  - Professors
  - Administrators
- Protected role-specific endpoints

**Note:** This is an ongoing development project. Some features currently use prototype or temporary in-memory data and will be expanded as development progresses.

## Project Structure

```text
backend/
│
├── app/
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   │
│   ├── routers/
│   │   ├── auth.py
│   │   ├── ai.py
│   │   ├── courses.py
│   │   └── roles.py
│   │
│   ├── schemas/
│   ├── services/
│   ├── dependencies.py
│   └── main.py
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env.example
├── .gitignore
└── requirements.txt
```

## Running the Backend Locally

### 1. Clone the repository

```bash
git clone https://github.com/IBCM-SuperEduAI-2026/IBCM-SuperEduAI-Backend.git
cd IBCM-SuperEduAI-Backend
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

### 3. Activate the environment

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 4. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 5. Configure environment variables

Create a local `.env` file using `.env.example` as a reference.

Add your own secret key and the required demo account passwords. Never upload your `.env` file or share its secrets publicly.

### 6. Start the server

```bash
python -m uvicorn app.main:app --reload
```

## API Documentation

Once the server is running, visit:

- **Swagger UI:** http://127.0.0.1:8000/docs
- **OpenAPI schema:** http://127.0.0.1:8000/openapi.json

## Development Status

The backend is under active development. Authentication and initial role-based authorization have been implemented and tested. Additional functionality, including database integration, course management, and AI tutor integration, will be developed as the project progresses.

## Contributors

IBCM SuperEduAI – Group Project

**Repository:** IBCM-SuperEduAI-2026
