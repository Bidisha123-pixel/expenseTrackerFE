import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API function - in a real app, this would be a fetch call
const saveExpenseToAPI = async (expense) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ...expense, id: Date.now().toString() };
};

// Async thunk for adding expenses
export const addExpenseAsync = createAsyncThunk(
  'expenses/addExpense',
  async (expense) => {
    const response = await saveExpenseToAPI(expense);
    return response;
  }
);

// Initial state with sample data
const initialState = {
  items: [
    {
      id: '1',
      title: 'Groceries',
      amount: 89.99,
      date: '2025-05-14',
      category: 'food',
      notes: 'Weekly grocery shopping'
    },
    {
      id: '2',
      title: 'Internet Bill',
      amount: 59.99,
      date: '2025-05-10',
      category: 'utilities',
      notes: 'Monthly internet subscription'
    },
    {
      id: '3',
      title: 'Movie Tickets',
      amount: 24.50,
      date: '2025-05-15',
      category: 'entertainment',
      notes: 'Weekend movie with friends'
    }
  ],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.items.push(action.payload);
    },
    updateExpense: (state, action) => {
      const index = state.items.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteExpense: (state, action) => {
      state.items = state.items.filter(expense => expense.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpenseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addExpenseAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addExpenseAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addExpense, updateExpense, deleteExpense } = expensesSlice.actions;

// Selectors
export const selectAllExpenses = (state) => state.expenses.items;
export const selectExpenseById = (state, expenseId) => 
  state.expenses.items.find(expense => expense.id === expenseId);
export const selectTotalExpenses = (state) => 
  state.expenses.items.reduce((total, expense) => total + Number(expense.amount), 0);
export const selectExpensesByCategory = (state) => {
  const categoryTotals = {};
  state.expenses.items.forEach(expense => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }
    categoryTotals[expense.category] += Number(expense.amount);
  });
  return categoryTotals;
};

export default expensesSlice.reducer;