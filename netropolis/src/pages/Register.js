import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Register = ({setLogin}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [city,setCity]=useState('');
  const [dob,setDob]=useState(null);
  const [state,setState]=useState("");
  const [role, setRole] = useState('user');
  
    const toggleRole = () => {
      // Toggle between 'user' and 'manager' roles
      setRole(prevRole => (prevRole === 'user' ? 'manager' : 'user'));
    };

  const navigate= useNavigate();
  function calculateAge(dob){
    const today= new Date();
    const birth= new Date(dob);
    let age= today.getFullYear() - birth.getFullYear();

    return age;
  }

  
  const apiurl=process.env.REACT_APP_API_URL

  function Agehandler(e){
    // console.log(e);
    
    setDob(e);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      setRegistrationError('Passwords do not match');
      return;
    }
    if(!password){
      return
    }
    const age= calculateAge(dob);
    console.log(role);
    try {
      const response = await fetch(`${apiurl}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name":name, "email":email, "password":password,"age":age,"city":city,"state":state , "role":role})
      });

      if (response.ok) {
        console.log('Registration successful');
        setLogin(true);
        navigate("/login")
      } else {
        const errorData = await response.json();
        setRegistrationError(errorData.error);
        console.log(response);
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
          <div className="flex items-center mb-4">
        <label className="mr-2 cursor-pointer">
          <input
            type="radio"
            value="user"
            checked={role === 'user'}
            onChange={toggleRole}
            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <span className="ml-1">User</span>
        </label>
        <label className="mr-2 cursor-pointer">
          <input
            type="radio"
            value="manager"
            checked={role === 'manager'}
            onChange={toggleRole}
            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <span className="ml-1">Manager</span>
        </label>
      </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className='flex'>
              <div>
                <DatePicker
                  id="age"
                  selected={dob}
                  placeholder='Date of Birth'
                  requiered
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholderText="Date of Birth"
                  dateFormat="dd/MM/yyyy"
                  onChange={Agehandler}
                  showYearDropdown
                  scrollableYearDropdown 
                  yearDropdownItemNumber={100}
                
                >
                </DatePicker>
              </div>
              <label htmlFor="city" className="sr-only">
                City
              </label>
              <input
              
              name="city"
              type="text"
              requiered
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="City"
              value={city}
              onChange={(e)=>{setCity(e.target.value)}}
              >
              </input>

            </div>

            <div>
              <label htmlFor="state" className="sr-only">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            
          </div>

          {registrationError && (
            <div className="text-red-500 text-sm">{registrationError}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
