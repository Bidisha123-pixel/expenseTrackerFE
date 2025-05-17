import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addExpenseAsync } from '../slices/expensesSlice';
import { selectAllCategories } from '../slices/categoriesSlice';
import { setActivePage } from '../slices/uiSlice';

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectAllCategories);
  const expenseStatus = useSelector(state => state.expenses.status);
  const error = useSelector(state => state.expenses.error);
  
  const [validated, setValidated] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: categories[0]?.id || '',
    notes: ''
  });

  useEffect(() => {
    dispatch(setActivePage('add-expense'));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    dispatch(addExpenseAsync({
      ...expenseData,
      amount: parseFloat(expenseData.amount),
      date: expenseData.date
    })).then(() => {
      // Reset form and navigate to expenses list on success
      setExpenseData({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: categories[0]?.id || '',
        notes: ''
      });
      setValidated(false);
      navigate('/expenses');
    });
  };

  return (
    <div className="add-expense">
      <h1 className="mb-4">Add New Expense</h1>
      
      <Card>
        <Card.Body>
          {error && (
            <Alert variant="danger">
              Error: {error}
            </Alert>
          )}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Group controlId="expenseTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    placeholder="Enter expense title"
                    value={expenseData.title}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a title.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="expenseAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    value={expenseData.amount}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid amount.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="expenseDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="date"
                    value={expenseData.date}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="expenseCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    required
                    name="category"
                    value={expenseData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a category.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="expenseNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                rows={3}
                placeholder="Add notes (optional)"
                value={expenseData.notes}
                onChange={handleChange}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={expenseStatus === 'loading'}
              >
                {expenseStatus === 'loading' ? 'Saving...' : 'Save Expense'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddExpense;