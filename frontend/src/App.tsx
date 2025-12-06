import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="p-6 flex items-center justify-between max-w-7xl mx-auto">
          <div className="font-bold text-xl tracking-tighter text-white">
            SENTIMENT<span className="text-primary">.AI</span>
          </div>
          <div className="space-x-4">
            {/* Auth placeholders for future */}
            {/* <button className="text-sm font-medium hover:text-white text-gray-400 transition-colors">Login</button> */}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
