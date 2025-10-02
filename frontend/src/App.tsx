import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Glossary from './pages/Glossary';
import Feedback from './pages/Feedback';
import Lines from './pages/Lines';
import LineDetail from './pages/LineDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function isAuthed() { return !!localStorage.getItem('token'); }

function Protected({ children }: { children: JSX.Element }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lines" element={<Lines />} />
          <Route path="/lines/:slug" element={<LineDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
