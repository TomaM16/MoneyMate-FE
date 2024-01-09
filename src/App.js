import './App.css';
import Home from './pages/home/Home';
import Transactions from './pages/transactions/Transactions';
import Reports from './pages/reports/Reports';
import Navigation from './components/navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Terms from './pages/terms/Terms';
import Privacy from './pages/privacy/Privacy';
import CreateAccount from './pages/createAccount/CreateAccount';


function App() {
  return (
    <Router>
      <main className="content">
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path="/home" element={
            <>
              <Navigation />
              <Home />
            </>
          } />
          <Route path="/transactions" element={
            <>
              <Navigation />
              <Transactions />
            </>
          } />
          <Route path="/reports" element={
            <>
              <Navigation />
              <Reports />
            </>
          } />
          <Route path="/terms" element={
            <>
              <Navigation />
              <Terms />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <Navigation />
              <Privacy />
            </>
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
