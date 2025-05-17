import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  selectTotalExpenses, 
  selectExpensesByCategory, 
  selectAllExpenses 
} from '../slices/expensesSlice';
import { selectAllCategories } from '../slices/categoriesSlice';
import { setActivePage } from '../slices/uiSlice';
import ExpenseSummaryChart from '../components/ExpenseSummaryChart';
import RecentExpenses from '../components/RecentExpenses';

const Dashboard = () => {
  const dispatch = useDispatch();
  const totalExpenses = useSelector(selectTotalExpenses);
  const expensesByCategory = useSelector(selectExpensesByCategory);
  const allExpenses = useSelector(selectAllExpenses);
  const categories = useSelector(selectAllCategories);
  
  // Get recent expenses (last 5)
  const recentExpenses = [...allExpenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Get category with highest expense
  let highestCategory = { id: null, total: 0 };
  Object.entries(expensesByCategory).forEach(([categoryId, amount]) => {
    if (amount > highestCategory.total) {
      highestCategory = { id: categoryId, total: amount };
    }
  });

  const highestCategoryName = highestCategory.id 
    ? categories.find(cat => cat.id === highestCategory.id)?.name || 'Unknown'
    : 'None';

  useEffect(() => {
    dispatch(setActivePage('dashboard'));
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h1 className="mb-4">Dashboard</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <div className="display-4 my-3">${totalExpenses.toFixed(2)}</div>
              <Button as={Link} to="/expenses" variant="outline-primary">View All Expenses</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Highest Category</Card.Title>
              <div className="display-4 my-3">{highestCategoryName}</div>
              <Button as={Link} to="/reports" variant="outline-primary">View Reports</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <div className="d-grid gap-2 my-3">
                <Button as={Link} to="/add-expense" variant="primary">Add New Expense</Button>
                <Button as={Link} to="/categories" variant="outline-secondary">Manage Categories</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={7}>
          <Card className="mb-4 h-100">
            <Card.Body>
              <Card.Title>Expense Summary</Card.Title>
              <div style={{ height: '300px' }}>
                <ExpenseSummaryChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="mb-4 h-100">
            <Card.Body>
              <Card.Title>Recent Expenses</Card.Title>
              <RecentExpenses expenses={recentExpenses} />
              {recentExpenses.length > 0 && (
                <div className="text-center mt-3">
                  <Button as={Link} to="/expenses" variant="outline-primary" size="sm">
                    View All
                  </Button>
                </div>
              )}
              {recentExpenses.length === 0 && (
                <div className="text-center text-muted my-5">
                  <p>No expenses yet.</p>
                  <Button as={Link} to="/add-expense" variant="primary">
                    Add your first expense
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;