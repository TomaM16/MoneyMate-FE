import React, { useState } from 'react';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    categoryId: '',
  });

  const transactions = []; // You'll need to fetch the transaction data from an API or your backend

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    // Reset the form and update the transactions list
    setNewTransaction({
      date: '',
      description: '',
      amount: '',
      categoryId: '',
    });
    // Close the modal
    closeModal();
  };

  return (
    <div>
      <h1>Transaction List</h1>
      <button onClick={openModal}>New</button>

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

              {/* Add similar input fields for description, amount, and categoryId */}

              <input type="submit" value="Add Element" />
            </form>
          </div>
        </div>
      )}
      {isModalOpen && <div id="overlay" onClick={closeModal} />}

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.categoryName}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
