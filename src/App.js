import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';

function App() {

  const [transactions, setTransactions] = useState();

  const getTransactions = async () => {

    try {
      const response = await api.get('/api/v1/transactions');

      console.log(response.data);
      setTransactions(response.data);

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Layout transactions={transactions} />}>
          <Route path="/" element={<Home transactions={transactions} />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
