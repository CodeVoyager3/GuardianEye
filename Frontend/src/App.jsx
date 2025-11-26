import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LegalPage from './pages/LegalPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="bg-[#101010] min-h-screen text-white selection:bg-[#00FFFF] selection:text-[#101010]">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
