import React, { useState } from 'react';
import { useUser } from '../Context/UserContext';

import { useNavigate } from 'react-router-dom';
const Login = ({setLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();
  const apiurl=process.env.REACT_APP_API_URL
  const user =useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const LoginHandler=async(e)=>{
    e.preventDefault();
    console.log(apiurl)

    try{
        const response = await fetch(`${apiurl}login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": username, "password": password })
          });
        console.log(response);
        if(response.ok){
            const body =await response.json()
            localStorage.setItem("user",JSON.stringify(body));
            console.log("login success",body);
            setLogin(true);
            user.loginUser(body);

            navigate("/")

        }
        else{
            console.log("login failed",response);
        }
    }

    catch(err){
        console.log("error: ",err);

    }
  }

  function taskRegister(){
    navigate("/TaskRegister")
  }
  function RegisterHandler(){
    navigate("/register");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
               
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
             
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
            <div className='flex justify-end px-2'>
                <p className='justify-end text-blue-800 text-large -mt-5 cursor-pointer ' onClick={RegisterHandler}>Don't have an account? Sign up</p>
            </div>
        

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={LoginHandler}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      
      <button className="bg-blue-500 text-white text-xl p-2 m-5 absolute top-10 right-10 rounded"onClick={taskRegister}>Task Register</button> 
    </div>
  );
};

export default Login;
