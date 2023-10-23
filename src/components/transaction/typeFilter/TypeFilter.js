import React from 'react'
import './TypeFilter.css'

const TypeFilter = ({ handleTypeFilter, selectedType }) => {
  return (
      <div className='three-state-switch'>

        <input
          type='radio'
          name='tss'
          id='left'
          v-model='filter'
          checked={selectedType === 'INCOME'}
          onChange={() => handleTypeFilter('INCOME')}
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
          v-model='filter'
          checked={selectedType === 'EXPENSE'}
          onChange={() => handleTypeFilter('EXPENSE')}
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