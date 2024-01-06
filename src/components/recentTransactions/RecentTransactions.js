import React from 'react'
import './RecentTransactions.css'
import { useNavigate } from "react-router-dom";
import { formatDate, formatTime } from '../../utils/date/DateUtils';

const RecentTransactions = ({ transactions }) => {
    let navigate = useNavigate();
    const redirectToTransactions = () =>{
        navigate('/transactions');
    }
    
    return (
        <div className='recent-transactions-container'>
            <div className="categories-table-header">
                <h2 className='component-title'>Recent Transactions</h2>

                <button onClick={redirectToTransactions} className='add-category'>View all</button>
            </div>

            <table className="recent-transactions-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {transactions.map(transaction => (
                        <tr>
                            <td className='black category-cell'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yIf_k_mAR9v9rebEAu3Yf3XDmOsN6_l3s4056Ka0uGMLE_XVC26Lpk_OTIL41oYWXnw&usqp=CAU" className="category-image" />
                                {transaction.category.name}
                            </td>
                            <td className='center-align gray'>{transaction.description}</td>
                            <td className='right-align gray'>{formatDate(transaction.date)}</td>
                            <td className='center-align gray'>{formatTime(transaction.date)}</td>
                            <td className='black'>${transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecentTransactions