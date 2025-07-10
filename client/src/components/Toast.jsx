import React from "react";
import { toast, Slide } from "react-toastify";


const errorNotification = (message) => {
 toast.error(message, {
   position: "top-right",
   autoClose: 1500,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Slide,
 });
};


const successNotification = (message) => {
 toast.success(message, {
   position: "top-right",
   autoClose: 1500,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Slide,
 });
};


export { errorNotification, successNotification };



