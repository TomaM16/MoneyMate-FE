import React, { useEffect } from 'react'
import './HalfCircleProgressBar.css'

const HalfCircleProgressBar = ({percentUsed}) => {

    return (
        <div role="progressbar" aria-valuenow={percentUsed} style={{ '--value': percentUsed }}>
            <div className="progressbar-text">
                <span className="used">used</span>
                <span className="percentage">{percentUsed}%</span>
            </div>
        </div>
    )
}

export default HalfCircleProgressBar