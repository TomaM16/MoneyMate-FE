import React, { useState, useEffect } from 'react'
import api from '../../../api/axiosConfig';
import './BudgetPlans.css'
import BudgetService from '../../../services/budget/budget.service';

const BudgetPlans = () => {
    const [budgetPlans, setBudgetPlans] = useState([]);

    useEffect(() => {
        getBudgetPlans();
    }, []);
    
    const getBudgetPlans = async () => {
        try {
            const budgetPlansData = await BudgetService.getBudgetPlans();
            setBudgetPlans(budgetPlansData);
        } catch (error) {
            console.log("Error fetching budget plans: " + error);
        }
    };

    return (
        <section>
            <table cellSpacing="0" cellPadding="0" className='budget-plans-table default-table'>
                <thead>
                    <tr>
                    <th className='budget-plans-table-name'>Budget Plans</th>
                    <th className='budget-plans-table-categories'>Categories</th>
                    <th className='budget-plans-table-amount'>Spent/Goal</th>
                    {/* <th>
                        <button onClick={openModal} className="new-category-button">
                        <span className="category-plus-sign">+</span>
                        </button>
                    </th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr key={1}>
                        <td>
                        Name <br />
                        100
                        </td>
                        <td className='budget-plans-table-categories-content'>
                            <div className='budget-plans-table-categories-content-container'>
                                Rent: <span className={-100 < 0 ? 'money-red' : 'money-green'}>-100</span> <br />
                                <hr />
                                Groceries: <span className={-300 < 0 ? 'money-red' : 'money-green'}>-300</span> <br />
                                <hr />
                                Transport: <span className={-300 < 0 ? 'money-red' : 'money-green'}>-300</span>
                            </div>
                        </td>
                        <td>
                        100 / 200
                        </td>
                        {/* <td></td> */}
                    </tr>
                    {/* {budgetPlans.map((budgetPlan, index) => (
                    <tr key={index}>
                        <td>
                        {budgetPlan.name} <br />
                        {budgetPlan.budgetPlan}
                        </td>
                        <td></td>
                    </tr>
                    ))} */}
                </tbody>
            </table>
        </section>
    )
}

export default BudgetPlans