import React, { Component } from "react";
import axios from "axios";

let EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Signup extends Component {
  constructor(props) {
      super(props)
      this.state = {
        form:{
          email:"",
          username:"",
          password:"",
          errorMsg:"",
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
    const email = form.email
    console.log("email: ", email)
    console.log("username: ", username)
    console.log("password: ", password)
    // check email format
    if (this.state.form.errorMsg === "Invalid Email"){
      alert("Email invalid")
    }
    // post request
    axios("/Signup",{
      method: "post",
      headers:{'Content-Type': 'application/json'},
      body:{
        username: username,
        password:password,
        email:email,
      }
    }
    .then((res)=>res.json())
    .then((res)=>{
      alert (res)
    })
    .catch((error)=>{
      console.log(error)
      alert(error)
    })
    )


  }
  emailOnChange(e) {
    let oldForm = this.state.form
    oldForm.email = e.target.value
    console.log("oldForm: ", oldForm)

    // email validation
    if (EMAIL_VALIDATION.test(oldForm.email)){
      // validation successful
      oldForm.errorMsg = ""
      this.setState({
        form: oldForm
      })
    }else{
      // validation UN-successful
      oldForm.errorMsg = "Invalid Email"
      this.setState({form:oldForm})
    }
  }
  usernameOnChange(e) {
    let oldForm = this.state.form
    oldForm.username = e.target.value
    console.log("oldForm: ", oldForm)
    this.setState({
      form: oldForm
    })
  }
  passwordOnChange(e) {
      let oldForm = this.state.form
      oldForm.password = e.target.value
      console.log("oldForm: ", oldForm)
      this.setState({
        form: oldForm
      })
  }

  render() {
    return(
      <div>
          <div className="form">
            <h2>Sign up</h2>
            {this.state.form.errorMsg}
            <form>
              <label> Email: </label>
              <input type="text" name="email" id="email" placeholder='Enter Your Email' onChange={(e) => this.emailOnChange(e)} />
              <br />
              <label> Username: </label>
              <input type="text" name="userName" id="userName" placeholder='Enter Your Username' onChange={(e) => this.usernameOnChange(e)} />
              <br />
              <label> Password: </label>
              <input type="text" name="password" id="password" placeholder='Enter Your Password' onChange={(e) => this.passwordOnChange(e)} />
              <br />
              {/* <label> productPrice</label>
              <input type="number" name="productPrice" id="productPrice" value={this.state.form.productPrice} onChange={(e) => this.productPriceChange(e)} /> */}
              <button type="button" onClick={(e) => this.onSubmit(e)}>Submit</button>
            </form>
        </div>
      </div>
    );
  }
}

export default Signup;
