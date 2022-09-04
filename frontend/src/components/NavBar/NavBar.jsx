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
                    <NavLink to="housing">Housing</NavLink>
                </div>
                <div className="nav-button-logout">
                    <NavLink to="logout">Logout</NavLink>
                </div>
            </nav>    
        );
    }
}

export default NavBar;