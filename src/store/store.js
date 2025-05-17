import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expensesSlice';
import categoriesReducer from './slices/categoriesSlice';
import uiReducer from './slices/uiSlice.js';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    categories: categoriesReducer,
    ui: uiReducer,
  },
});

export default store;