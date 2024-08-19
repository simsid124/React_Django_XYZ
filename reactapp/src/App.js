import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddSubscription from './components/AddSubscription';
import ExtendSubscription from './components/ExtendSubscription';
import EndSubscription from './components/EndSubscription';
import RevenueReport from './components/RevenueReport';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/add-subscription" element={<AddSubscription />} />
          <Route path="/extend-subscription" element={<ExtendSubscription />} />
          <Route path="/end-subscription" element={<EndSubscription />} />
          <Route path="/revenue-report" element={<RevenueReport />} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
