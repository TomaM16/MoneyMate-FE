import React, { useState, useEffect } from 'react'
import api from '../../../api/axiosConfig';
import './BudgetInfo.css'
import BudgetInfoType from '../budgetInfoType/BudgetInfoType'
import '../budgetInfoType/BudgetInfoType.css'
import HalfCircleProgressBar from '../../progressBar/halfCircle/HalfCircleProgressBar'
import BudgetService from '../../../services/budget/budget.service';

const BudgetInfo = () => {
    const [budget, setBudget] = useState([]);

    useEffect(() => {
        getBudget();
    }, []);

    const getBudget = async () => {
        try {
            const budgetData = await BudgetService.getBudget();
            console.log(budgetData);
            setBudget(budgetData);
        } catch (error) {
            console.log("Error fetching budget: " + error);
        }
    };

    const balance = {
        name: 'Balance',
        amount: budget.balance,
        backgroundColor: '#FDF183'
    }

    const income = {
        name: 'Income',
        amount: budget.income,
        backgroundColor: '#ADE7B2'
    }

    const expenses = {
        name: 'Expenses',
        amount: budget.expenses,
        backgroundColor: '#D1B9EC'
    }

    return (
        <div className='budget-container'>
            <h2 className='component-title'>Budget</h2>

            <div className='budget-info-indicators'>
                <div className='budget-usage'>
                    <HalfCircleProgressBar percentUsed={budget.used}/>
                </div>

                <div className="budget-info-types">
                    <BudgetInfoType type={balance} />
                    <BudgetInfoType type={income} />
                    <BudgetInfoType type={expenses} />
                </div>
            </div>
            
        </div>
    )
}

export default BudgetInfo