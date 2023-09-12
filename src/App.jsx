import { BrowserRouter as Router,Routes,Route, } from "react-router-dom";
import Login from "./pages/login/Login";
import Reg from "./pages/reg/Reg";
import NotFound from "./pages/not-found/NotFound";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/registation" element={<Reg />} />
       
        {/* if user search unknown page name*/}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default App;