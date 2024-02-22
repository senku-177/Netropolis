import React, { useState } from 'react';

const QuestRegisterForm = () => {
  const [formData, setFormData] = useState({
    TaskName: '',
    PersonName: '',
    email: '',
    Details: '',
    City:'',
    State:'',
    Reward:'',
    Duration:'',
    Contact:''
  });

  const apiurl=process.env.REACT_APP_API_URL
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log( JSON.stringify(formData));

    try{
        const response= await fetch(`${apiurl}QuestRegister`,{
            method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
        })
        if(response.ok){
           
            console.log("Registered");
           

        }
        else{
            console.log("registration failed",response);
        }
    }
    catch(e){
        console.log("error",e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-8">Task Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="TaskName" className="block text-sm font-medium text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              id="TaskName"
              name="TaskName"
              value={formData.TaskName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="PersonName" className="block text-sm font-medium text-gray-700">
              Person Name
            </label>
            <input
              type="PersonName"
              id="PersonName"
              name="PersonName"
              value={formData.PersonName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="Duration" className="block text-sm font-medium text-gray-700">
             Duration
            </label>
            <input
              id="Duration"
              name="Duration"
              type="number"
              value={formData.Duration}
              onChange={handleChange}
              placeholder='Duration in Days'
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></input>
          </div>

          <div>
            <label htmlFor="Reward" className="block text-sm font-medium text-gray-700">
             Reward
            </label>
            <input
              id="Reward"
              name="Reward"
              placeholder='Reward in Rupees'
              type="number"
              value={formData.Reward}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></input>
          </div>
        
        
          <div className='flex py-2'>
            <label htmlFor="City" className="text-sm mt-1 mr-2 font-medium text-gray-700">
             City
            </label>
            <input
              id="City"
              name="City"
              placeholder='City'
              type="Text"
              value={formData.City}
              onChange={handleChange}
              className="mt-1 flex w-full rounded-md shadow-sm sm:text-sm"
            ></input>

            
            <label htmlFor="State" className="flex mt-1 text-sm font-medium text-gray-700">
            State
            </label>
            
            <input
              id="State"
              name="State"
              placeholder='State'
              type="Text"
              value={formData.State}
              onChange={handleChange}
              className="mt-1 flex w-full mr-2 px-2 rounded-md border-gray-300 shadow-sm sm:text-sm"
            ></input>
          </div>

          <div>
            <label htmlFor="Details" className="block text-sm font-medium text-gray-700">
             Additional Details
            </label>
            <textarea
              id="Details"
              name="Details"
              placeholder='Details'
              rows="4"
              value={formData.Details}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div className='py-2'>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
             Contact
            </label>
            <input
              id="contact"
              name="Contact"
              placeholder='Reward in Rupees'
              type="number"
              value={formData.Contact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></input>
          </div>
        

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestRegisterForm;
