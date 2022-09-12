import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import PersonalInfo from './PersonalInfo/PersonalInfo';
import Visa from "./components/Visa/visa";
import VisaHR from "./components/Visa/visaHR";
// import Housing from './components/Housing/housing';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import OnboardingApplicationRejected from './components/OnboardingApplication/OnboardingApplicationRejected';
import OnboardingApplicationPending from './components/OnboardingApplication/OnboardingApplicationPending';
import OnboardingApplicationNeverSubmitted from './components/OnboardingApplication/OnboardingApplicationNeverSubmitted';
import HiringManagement from './components/HiringManagement/HiringManagement';
import SingleApplicationView from './components/HiringManagement/SingleApplicationView';
import Home from './components/Home/Home';

import Hrprofile from "./components/hr/HRprofiles";
import Employee from "./components/Employee/Employee";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="main-nav">
          <NavBar />
        </nav>

        <Routes>

            {/* <Route path="personalInfo" element={<PersonalInfo />} /> */}
            <Route path="" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="visa" element={<Visa />} />
            <Route path="visaHR" element={<VisaHR />} />
            <Route path="OnboardingApplication/NeverSubmitted/:userName" element= {<OnboardingApplicationNeverSubmitted />} />
            <Route path="OnboardingApplication/Pending/:userName" element= {<OnboardingApplicationPending />} />
            <Route path="OnboardingApplication/Rejected/:userName" element= {<OnboardingApplicationRejected />} />
            <Route path="HiringManagement" element= {<HiringManagement />} />
            <Route path='SingleApplicationView/:applicationId' element = {<SingleApplicationView />} />
            {/* <Route path="housing" element={<Housing />} /> */}
            <Route path="Login" element={<Login />} />
            <Route path="signup/:token" element={<Signup />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
