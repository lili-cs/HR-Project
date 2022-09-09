import React, { Component } from 'react'
import axios from 'axios'
import logo from './../../logo.svg'

export default class employees extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
    this.fetchData = this.fetchData.bind(this)
  }

  fetchData() {
    const localHost = 'http://localhost:4000'
    axios.get(`${localHost}/personalInfo`).then((res) => {
      // console.log('res: ', res)
      this.setState({ data: res.data })
      if (res.data.errorMsg) throw new Error(res.data.errorMsg)
      else if (res.data.success) {
        // on success display success message
        alert('Register successfully')
      }
    })
  }
  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div>
        <div>
          <h1>Name</h1>
          <button>Edit</button>
          <button>Cancel</button>
          <button>Save</button>
          {this.state.data.userName ? (
            <>
              <label>First Name</label>
              <input
                type="text"
                value={this.state.data.userName.firstName}
              ></input>
              <label>Middle Name</label>
              <input
                type="text"
                value={this.state.data.userName.middleName}
              ></input>
              <label>Last Name</label>
              <input
                type="text"
                value={this.state.data.userName.lastName}
              ></input>
              <label>Preferred Name</label>
              <input
                type="text"
                value={this.state.data.userName.preferredName}
              ></input>
            </>
          ) : (
            <>
              <label>First Name</label>
              <input type="text"></input>
              <label>Middle Name</label>
              <input type="text"></input>
              <label>Last Name</label>
              <input type="text"></input>
              <label>Preferred Name</label>
              <input type="text"></input>
            </>
          )}
          <p>
            <label>Picture Profile</label>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
          </p>
          <p>
            <label>Email</label>
            <input type="email"></input>
          </p>
          <p>
            <label>SSN</label>
            <input
              type="text"
              value={this.state.data ? this.state.data.SSN : ''}
            ></input>
            <label>Date of birth</label>
            <input
              type="text"
              value={this.state.data ? this.state.data.DOB : ''}
            ></input>
            <label>gender</label>
            <input
              type="text"
              value={this.state.data ? this.state.data.gender : ''}
            ></input>
          </p>
        </div>

        <p>
          <h1>Address</h1>
          {this.state.data.address ? (
            <>
              <label>Building/Apt#</label>
              <input type="text" value={this.state.data.address.aptNum}></input>
              <label>Street Name</label>
              <input
                type="text"
                value={this.state.data.address.streetName}
              ></input>
              <label>City</label>
              <input type="text" value={this.state.data.address.city}></input>
              <label>State</label>
              <input type="text" value={this.state.data.address.state}></input>
              <label>Zip</label>
              <input type="text" value={this.state.data.address.zip}></input>
            </>
          ) : (
            <>
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
            </>
          )}
        </p>
        <p>
          <h1>Contact Info</h1>
          {this.state.data.phone ? (
            <>
              <label>Cell Phone number</label>
              <input
                type="text"
                value={this.state.data.phone.cellPhone}
              ></input>
              <label>Work Phone Number</label>
              <input
                type="text"
                value={this.state.data.phone.workPhone}
              ></input>
            </>
          ) : (
            <>
              <label>Cell Phone number</label>
              <input type="text"></input>
              <label>Work Phone Number</label>
              <input type="text"></input>
            </>
          )}
        </p>
        <p>
          <h1>Employment</h1>
          {this.state.data.visa ? (
            <>
              <label>Visa title</label>
              <input type="text" value={this.state.data.visa.visaType}></input>
              <label>Start date</label>
              <input type="text" value={this.state.data.visa.startDate}></input>
              <label>End date</label>
              <input type="text" value={this.state.data.visa.endDate}></input>
            </>
          ) : (
            <>
              <label>Visa title</label>
              <input type="text"></input>
              <label>Start date</label>
              <input type="date"></input>
              <label>End date</label>
              <input type="date"></input>
            </>
          )}
        </p>
        <div>
          <p>
            <h1>Emergency Contact</h1>
            {this.state.data.emergencyContact ? (
              <>
                <label>First Name</label>
                <input
                  type="text"
                  value={this.state.data.emergencyContact.name.firstName}
                ></input>
                <label>Last Name</label>
                <input
                  type="text"
                  value={this.state.data.emergencyContact.name.lastName}
                ></input>
                <label>Middle Name</label>
                <input
                  type="text"
                  value={this.state.data.emergencyContact.name.middleName}
                ></input>
                <label>Phone</label>
                <input
                  type="text"
                  value={this.state.data.emergencyContact.phone}
                ></input>
                <label>Email</label>
                <input
                  type="text"
                  value={this.state.data.emergencyContact.email}
                ></input>
                <label>Relationship</label>
                <input
                  type="text"
                  value={this.state.data.emergencyContact.relationship}
                ></input>
              </>
            ) : (
              <>
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
              </>
            )}
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
