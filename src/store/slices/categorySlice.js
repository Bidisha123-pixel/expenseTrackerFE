import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 'food', name: 'Food', color: '#FF5733', icon: 'cart-shopping' },
    { id: 'utilities', name: 'Utilities', color: '#337DFF', icon: 'lightbulb' },
    { id: 'housing', name: 'Housing', color: '#33FF57', icon: 'house' },
    { id: 'transportation', name: 'Transportation', color: '#F033FF', icon: 'car' },
    { id: 'entertainment', name: 'Entertainment', color: '#FFBD33', icon: 'film' },
    { id: 'healthcare', name: 'Healthcare', color: '#FF3369', icon: 'hospital' },
    { id: 'education', name: 'Education', color: '#33FFF0', icon: 'book' },
    { id: 'personal', name: 'Personal', color: '#8C33FF', icon: 'user' },
  ]
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.items.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter(category => category.id !== action.payload);
    }
  }
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

// Selectors
export const selectAllCategories = (state) => state.categories.items;
export const selectCategoryById = (state, categoryId) => 
  state.categories.items.find(category => category.id === categoryId);

export default categoriesSlice.reducer;