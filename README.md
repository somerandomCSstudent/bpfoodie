# 🍜 BpFoodie: Budapest Restaurant Review Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Preact](https://img.shields.io/badge/Framework-Preact-673AB8.svg)](https://preactjs.com/)

## 📝 Overview

BpFoodie is a modern web application designed for discovering and reviewing restaurants in Budapest. It features a complete user authentication system and allows logged-in users to submit detailed comments and 1-5 star ratings for various dining establishments. The platform dynamically calculates and displays the average rating for each restaurant.

This project was developed with a strong focus on clean architecture, state management using React Context, and full support for dynamic theming (Light/Dark mode).

## ✨ Key Features

* **User Authentication:** Full Register and Login functionality using mock service workers.
* **Persistent User State:** Display of the "Logged in as... [Username]" status in the Header, with a Log out option.
* **Restaurant Selection:** A dropdown menu allows users to select and view details for different restaurants.
* **Dynamic Review System:** Users can submit comments and 1-5 star ratings. Reviews are instantly displayed for all users.
* **Average Rating Display:** The average rating for each restaurant is dynamically calculated based on submitted reviews.
* **Restaurant Contribution:** Logged-in users can add new restaurants to the database via a dedicated modal form.
* **Full Theming Support:** The application, including all forms and modals, seamlessly switches between **Light** and **Dark** modes.
* **Clean Code:** Structured using Contexts, DTOs (Data Transfer Objects), and component-specific CSS Modules.

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Preact / React | High-performance UI rendering and component architecture. |
| **Language** | TypeScript | Strong typing for maintainability and scalability. |
| **Styling** | CSS Modules | Component-scoped styling, facilitating theme toggling. |
| **State Management** | React Context API | Global state management for Authentication (`AuthContext`) and Theming (`ThemeContext`). |
| **Build Tool** | Vite | Fast development server and optimized bundling. |

## 🚀 Getting Started

Follow these steps to get a copy of the project running on your local machine.

### Prerequisites

You need to have Node.js and npm (or Yarn/pnpm) installed.

```bash
# Check Node.js version
node -v

# `create-preact`

<h2 align="center">
  <img height="256" width="256" src="./src/assets/preact.svg">
</h2>

<h3 align="center">Get started using Preact and Vite!</h3>

## Getting Started

-   `npm run dev` - Starts a dev server at http://localhost:5173/

-   `npm run build` - Builds for production, emitting to `dist/`

-   `npm run preview` - Starts a server at http://localhost:4173/ to test production build locally
