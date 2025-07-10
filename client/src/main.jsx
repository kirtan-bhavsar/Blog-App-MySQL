import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import './style.scss';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '../../api/Context/authContext.jsx';


createRoot(document.getElementById('root')).render(
 <StrictMode>
  <AuthContextProvider>
   <App />
   <ToastContainer></ToastContainer>
   </AuthContextProvider>
 </StrictMode>,
)





