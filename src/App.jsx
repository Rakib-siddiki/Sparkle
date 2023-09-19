import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Reg from "./pages/reg/Reg";
import NotFound from "./pages/not-found/NotFound";
import Home from "./components/Home";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/registration" element={<Reg />} />
        <Route path="/home" element={<Home />} />

        {/* if user search unknown page name*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
