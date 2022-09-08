import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
      super(props)
      this.state = {
        form:{
          username:"",
          password:"",
          errorMsg:"",
        }
      }
  }
  onSubmit(e) {
    e.preventDefault()
    if (!this.state.form.errorMsg){
      console.log("In Submit")
      const form = this.state.form
      console.log("form: ", form)
      const username = form.username
      const password = form.password
      console.log("username: ", username)
      console.log("password: ", password)
      // post request
      const localHost = "http://localhost:4000"
      axios.post(`${localHost}/Login`,{
        username: username,
        password:password,
      })
      // process the backend return
      .then((res)=>{
        console.log("res: ", res);
        if (res.data.errorMsg) throw new Error(res.data.errorMsg)
        else if (res.data.success){
          // on success display success message
          console.log("res.data.token: ", res.data.token)
          // set token in local storage
          localStorage.setItem("jwtToken", res.data.token)
          alert("token received")
          window.location = res.data.redirect
        }
      })
      .catch((error)=>{ // error caught
        console.log("error: ", error);
        alert(error)
      })
    }
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
          {this.state.form.errorMsg}
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
