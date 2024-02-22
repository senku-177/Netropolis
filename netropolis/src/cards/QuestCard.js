import { useNavigate } from 'react-router-dom';
import React from 'react';

const QuestCard = ({ quest }) => {

    const navigate = useNavigate();
    const viewDetails=()=>{
        navigate(`/QuestDetailsPage/${quest.QuestId}`);
    }
 
  // Assuming you have an image URL stored in imageURL variable
  const imageURL = 'https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/04/18/Photos/Opinion/oped2-kelE--621x414@LiveMint.jpg';

  return (
    <div className="bg-cover bg-center w-full h-64 relative rounded-lg overflow-hidden" style={{ backgroundImage: `url(${imageURL})` }}>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
        <h2 className="text-xl font-semibold mb-2">{quest.QuestName}</h2>
        <p className="text-gray-300 mb-1">State: {quest.state}</p>
        <p className="text-gray-300 mb-1">Charges: {quest.charges}</p>
        <p className="text-gray-300 mb-1">Details: {quest.details}</p> {/* Display other details here */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={viewDetails}>View Details</button>
      </div>
    </div>
  );
};

export default QuestCard;
