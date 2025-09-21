
# ArgentBank Frontend

ArgentBank is a modern banking web application built with React, Vite, and Redux Toolkit. It provides user authentication, profile management, and account overview features.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Main Features](#main-features)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Technical Documentation](#technical-documentation)
- [FAQ](#faq)

## Project Overview

This project is the frontend for ArgentBank, a demo banking platform. It uses React for the UI, Redux Toolkit for state management, and communicates with a REST API backend.

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3.Make sure the backend is running (see backend README).

## Usage

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Project Structure

- `src/components/` — Reusable UI components (Header, Footer, Account, etc.)
- `src/pages/` — Main pages (Home, Login, Profile)
- `src/service/` — Business logic and API calls (authService, authSlice)
- `src/app/` — Redux store configuration
- `src/styles/` — CSS files
- `public/` — Static assets

## Main Features

- User authentication (login/logout)
- Profile management (view/update user info)
- Protected routes (PrivateRoute)
- Account overview
- Responsive design

## Scripts

- `npm run dev` — Start frontend in development mode
- `npm run build` — Build for production
- `npm run lint` — Run ESLint

## Contributing

Follow these guidelines:

- Use clear commit messages
- Organize components by feature
- Write JSDoc for main functions and services
- Use English for code comments and documentation

## Technical Documentation

- Redux state is managed in `src/app/store.js` and `src/service/authSlice.js`
- API calls are handled in `src/service/authService.js`
- Routing is defined in `src/router.jsx`
- Protected routes use `src/components/PrivateRoute.jsx`

### Example: Dispatching an action

```js
import { useDispatch } from 'react-redux';
import { loginUser } from './service/authSlice';

const dispatch = useDispatch();
dispatch(loginUser({ email, password }));
```

## FAQ

- **API connection issues:** Ensure the backend is running on the correct port.
- **Build errors:** Check Node.js and npm versions, reinstall dependencies.
- **Missing dependencies:** Run `npm install` in the frontend directory.

---
For backend setup and API documentation, see the backend folder README.
