import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const formReducer = (state, event) => {
  return {
      ...state,
      [event.name]: event.value
  }
};

function Signup () {
  const { token } = useParams();
  const navigate = useNavigate();

  const [ formData, setFormData ] = useReducer(formReducer, {});
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(
    () => {
        validateToken();
    },
    []
  );

  const validateToken = async () => {
    try{
      const result = await axios.get('http://localhost:4000/validate-token/' + token);
      setTokenValid(result.data);
    }
    catch(err){
      console.log(err);
    }
  };

  const handleTextChange = event => {
    setFormData({
        name: event.target.name,
        value: event.target.value
    });
  };

  // constructor(props) {
  //     super(props)
  //     this.state = {
  //       form:{
  //         email:"",
  //         username:"",
  //         password:"",
  //         errorMsg:"",
  //       },
  //       tokenValid: true
  //     }
  // }

  const onSubmit = (e) => {
    e.preventDefault()
    const body = {
      username: formData.userName,
      password: formData.password,
      email: formData.email
    };
      // post request
      const localHost = "http://localhost:4000"
      axios.post(`${localHost}/signup`, body)
      .then((res)=>{
        console.log("res: ", res);
        if (res.data.errorMsg) throw new Error(res.data.errorMsg)
        else if (res.data.success){
          // on success display success message
          alert("Register successfully");
          navigate('/Login');
        }
      })
      .catch((error)=>{ // error caught
        console.log("error: ", error);
        alert(error)
      })

  };


  if(!tokenValid){
    return (<h4>Token not valid</h4>);
  }

  return(
        <div>
            <h2>Sign Up</h2>
            <form>
              <label> Email: </label>
              <input type="text" name="email" id="email" placeholder='Enter Your Email' onChange={handleTextChange} />
              <br />
              <label> Username: </label>
              <input type="text" name="userName" id="userName" placeholder='Enter Your Username' onChange={handleTextChange} />
              <br />
              <label> Password: </label>
              <input type="text" name="password" id="password" placeholder='Enter Your Password' onChange={handleTextChange} />
              <br />
              {/* <label> productPrice</label>
              <input type="number" name="productPrice" id="productPrice" value={this.state.form.productPrice} onChange={(e) => this.productPriceChange(e)} /> */}
              <button type="button" onClick={onSubmit}>Submit</button>
            </form>
        </div>    
  );
}

export default Signup;
