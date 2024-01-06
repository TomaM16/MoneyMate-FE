import React from 'react'
import './BudgetInfoType.css'

const BudgetInfoType = ({type}) => {
  return (
    <div style={{backgroundColor: type.backgroundColor}} className='budget-info-type-container'>
        <h3 className='name'>{type.name}</h3>
        <h4 className='amount'>{type.amount}</h4>
    </div>
  )
}

export default BudgetInfoType