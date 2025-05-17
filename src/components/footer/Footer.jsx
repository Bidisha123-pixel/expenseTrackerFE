import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-3 mt-auto fixed-bottom">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">© {currentYear} Expense Tracker App</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="/" className="text-decoration-none text-secondary">Dashboard</a>
              </li>
              <li className="list-inline-item">•</li>
              <li className="list-inline-item">
                <a href="/expenses" className="text-decoration-none text-secondary">Expenses</a>
              </li>
              <li className="list-inline-item">•</li>
              <li className="list-inline-item">
                <a href="/reports" className="text-decoration-none text-secondary">Reports</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;