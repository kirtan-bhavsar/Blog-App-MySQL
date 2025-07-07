import {createBrowserRouter,RouterProvider,Route, Outlet} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Write from './pages/Write.jsx';
import Single from './pages/Single.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './style.scss';

const Layout = () => {
  return(
    <>
    <Navbar></Navbar>
    <Outlet/>
    <Footer></Footer>
    </>
  )
}

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout></Layout>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/post/:id',
        element:<Single></Single>
      },
      {
        path:'/write',
        element:<Write></Write>
      },
    ]
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/register',
    element:<Register></Register>
  },
]);

function App() {
  
  return (
    <div className='app'>
    <div className='container'>
    <RouterProvider router = {router}/>
   </div>  
   </div>  
  )
}

export default App
