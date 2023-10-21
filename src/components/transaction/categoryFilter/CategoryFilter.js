import React from 'react';
import "./CategoryFilter.css";

const CategoryFilter = ({ handleCategoryFilter, categories, selectedCategory }) => {
  return (
    <div className="category-filter">
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => handleCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;