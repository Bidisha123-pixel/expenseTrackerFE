import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import store from './store';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Container className="mt-4 mb-5 pb-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;