import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import PersonalInfo from './PersonalInfo/PersonalInfo';
import Visa from './components/Visa/visa';
// import Housing from './components/Housing/housing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="main-nav"><NavBar /></nav>

        <Routes>
            {/* <Route path="personalInfo" element={<PersonalInfo />} /> */}
            <Route path="visa" element={<Visa />} />
            {/* <Route path="housing" element={<Housing />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
