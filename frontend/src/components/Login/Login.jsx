import React, { useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const formReducer = (state, event) => {
  return {
      ...state,
      [event.name]: event.value
  }
};

function Login() {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useReducer(formReducer, {});


  const handleTextChange = event => {
    setFormData({
        name: event.target.name,
        value: event.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault()
      // post request
    const localHost = "http://localhost:4000"
    try{
      const res = await axios.post(`${localHost}/login`,{
        username: formData.userName,
        password: formData.password
      });

      localStorage.setItem("jwtToken", res.data.token);

      if(res.data.isHR){
        navigate('/HiringManagement');
      }
      else if(res.data.applicationStatus === 'Approved'){
        navigate('/home');
      }
      else{
        if(res.data.applicationStatus === 'NeverSubmitted'){
          return navigate(`/OnboardingApplication/NeverSubmitted/${formData.userName}`);
        }
        if (res.data.applicationStatus === 'Pending'){
          return navigate(`/OnboardingApplication/Pending/${formData.userName}`);
        }
        if (res.data.applicationStatus === 'Rejected')
        {
            navigate(`/OnboardingApplication/Rejected/${formData.userName}`);
        }
      }
    }
    catch(err){
      console.log(err);
    }
  };

    return(
      <div className="form">
          <h2>Log In</h2>
          <form>
            <label> Username: </label>
            <input type="text" name="userName" id="userName" placeholder='Enter Your Username' onChange={handleTextChange} />
            <br />
            <label> Password: </label>
            <input type="text" name="password" id="password" placeholder='Enter Your Password' onChange={handleTextChange} />
            <br />

            <button type="button" onClick={onSubmit}>Submit</button>
          </form>
      </div> 
  )
}

export default Login;
