import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });

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
      await api.post('/api/v1/transactions/categories', newCategory);
      getCategories();
    } catch (error) {
      console.log(error);
    }

    setNewCategory({
      name: '',
      description: '',
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await api.get('/api/v1/transactions/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>

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
                  required
                />
              </div>

              <input type="submit" value="Add" />
            </form>
          </div>
        </div>
      )}
      {isModalOpen && <div id="overlay" onClick={closeModal} />}

      <section>
        <table cellSpacing="0" cellPadding="0" className='categories-table'>
          <thead>
            <tr>
              <th>Categories</th>
              <th>
                <button onClick={openModal} className="new-category-button">
                  <span className="category-plus-sign">+</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>
                  {category.name} <br />
                  {category.description}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Home;
