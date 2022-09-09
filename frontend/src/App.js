import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import PersonalInfo from './PersonalInfo/PersonalInfo';
import Visa from './components/Visa/visa';
import VisaHR from './components/Visa/visaHR';
// import Housing from './components/Housing/housing';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import OnboardingApplication from './components/OnboardingApplication/OnboardingApplication';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="main-nav"><NavBar /></nav>

        <Routes>
            {/* <Route path="personalInfo" element={<PersonalInfo />} /> */}
            <Route path="visa" element={<Visa />} />
            <Route path="visaHR" element={<VisaHR />} />
            <Route path="OnboardingApplication" element= {<OnboardingApplication />} />
            {/* <Route path="housing" element={<Housing />} /> */}
            <Route path="Login" element={<Login />} />
            <Route path="Signup" element={<Signup />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
