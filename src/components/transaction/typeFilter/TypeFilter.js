import React from 'react'
import './TypeFilter.css'

const TypeFilter = ({ handleTypeFilter, selectedType }) => {
  return (
      <div className='three-state-switch'>

        <input
          type='radio'
          name='tss'
          id='left'
          value='income'
          v-model='filter'
          checked={selectedType === 'income'}
          onChange={() => handleTypeFilter('income')}
        />
        <label for='left'>
          <span>
            <img src='icons/arrowUpIcon.svg' alt='Incomes' />
          </span>
        </label>

        <input
          type='radio'
          name='tss'
          id='center'
          value='all'
          v-model='filter' 
          checked={selectedType === 'all'}
          onChange={() => handleTypeFilter('all')}
        />
        <label for='center'>
          <span>
            <img src='icons/arrowUpDownIcon.svg' alt='All' />
          </span>
        </label>  
        
        <input
          type='radio'
          name='tss'
          id='right'
          value='expense'
          v-model='filter'
          checked={selectedType === 'expense'}
          onChange={() => handleTypeFilter('expense')}
        />
        <label for='right'>
          <span>
            <img src='icons/arrowDownIcon.svg' alt='Expenses' />
          </span>
        </label>
      </div>
  )
}

export default TypeFilter