# Expense Tracker Frontend

A simple and modern expense tracker web application built with **React**, **Redux Toolkit**, and **Vite**.

## Features

- Add, edit, and delete expenses
- Categorize expenses with custom categories and colors
- Dashboard with total and recent expenses
- Category management (add, edit, delete)
- Responsive UI with [React Bootstrap](https://react-bootstrap.github.io/)
- State management using Redux Toolkit

## Project Structure

```
src/
  App.jsx
  App.css
  main.jsx
  index.css
  assets/
  components/
    Header/
    dashboard/
    categories/
    expense/
  store/
    store.js
    slices/
      categorySlice.js
      expenseSlice.js
      uiSlice.js
public/
  vite.svg
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```sh
npm install
```

### Running the App

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Main Dependencies

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Vite](https://vitejs.dev/)
