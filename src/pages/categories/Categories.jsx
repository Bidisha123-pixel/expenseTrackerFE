import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, Button, Row, Col, Table, Form, 
  Modal, InputGroup 
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, faTrash, faPlus, faSave, 
  faTimes, faPalette
} from '@fortawesome/free-solid-svg-icons';
import { selectAllCategories, addCategory, updateCategory, deleteCategory } from '../slices/categoriesSlice';
import { selectAllExpenses } from '../slices/expensesSlice';
import { setActivePage } from '../slices/uiSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const expenses = useSelector(selectAllExpenses);
  
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryData, setCategoryData] = useState({
    id: '',
    name: '',
    color: '#000000',
    icon: 'tag'
  });
  
  const iconOptions = [
    { value: 'cart-shopping', name: 'Shopping Cart' },
    { value: 'lightbulb', name: 'Lightbulb' },
    { value: 'house', name: 'House' },
    { value: 'car', name: 'Car' },
    { value: 'film', name: 'Entertainment' },
    { value: 'hospital', name: 'Healthcare' },
    { value: 'book', name: 'Education' },
    { value: 'user', name: 'Personal' },
    { value: 'utensils', name: 'Food' },
    { value: 'plane', name: 'Travel' },
    { value: 'gift', name: 'Gift' },
    { value: 'tag', name: 'Tag' }
  ];

  useEffect(() => {
    dispatch(setActivePage('categories'));
  }, [dispatch]);
  
  const handleAddCategory = () => {
    setCategoryData({
      id: '',
      name: '',
      color: '#3498db',
      icon: 'tag'
    });
    setEditMode(false);
    setShowModal(true);
  };
  
  const handleEditCategory = (category) => {
    setCategoryData({ ...category });
    setEditMode(true);
    setShowModal(true);
  };
  
  const handleDeleteCategory = (categoryId) => {
    // Check if category is in use
    const inUse = expenses.some(expense => expense.category === categoryId);
    
    if (inUse) {
      alert('This category is in use by one or more expenses and cannot be deleted.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(categoryId));
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create slug-like ID from name if it's a new category
    const formData = { ...categoryData };
    if (!editMode) {
      formData.id = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    if (editMode) {
      dispatch(updateCategory(formData));
    } else {
      dispatch(addCategory(formData));
    }
    
    setShowModal(false);
  };
  
  const getCategoryUsageCount = (categoryId) => {
    return expenses.filter(expense => expense.category === categoryId).length;
  };

  return (
    <div className="categories">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Categories</h1>
        <Button 
          variant="primary"
          onClick={handleAddCategory}
        >
          <FontAwesomeIcon icon={faPlus} className="me-1" />
          Add Category
        </Button>
      </div>
      
      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Color</th>
                <th>Name</th>
                <th>Expenses</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>
                    <div 
                      className="color-sample"
                      style={{
                        backgroundColor: category.color,
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%'
                      }}
                    />
                  </td>
                  <td>{category.name}</td>
                  <td>{getCategoryUsageCount(category.id)}</td>
                  <td className="text-end">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      className="me-1"
                      onClick={() => handleEditCategory(category)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      disabled={getCategoryUsageCount(category.id) > 0}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <div className="text-muted">No categories found.</div>
                    <Button 
                      variant="link" 
                      onClick={handleAddCategory}
                      className="mt-2"
                    >
                      Add your first category
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Category Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? 'Edit Category' : 'Add New Category'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Enter category name"
                value={categoryData.name}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="categoryColor">
              <Form.Label>Color</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faPalette} />
                </InputGroup.Text>
                <Form.Control
                  type="color"
                  name="color"
                  value={categoryData.color}
                  onChange={handleChange}
                  title="Choose category color"
                />
                <Form.Control
                  type="text"
                  name="color"
                  value={categoryData.color}
                  onChange={handleChange}
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </InputGroup>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="categoryIcon">
              <Form.Label>Icon</Form.Label>
              <Form.Select
                name="icon"
                value={categoryData.icon}
                onChange={handleChange}
              >
                {iconOptions.map(icon => (
                  <option key={icon.value} value={icon.value}>
                    {icon.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} className="me-1" />
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
            >
              <FontAwesomeIcon icon={faSave} className="me-1" />
              {editMode ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;