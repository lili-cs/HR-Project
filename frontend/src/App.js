import Login from './component/Login/Login';
import Signup from './component/Signup/Signup';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="nav-bar">
          <Link to="/Login"> Login </Link>
          <Link to="/Signup"> Signup </Link>
        </div>
        <Routes>
              <Route path="/">
                <Route path="Login" element={<Login />} />
                <Route path="Signup" element={<Signup />} />
              </Route>
            </Routes>
      </div>
    </Router>
  );
}

export default App;
