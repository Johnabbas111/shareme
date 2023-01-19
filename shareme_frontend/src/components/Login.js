import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';


import logowhite from '../assets/logowhite.png'
import shareVideo from '../assets/share.mp4'
import {client} from '../client'
import {useEffect} from 'react'
import {gapi} from 'gapi-script'
const clientId= "681006278465-22f9mnu5sri49ij3h14lp33s198tb5mg.apps.googleusercontent.com"
const Login = () => {
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    };
    gapi.load('client:auth2',start)
  })

  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    console.log(name,googleId,imageUrl)
    const doc = {
      _id: googleId,
      _type: 'user',
       userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
     navigate('/', { replace: true });
   });
  };





 

  return (
    <div className='relative w-full h-full'>
    <video src={shareVideo} type="video/mp4" loop controls={false} muted autoPlay className='w-full h-full object-cover'/>
    <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
       <div  className=''>
    <img src={logowhite} width="130px" alt="logo"/>
    </div>
        
       <div  className="shadow-2xl top-0 right-0 left-0 bottom-0  bg-blackOverlay ">
       <GoogleLogin 
        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    
          
      
    </div>

    </div>
    </div>
   
  );
}

export default Login;
