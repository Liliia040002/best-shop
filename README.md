# Project template
# Fundamentals Project (TypeScript + SASS)

Self-evalueted score 54 out of 64

## 📌 Deploy link

[link](https://best-shoper.netlify.app/)

---

## 📌 Description

This project is a frontend application built using **TypeScript** and **SASS (SCSS)**.
It follows a modular structure for styles and scripts, making the code scalable and maintainable.

---

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

* Node.js (recommended version 16+)
* npm (comes with Node.js)

---

## 🚀 Setup and Run

### 1. Install dependencies

```bash
npm install
```

---

### 2. Run the project

```bash
npm run dev
```

---

## 🔧 What happens when you run the project?

The `dev` script will:

* Compile **TypeScript** files into JavaScript
* Compile **SASS (.scss)** into CSS
* Watch for changes in SCSS files and recompile automatically

---

## 📁 Project Structure

```
src/
 ├── scss/
 │    ├── abstracts/
 │    ├── base/
 │    ├── components/
 │    ├── layouts/
 │    ├── pages/
 │    └── main.scss
 ├── ts/
 └── index.html

dist/
 └── css/
```

---

## 🎨 SASS Compilation

* Entry point: `src/scss/main.scss`
* Output: `dist/css/main.css`

SASS is compiled automatically when running:

```bash
npm run dev
```

---

## 📝 Notes

* Do not edit files inside the `dist` folder manually
* All styles should be written in `.scss` files inside `src/scss`
* The project uses a structured SASS architecture (partials + main entry file)

---

## ✅ Available Scripts

* `npm install` → install dependencies
* `npm run dev` → build and run the project
