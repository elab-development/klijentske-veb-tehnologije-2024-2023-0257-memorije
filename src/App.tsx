import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Home, Login, Register, Leaderboard, Locker, Profile } from './pages';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/locker" element={<Locker />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

