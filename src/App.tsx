import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Leaderboard, Locker, Profile } from "./pages";
import RequireAuth from "./lib/requireAuth";

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/locker" element={<Locker />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
