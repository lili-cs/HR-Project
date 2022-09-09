import React, { Component } from 'react'
import axios from 'axios'

export default class hrprofile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
    this.fetchData = this.fetchData.bind(this)
  }

  fetchData() {
    const localHost = 'http://localhost:4000'
    axios.get(`${localHost}/personalInfoAll`).then((res) => {
      console.log('res: ', res)
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
        hr profile
        <ul>
          {this.state.data.map((value, index) => (
            <>
              <li key={index}>{value._id}</li>
              <li key={index}>
                {value.userName ? value.userName.firstName + ' ' : ''}
                {value.userName ? value.userName.lastName : ''}
              </li>
              <li key={index}>{value.userName ? value.SSN + ' ' : ''}</li>

              <li key={index}>{value.visa ? value.visa.visaType + ' ' : ''}</li>
              <li key={index}>
                {value.phone ? value.phone.cellPhone + ' ' : ''}
              </li>
              <br></br>
            </>
          ))}
        </ul>
      </div>
    )
  }
}
