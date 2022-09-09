import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import PersonalInfo from './PersonalInfo/PersonalInfo';
import Visa from "./components/Visa/visa";
import VisaHR from "./components/Visa/visaHR";
// import Housing from './components/Housing/housing';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Hrprofile from "./components/hr/Hrprofile";
import Employees from "./components/employee/Employees";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="main-nav">
          <NavBar />
        </nav>

        <Routes>
          <Route path="personalInfo" element={<Employees />} />
          <Route path="personalInfoHr" element={<Hrprofile />} />
          <Route path="visa" element={<Visa />} />
          <Route path="visaHR" element={<VisaHR />} />
          {/* <Route path="housing" element={<Housing />} /> */}
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
