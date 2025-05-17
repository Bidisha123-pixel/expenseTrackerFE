import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../slices/uiSlice';

const Header = () => {
  const dispatch = useDispatch();
  const activePage = useSelector(state => state.ui.activePage);

  const handleNavClick = (page) => {
    dispatch(setActivePage(page));
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">ExpenseTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              onClick={() => handleNavClick('dashboard')}
              active={activePage === 'dashboard'}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/expenses" 
              onClick={() => handleNavClick('expenses')}
              active={activePage === 'expenses'}
            >
              Expenses
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/add-expense" 
              onClick={() => handleNavClick('add-expense')}
              active={activePage === 'add-expense'}
            >
              Add Expense
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/categories" 
              onClick={() => handleNavClick('categories')}
              active={activePage === 'categories'}
            >
              Categories
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/reports" 
              onClick={() => handleNavClick('reports')}
              active={activePage === 'reports'}
            >
              Reports
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;