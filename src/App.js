import './App.css';
import Home from './pages/home/Home';
import Transactions from './pages/transactions/Transactions';
import Reports from './pages/reports/Reports';
import Navigation from './components/navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <main className="content">
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
