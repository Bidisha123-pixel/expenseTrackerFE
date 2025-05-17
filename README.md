# Expense Tracker Application

A comprehensive React application for tracking personal or business expenses, with visualization tools and category management features.

## 📋 Features

- **Dashboard**: View expense summary and recent transactions
- **Expense Management**: Add, edit, delete, and filter expenses
- **Category Management**: Create and manage custom expense categories
- **Reports & Analytics**: 
  - Visual representation of expenses with charts and graphs
  - Expense distribution by category
  - Monthly expense trends
  - Custom date range filtering
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Technologies Used

- **Frontend**:
  - React 18
  - Redux for state management
  - React Router for navigation
  - React Bootstrap for UI components
  - Recharts for data visualization
  - CSS for custom styling

## 📁 Project Structure

```
expense-tracker/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── AddExpense.jsx
│   │   ├── Categories.jsx
│   │   └── Reports.jsx
│   ├── store/
│   │   ├── index.js
│   │   └── ... (Redux slices, actions, reducers)
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Usage

### Adding Expenses

1. Navigate to "Add Expense" page
2. Fill in the expense details:
   - Amount
   - Description
   - Date
   - Category
3. Click "Add Expense" to save

### Managing Categories

1. Go to the "Categories" page
2. Add new categories with the form at the top
3. Edit or delete existing categories as needed

### Viewing Reports

1. Visit the "Reports" page
2. Select a date range (Month, Quarter, Year, or Custom)
3. View the generated charts and analytics
4. For custom date ranges, select specific start and end dates

## 📝 Future Enhancements

- User authentication system
- Multiple currency support
- Budget planning and tracking
- Receipt image uploading
- Expense sharing between users
- Export reports to PDF/CSV

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- React Bootstrap for the UI components
- Recharts for the visualization library
- All contributors who have helped shape this project