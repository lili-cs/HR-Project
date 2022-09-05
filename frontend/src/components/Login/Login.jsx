
import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
      super(props)
      this.state = {
        form:{
          username:"",
          password:"",
        }
      }
  }
  onSubmit(e) {
    e.preventDefault()
    console.log("In Submit")
    const form = this.state.form
    console.log("form: ", form)
    const username = form.username
    const password = form.password
    console.log("username: ", username)
    console.log("password: ", password)
  }
  usernameOnChange(e) {
      const name = e.target.value
      let form = { ...this.state }
      form.username = name
      this.setState({
          form: form
      })
  }
  passwordOnChange(e) {
      let olfform = this.state.form
      olfform.password = e.target.value
      console.log("olfform: ", olfform)
      this.setState({
        form: olfform
      })
  }

  render() {
    return(
      <div className="form">
          <h2>Login</h2>
          <form>
            <label> Username: </label>
            <input type="text" name="userName" id="userName" placeholder='Enter Your Username' onChange={(e) => this.usernameOnChange(e)} />
            <br />
            <label> Password: </label>
            <input type="text" name="password" id="password" placeholder='Enter Your Password' onChange={(e) => this.passwordOnChange(e)} />
            <br />
            <button type="button" onClick={(e) => this.onSubmit(e)}>Submit</button>
          </form>
        </div> 
  )}
}

export default Login;
