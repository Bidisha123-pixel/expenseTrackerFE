import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    dateRange: {
      startDate: null,
      endDate: null
    },
    categoryFilter: null,
    searchTerm: '',
    sortBy: 'date', // 'date', 'amount', 'category'
    sortOrder: 'desc' // 'asc', 'desc'
  },
  activePage: 'dashboard',
  isLoading: false,
  notification: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.filters.dateRange = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.categoryFilter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.filters.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    }
  }
});

export const {
  setDateRange,
  setCategoryFilter,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  resetFilters,
  setActivePage,
  setLoading,
  showNotification,
  clearNotification
} = uiSlice.actions;

// Selectors
export const selectFilters = (state) => state.ui.filters;
export const selectActivePage = (state) => state.ui.activePage;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;