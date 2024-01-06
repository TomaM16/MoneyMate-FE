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
import { formatDate, formatTime } from '../../utils/date/DateUtils';


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
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);


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

  const mockFilteredTransactions = [
    {
      date: new Date().toISOString().slice(0, 10),
      description: 'Tr 1',
      amount: '100',
      type: 'INCOME',
      category: {
        name: 'Category 1',
      },
    },
    {
      date: new Date().toISOString().slice(0, 10),
      description: 'Tr 1',
      amount: '100',
      type: 'INCOME',
      category: {
        name: 'Category 1',
      },
    },
    {
      date: new Date().toISOString().slice(0, 10),
      description: 'Tr 1',
      amount: '100',
      type: 'INCOME',
      category: {
        name: 'Category 1',
      },
    },
    {
      date: new Date().toISOString().slice(0, 10),
      description: 'Tr 1',
      amount: '100',
      type: 'INCOME',
      category: {
        name: 'Category 1',
      },
    }
  ]

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
      const response = await api.get('/api/v1/categories');
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

  const handleFilterButtonClick = () => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
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

          {/* <div>
            <div classname="filter"></div>

            <button onClick={handleFilterButtonClick} className="filter-button">Open Filters</button>

            {isFilterPopupOpen && (
              <div className="popup">
                <TypeFilter handleTypeFilter={handleTypeFilter} selectedType={selectedType} />
                <DateFilter handleDateFilter={handleDateFilter} />
                <CategoryFilter handleCategoryFilter={handleCategoryFilter} categories={categories} selectedCategory={selectedCategory} />
              </div>
            )}
          </div> */}

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

      {filteredTransactions.length > 0 && (
        <div className="all-transactions-table-container">
          <table className="recent-transactions-table all-transactions-table">
            <thead>
              <tr>
                <th><span>Category</span></th>
                <th className='left-align'>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className='category-cell'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yIf_k_mAR9v9rebEAu3Yf3XDmOsN6_l3s4056Ka0uGMLE_XVC26Lpk_OTIL41oYWXnw&usqp=CAU" className="category-image" />
                    <h5 className='black'>{transaction.category.name}</h5>
                  </td>
                  <td className='left-align gray'>{transaction.description}</td>
                  <td className='right-align gray'>{formatDate(transaction.date)}</td>
                  <td className='center-align gray'>{formatTime(transaction.date)}</td>
                  <td className={transaction.type === 'INCOME' ? 'income-amount black' : 'expense-amount black'}>
                    {transaction.type === 'EXPENSE' && '-'}{transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Transactions