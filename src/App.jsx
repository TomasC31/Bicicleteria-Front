import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';
import HomePag from './pages/HomePag';
import LoginPag from './pages/LoginPag';
import RegisterPag from './pages/RegisterPag';

export default function App() {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<HomePag />} />
        <Route path="/login" element={<LoginPag />} />
        <Route path="/register" element={<RegisterPag />} />
      </Routes>
    </Router>
  );
}
