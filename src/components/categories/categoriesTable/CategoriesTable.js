import React from 'react'
import './CategoriesTable.css'

const CategoriesTable = ({categories, openModal}) => {
  return (
    <div className='categories-table-container'>
        <div className="categories-table-header">
            <h2 className='component-title'>Categories</h2>
            
            <button onClick={openModal} className='add-category'>Add</button>
        </div>
        
        <div className="categories-container">
            {categories.map(category => (
                <div key={category.id} className="category-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yIf_k_mAR9v9rebEAu3Yf3XDmOsN6_l3s4056Ka0uGMLE_XVC26Lpk_OTIL41oYWXnw&usqp=CAU" className="category-image" />
                    <span className="category-name">{category.name}</span>
                    <span className="category-amount">{category.amount}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CategoriesTable