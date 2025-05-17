import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const Reports = () => {
  const expenses = useSelector(state => state.expenses);
  const categories = useSelector(state => state.categories);
  
  const [dateRange, setDateRange] = useState('month');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

  useEffect(() => {
    // Set default date range (current month)
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    setStartDate(formatDateForInput(firstDayOfMonth));
    setEndDate(formatDateForInput(lastDayOfMonth));
  }, []);

  useEffect(() => {
    filterExpensesByDate();
  }, [expenses, dateRange, startDate, endDate]);

  useEffect(() => {
    if (filteredExpenses.length > 0) {
      generateCategoryData();
      generateMonthlyData();
    }
  }, [filteredExpenses, categories]);

  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  const filterExpensesByDate = () => {
    if (!expenses.length) return;

    let start, end;
    const now = new Date();

    if (dateRange === 'custom' && startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else if (dateRange === 'month') {
      // Current month
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (dateRange === 'quarter') {
      // Current quarter
      const quarter = Math.floor(now.getMonth() / 3);
      start = new Date(now.getFullYear(), quarter * 3, 1);
      end = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
    } else if (dateRange === 'year') {
      // Current year
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
    }

    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= start && expenseDate <= end;
    });

    setFilteredExpenses(filtered);
  };

  const generateCategoryData = () => {
    const categoryTotals = {};

    filteredExpenses.forEach(expense => {
      if (categoryTotals[expense.categoryId]) {
        categoryTotals[expense.categoryId] += parseFloat(expense.amount);
      } else {
        categoryTotals[expense.categoryId] = parseFloat(expense.amount);
      }
    });

    const data = Object.keys(categoryTotals).map(categoryId => {
      const category = categories.find(cat => cat.id === categoryId) || { name: 'Uncategorized' };
      return {
        name: category.name,
        value: categoryTotals[categoryId]
      };
    });

    setCategoryData(data);
  };

  const generateMonthlyData = () => {
    const monthlyTotals = {};

    filteredExpenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] += parseFloat(expense.amount);
      } else {
        monthlyTotals[monthYear] = parseFloat(expense.amount);
      }
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const data = Object.keys(monthlyTotals).map(monthYear => {
      const [year, month] = monthYear.split('-').map(Number);
      return {
        name: `${monthNames[month-1]} ${year}`,
        amount: monthlyTotals[monthYear].toFixed(2)
      };
    });

    // Sort by date
    data.sort((a, b) => {
      const [monthA, yearA] = a.name.split(' ');
      const [monthB, yearB] = b.name.split(' ');
      
      if (yearA !== yearB) return yearA - yearB;
      return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
    });

    setMonthlyData(data);
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const getTotalExpenses = () => {
    return filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
  };

  const getAverageExpense = () => {
    if (filteredExpenses.length === 0) return '0.00';
    return (getTotalExpenses() / filteredExpenses.length).toFixed(2);
  };

  const getHighestExpense = () => {
    if (filteredExpenses.length === 0) return '0.00';
    return Math.max(...filteredExpenses.map(expense => parseFloat(expense.amount))).toFixed(2);
  };

  return (
    <div>
      <h2 className="mb-4">Expense Reports</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date Range</Form.Label>
                <Form.Select value={dateRange} onChange={handleDateRangeChange}>
                  <option value="month">Current Month</option>
                  <option value="quarter">Current Quarter</option>
                  <option value="year">Current Year</option>
                  <option value="custom">Custom Range</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {dateRange === 'custom' && (
              <Col md={6}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <h3 className="mt-3">${getTotalExpenses()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Average Expense</Card.Title>
              <h3 className="mt-3">${getAverageExpense()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Highest Expense</Card.Title>
              <h3 className="mt-3">${getHighestExpense()}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Expenses by Category</Card.Title>
              <div style={{ height: 300 }}>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center mt-5">No data available</div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Monthly Expense Trend</Card.Title>
              <div style={{ height: 300 }}>
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                      <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center mt-5">No data available</div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Expense Distribution</Card.Title>
              <div style={{ height: 300 }}>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center mt-5">No data available</div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;