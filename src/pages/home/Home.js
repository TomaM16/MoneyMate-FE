import React, { useState, useEffect } from 'react';
import './Home.css';
import CategoryMultiSelect from '../../components/budget/categoryMultiSelect/CategoryMultiSelect';
import BudgetInfo from '../../components/budget/budgetInfo/BudgetInfo';
import CategoriesTable from '../../components/categories/categoriesTable/CategoriesTable';
import RecentTransactions from '../../components/recentTransactions/RecentTransactions';
import { useNavigate } from "react-router-dom";
import CategoriesService from '../../services/categories/categories.service';
import TransactionService from '../../services/transactions/transactions.service';

const Home = () => {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });

  const redirectToTransactions = () => {
    navigate('/transactions');
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      await CategoriesService.createCategory(newCategory);
      getCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }

    setNewCategory({
      name: '',
      description: '',
    });
  };

  useEffect(() => {
    getCategories();
    getRecentTransactions()
  }, []);

  const getCategories = async () => {
    try {
      const categoriesData = await CategoriesService.getCategories();
      setCategories(categoriesData);
      console.log(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getRecentTransactions = async () => {
    try {
      const recentTransactionsData = await TransactionService.getRecentTransactions();
      setRecentTransactions(recentTransactionsData);
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
    }
  };

  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>

      {/* <CategoryMultiSelect categories={categories} /> */}

      <div className="budget-categories">
        {recentTransactions.length > 0 ? (
          <div className="budget-recent-transactions-container">
            <BudgetInfo />

            <RecentTransactions transactions={recentTransactions} />
          </div>
        ) : (
          <div>
            <h5 className='no-transactions-message'>No transactions yet. Start tracking your transactions now!</h5>
            <button className='transactions-redirect-button' onClick={(redirectToTransactions)}>
              Go to Transactions
            </button>
          </div>
        )}

        <CategoriesTable categories={categories} openModal={openModal} />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-header">
            <div className="title">New Category</div>
            <button onClick={closeModal} className="close-button">
              &times;
            </button>
          </div>

          <div className="add-transaction-form-container">
            <form onSubmit={handleAddCategory}>
              <div className="form-group">
                <label htmlFor="name-input">Name:</label>
                <input
                  type="text"
                  id="name-input"
                  name="name"
                  value={newCategory.name}
                  onChange={handleCategoryChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description-input">Description:</label>
                <input
                  type="text"
                  id="description-input"
                  name="description"
                  value={newCategory.description}
                  onChange={handleCategoryChange}
                />
              </div>

              <input type="submit" value="Add" />
            </form>
          </div>
        </div>
      )}
      {isModalOpen && <div id="overlay" onClick={closeModal} />}
    </div>
  );
};

export default Home;
