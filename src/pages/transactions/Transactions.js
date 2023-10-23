import React, { useState, useEffect } from 'react';
import TransactionSearchBar from '../../components/transaction/searchBar/TransactionSearchBar';
import DateFilter from '../../components/transaction/dateFilter/DateFilter';
import CategoryFilter from '../../components/transaction/categoryFilter/CategoryFilter';
import TypeFilter from '../../components/transaction/typeFilter/TypeFilter';
import api from '../../api/axiosConfig';
import "./Transactions.css";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import IncomeIcon from '../../components/transaction/Icons/IncomeIcon';
import ExpenseIcon from '../../components/transaction/Icons/ExpenseIcon';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const defaultTransactionState = {
    date: new Date().toISOString().slice(0, 10),
    description: '',
    amount: '',
    type: 'INCOME',
    categoryId: '',
  }
  const [newTransaction, setNewTransaction] = useState(defaultTransactionState);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('all');


  const filteredTransactions = transactions.filter((transaction) => {
    const isDateInRange =
      (!dateRange.start || new Date(transaction.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(transaction.date) <= new Date(dateRange.end));
  
    const isDescriptionMatching =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isCategoryMatching = !selectedCategory || transaction.category.id === selectedCategory;

    const isTypeMatching = !selectedType || selectedType === 'all' || transaction.type === selectedType;
  
    return isDateInRange && isDescriptionMatching && isCategoryMatching && isTypeMatching;
  });
  
  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(parseInt(categoryId, 10));
  };

  useEffect(() => {
    getTransactions();
    getCategories();
  }, [])

  const getTransactions = async () => {
    try {
      const response = await api.get('/api/v1/transactions');
      console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCategories = async () => {
    try {
      const response = await api.get('/api/v1/transactions/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const handleToggleChange = (e) => {
    const name = e.target.name;
    const value = e.target.checked ? 'INCOME' : 'EXPENSE';
    
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        await api.post('/api/v1/transactions', newTransaction);
        console.log(newTransaction);
        getTransactions();
    } catch (error) {
        console.log(error);
    }

    setNewTransaction(defaultTransactionState);
    closeModal();
  };

  const handleDateFilter = (startDate, endDate) => {
    setDateRange({ start: startDate, end: endDate });
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  return (
    <div className='transactions-container'>
      <h1>Transactions</h1>
      <div className='transaction-heading'>
        <div className='transactions-filters'>
          <TransactionSearchBar handleSearch={handleSearch} />

          <button onClick={openModal} className="new-button">
            <span className="plus-sign">+</span>
            New
          </button>

          <TypeFilter handleTypeFilter={handleTypeFilter} selectedType={selectedType} />

          <DateFilter handleDateFilter={handleDateFilter} />

          <CategoryFilter handleCategoryFilter={handleCategoryFilter} categories={categories} selectedCategory={selectedCategory} />
        </div>

        <h3 style={{ color: '#3F9543' }}>+$1000</h3>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-header">
            <div className="title">New Transaction</div>
            <button onClick={closeModal} className="close-button">
              &times;
            </button>
          </div>

          <div className="add-transaction-form-container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="new-transaction-date-picker">Date:</label>
              <input
                type="date"
                id="new-transaction-date-picker"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
                required
              />

              <div className="form-group">
                  <label htmlFor="category-select">Category:</label>
                  <select
                    id="category-select"
                    name="categoryId"
                    value={newTransaction.categoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>

                    {categories.map((category, index) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description-input">Description:</label>
                  <input
                    type="text"
                    id="description-input"
                    name="description"
                    value={newTransaction.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description-input">Type:</label>
                  <Toggle
                    className='modal-type-toggle'
                    defaultChecked={newTransaction.type === 'INCOME'}
                    icons={{
                      checked: <IncomeIcon />,
                      unchecked: <ExpenseIcon />,
                    }}
                    name='type'
                    onChange={handleToggleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="amount-input">Amount:</label>
                  <input
                    type="number"
                    id="amount-input"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

              <input type="submit" value="Add" />
            </form>
          </div>
        </div>
      )}
      {isModalOpen && <div id="overlay" onClick={closeModal} />}

      <table cellSpacing="0" cellPadding="0" className='transactions-table'>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={index}>
              <td className="table-check">
                <input type="checkbox" />
              </td>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.category.name}</td>
              <td>{transaction.description}</td>
              <td className={transaction.type === 'INCOME' ? 'income-amount' : 'expense-amount'}>
                {transaction.type === 'EXPENSE' && '-'}{transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Transactions