import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './CategoryMultiSelect.css';

const animatedComponents = makeAnimated();

const CategoryMultiSelect = ({categories}) => {
    const options = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    return (
        <Select
            className='category-multi-select'
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
        />
    )
}

export default CategoryMultiSelect