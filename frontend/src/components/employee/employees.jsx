import React, { Component } from 'react'
import logo from './../../logo.svg'

export default class employees extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Name</h1>
          <button>Edit</button>
          <button>Cancel</button>
          <button>Save</button>
          <label>First Name</label>
          <input type="text"></input>
          <label>Middle Name</label>
          <input type="text"></input>
          <label>Last Name</label>
          <input type="text"></input>
          <label>Preferred Name</label>
          <input type="text"></input>
          <p>
            <label>Picture Profile</label>
            <img src={logo} className="App-logo" alt="logo" />
          </p>
          <p>
            <label>Email</label>
            <input type="email"></input>
          </p>
          <p>
            <label>SSN</label>
            <input type="number"></input>
            <label>Date of birth</label>
            <input type="date"></input>
            <label>gender</label>
            <input type="text"></input>
          </p>
        </div>

        <p>
          <h1>Address</h1>
          <label>Building/Apt#</label>
          <input type="text"></input>
          <label>Street Name</label>
          <input type="text"></input>
          <label>City</label>
          <input type="text"></input>
          <label>State</label>
          <input type="text"></input>
          <label>Zip</label>
          <input type="text"></input>
        </p>
        <p>
          <h1>Contact Info</h1>
          <label>Cell Phone number</label>
          <input type="text"></input>
          <label>Work Phone Number</label>
          <input type="text"></input>
        </p>
        <p>
          <h1>Employment</h1>
          <label>Visa title</label>
          <input type="text"></input>
          <label>Start date</label>
          <input type="date"></input>
          <label>End date</label>
          <input type="date"></input>
        </p>
        <div>
          <p>
            <h1>Emergency Contact</h1>
            <label>First Namw</label>
            <input type="text"></input>
            <label>Last Name</label>
            <input type="text"></input>
            <label>Middle Name</label>
            <input type="text"></input>
            <label>Phone</label>
            <input type="text"></input>
            <label>Email</label>
            <input type="text"></input>
            <label>Relationship</label>
            <input type="text"></input>
          </p>
        </div>
        <div>
          <p>
            <h1>Document</h1>
            <label>Driver's License</label>
            <label>Work Authorization</label>
          </p>
        </div>
      </div>
    )
  }
}
