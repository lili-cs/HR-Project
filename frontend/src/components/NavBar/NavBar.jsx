import './NavBar.css'
import React from 'react';
import {NavLink} from 'react-router-dom';

class NavBar extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {};
        // this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        // this.fetch();
    }

    fetch() {
        //
    }

    render() {
        return (
            <nav className="main-nav">
                <div className="nav-left">
                    <NavLink to="PersonalInfo">Personal Information</NavLink>
                    <NavLink to="visa">Visa Status Management</NavLink>
                    <NavLink to="visaHR">Visa-HR</NavLink>
                    <NavLink to="housing">Housing</NavLink>
                    <NavLink to="OnboardingApplication">Onboarding Application</NavLink> 
                </div>
                <div className="nav-button-logout">
                    <NavLink to="Login">Login</NavLink>
                    <NavLink to="Signup">Signup</NavLink>
                    <NavLink to="logout">Logout</NavLink>
                </div>
            </nav>    
        );
    }
}

export default NavBar;