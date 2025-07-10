import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { successNotification,errorNotification } from '../components/Toast.jsx';


const Register = () => {


 const navigate = useNavigate();


 const [values,setValues] = useState({
   username:"",
   email:"",
   password:""
 });


 const onChange = (e) => {
     setValues({...values,[e.target.name]:e.target.value});
 }


 const registerUser = async(e) => {
   e.preventDefault();
   try {
     await axios.post('/apiv1/auth/register',values);
     successNotification("🤷‍♂️ Because the world clearly needed one more blog...");
     navigate('/login');
   } catch (error) {
     errorNotification(error.response.data.message);
   }
   // console.log('register user called');
 }


 return (
    <div className='auth'>
     <h1>Register</h1>
     <form>
       <input required type="text" name='username' placeholder='username' onChange={onChange}/>
       <input required type="text" name='email' placeholder='email' onChange={onChange}/>
       <input required type="password" name='password' placeholder='password'onChange={onChange}/>
       <button type='submit' onClick={(e) => registerUser(e)}>Register</button>
       {/* <p>This is an error !</p> */}
       <span>Already have an account ? <Link className='link' to='/login'>Login</Link></span>
       </form>
   </div>
 )
}


export default Register