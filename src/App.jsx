import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import Vision from "./pages/Vision";
import Explore from "./pages/Explore";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Vision" element={<Vision />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;