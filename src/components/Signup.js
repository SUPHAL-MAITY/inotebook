import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate=useNavigate()
  const [credentials, setCredentials] = useState({ name: "",email:"", password: "",cpassword:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password})
    });
    

    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the authtoken and dredirect
      localStorage.setItem("token",json.authtoken)
      navigate("/")
      props.showAlert("Account created sucessfully","success")
    }else{
      props.showAlert("Invalid credintials","danger")

    }
   
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt2">
      <h2>Create an account to continue </h2>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <div >
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={onChange}
          />
        </div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            minLength={5} required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
