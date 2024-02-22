import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { useState } from 'react';

const QuestDetailsPage = () => {

  const { questId } = useParams();
  const [quest,setQuest]=useState([]);
  const apiurl=process.env.REACT_APP_API_URL
  const val = JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    fetchQuest()
  },[])

  const joinNow=async()=>{
    console.log("called");
    try{

        const response= await fetch(`${apiurl}joinQuest?keyword=${questId}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${val.token}`
            },
        })
        if(response.ok){
            console.log(response);
        }
    }
    catch(err){
        console.log(err)
    }
  }
  async function fetchQuest(){
    console.log("questId",questId);
    try{
        const response = await fetch(`${apiurl}questId?keyword=${questId}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${val.token}`
            },


        })
        if(response.ok){
            const data = await response.json();
            console.log(data[0][0]);
            setQuest(data[0][0]);
        }

        
    }
    catch(err){
        console.log(err);
    }
  }
  let images= [
    'https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/04/18/Photos/Opinion/oped2-kelE--621x414@LiveMint.jpg',
     'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/04/18/Photos/Opinion/oped2-kelE--621x414@LiveMint.jpg'

  ]
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  
   


  return (
    <div className="container bg-gray-200 mx-auto p-8">
      <div className="max-w-6xl mx-auto bg-gray-200 shadow-md rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              className="h-64 w-full object-cover cursor-pointer"
              src={image}
              alt={`Quest Image ${index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        
         <div className="p-8">
          <img className="h-64 w-full object-cover" src={selectedImage} alt="Selected Quest Image" />
        </div> 
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">{quest.QuestName}</h2>
          <p className="text-gray-700 mb-4">{quest.itinerary}</p>
          <p className="text-gray-700 mb-4">Charges: {quest.charges}</p>
          <p className="text-gray-700 mb-4">{quest.details}</p>
          <p className="text-gray-700 mb-4">Length: {quest.length} days</p>
          <p className="text-gray-700 mb-4">Tasks: {quest.state}</p>
        </div>
      </div>
      <button className='bg-blue-500 text-white text-large font-bold w-[150px] h-[50px] fixed bottom-10 right-10 rounded ' onClick={joinNow}> JOIN NOW</button>
    </div>
  );
};

export default QuestDetailsPage;
