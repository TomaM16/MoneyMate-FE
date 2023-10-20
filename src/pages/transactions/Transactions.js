import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import "./Transactions.css";

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await api.get('/api/v1/transactions');
      console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await api.get('/api/v1/transactions/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
    getCategories();
  }, [])

  const [isModalOpen, setModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().slice(0, 10),
    description: '',
    amount: '',
    categoryId: '',
  });

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        await api.post('/api/v1/transactions', newTransaction);
        console.log(newTransaction);
        getTransactions();
    } catch (error) {
        console.log(error);
    }

    setNewTransaction({
      date: '',
      description: '',
      amount: '',
      categoryId: '',
    });

    closeModal();
  };

  const handleDateFilter = () => {
    if (dateRange.start && dateRange.end) {
      const filtered = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
      setFilteredTransactions(filtered);
    } else {
      // If no date range is selected, show all transactions
      setFilteredTransactions(transactions);
    }
  }

  return (
    <div className='transactions-container'>
      <h1>Transactions</h1>
      <div className='transaction-heading'>
        <button onClick={openModal} className="new-button">
          <span className="plus-sign">+</span>
          New
        </button>

        <div>
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
          <button onClick={handleDateFilter}>Filter</button>
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

      <table cellspacing="0" cellpadding="0" className='transactions-table'>
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
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="table-check">
                <input type="checkbox" />
              </td>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.category.name}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Transactions