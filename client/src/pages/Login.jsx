import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {successNotification,errorNotification} from '../components/Toast.jsx';
import { AuthContext } from '../../../api/Context/authContext.jsx';
import { useContext } from 'react';

const Login = () => {

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const [values,setValues] = useState({
    username:"",
    password:""
  })

  const onChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value});
  }

  const loginUser = async(e) => {
    e.preventDefault();
    try {
      // await axios.post('/api/v1/auth/login',values);
      await login(values);
      successNotification("👏You logged in! Now go pretend to be productive");
      return navigate('/')
    } catch (error) {
      return errorNotification(error.response.data.message);
    }
  }

 return (
   <div className='auth'>
     <h1>Login</h1>
     <form>
       <input required type="text" name='username' placeholder='username' onChange={(e) => onChange(e)}/>
       <input required type="password" name='password' placeholder='password' onChange={(e) => onChange(e)}/>
       <button type='submit' onClick={(e) => loginUser(e)}>Login</button>
       {/* <p>This is an error !</p> */}
       <span>Don't have an account ? <Link className='link' to='/register'>Register</Link></span>
       </form>
   </div>
 )
}


export default Login
