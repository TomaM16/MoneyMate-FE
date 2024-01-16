import React from 'react';
import "./TransactionSearchBar.css";

const TransactionSearchBar = ({ handleSearch }) => {
  return (
    <div className="search-box">
        <form name="search">
            <input
                type="text"
                className="search-input"
                name="txt"
                onChange={(e) => handleSearch(e.target.value)}
            />
        </form>
        <img src="icons/searchIcon.svg" alt="Search" />
    </div>
  );
};

export default TransactionSearchBar;