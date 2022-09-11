import './NavBar.css'
import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class NavBar extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            isLogedin: false,
            isAdmin: false,
        };
        this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            if (jwtToken) {
                this.setState({
                    isLogedin: true,
                })
                const localHost = "http://localhost:4000"
                axios.post(`${localHost}/check_admin`, {
                    jwtToken: jwtToken,
                })
                .then(async res => {
                    // console.log(res.data);
                    if (res.data.admin){
                        await this.setState({
                            isAdmin: true,
                        })
                    }
                })
                .catch(err => console.log(err));
            } else {
                // alert("Please login first.")
                console.log("Please login first.")
            }
        }
        catch {
            // alert("Please login first.")
        }
    }

    render() {
        if(this.state.isLogedin){
            if(this.state.isAdmin) {
                return (
                    <nav className="main-nav">
                        <div className="nav-left">
                            <NavLink to="PersonalInfo">Personal Information</NavLink>
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
            else {
                return (
                    <nav className="main-nav">
                        <div className="nav-left">
                            <NavLink to="PersonalInfo">Personal Information</NavLink>
                            <NavLink to="visa">Visa Status Management</NavLink>
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
        else {
            return (
                <nav className="main-nav">
                    <div className="nav-left">
                    </div>
                    <div className="nav-button-logout">
                        <NavLink to="Login">Login</NavLink>
                        <NavLink to="Signup">Signup</NavLink>
                    </div>
                </nav>    
            );
        }
        
        
    }
}

export default NavBar;