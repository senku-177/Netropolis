import { IoTrophy } from "react-icons/io5";
import { useUser } from "../Context/UserContext";
import { useEffect, useState } from "react";
import QuestCard from "../cards/QuestCard";
function Dashboard({loggedin}){
    
    const apiurl=process.env.REACT_APP_API_URL
    
    const [user,setUser]=useState(null);
    const[Quests,setQuests]=useState([[]]);
    const[state,setState]=useState("");
    const val = JSON.parse( localStorage.getItem("user"));
   
    const [my,setMy]=useState(false);
    useEffect(()=>{
        fetchUserInfo();
    },[])
      const fetchUserInfo=async()=>{
       
        console.log(val.token);
        try{
        const response=await fetch(`${apiurl}Dashboard_getUser`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${val.token}`
              },
              
        })  
            if(response.ok){
                const data=await response.json()
                console.log(data);
                setUser(data);
                console.log(user);
                fetchAllQuests();
            }
            
        }
        catch(err){
            console.log("errr",err);
        }


        

      }
      async function fetchAllQuests(){
        
        try{
            const response=await fetch(`${apiurl}/Dashboard_quests`,{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${val.token}`
                },
            })

            if(response.ok){
                const data=await response.json()
                setQuests(data[0]);
                const resp = data[0]
                const sameStateQuests = resp.filter((quest) => quest.state === user.State);
                const otherStateQuests = resp.filter((quest) => quest.state !== user.State);
                const sortedQuests = sameStateQuests.concat(otherStateQuests);
                
                setQuests(sortedQuests);
                console.log("Sorted: ", sortedQuests);
            }
        }
        catch(err){
            console.log(err);
        }



      }
      const handleSearch=async(keyword)=>{
        try{

            const response= await fetch(`${apiurl}search?keyword=${keyword}`,{
                method:"GET"
            })
            if(response.ok){
                const data = await response.json()
                console.log(data);
                setQuests(data);
            }


            }
        catch(err){
            console.log('errro',err);
        }
      }

      const fetchQuest=async(state)=>{
        console.log("fetch",state);
        
        try{
          const response=  await fetch(`${apiurl}/Dashboard_quests`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${val.token}`
                },

                body:JSON.stringify({"State":state})


            })
            if(response.ok){
                
                const data= await response.json();
                
                console.log(data);
                setQuests(data);
            }
            else{
                console.log("kuchh to hua")
            }
        }
        catch(err){
            console.log("error found",err);
        }
      }
      const renderMyQuests=()=>{
        setMy(true);
        FetchMyQuests();
        
      }
      const renderHome=()=>{
        setMy(false)
        fetchAllQuests();
      }
      const FetchMyQuests=async()=>{
        try{
            const response=  await fetch(`${apiurl}/Dashboard_myquests`,{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${val.token}`
                }
        })
        if(response.ok){
           const data = await response.json()
           console.log(data);
            setQuests(data)
        }
    }
        catch(err){
            console.log(err);
        }
      }
    
   
    return (
        <div className="flex h-screen">
     
      <div className="bg-gray-800 text-white w-1/4 p-4">
        <h2 className="text-lg font-bold mb-4">User Information</h2>
        <div>
          <p>Name: {user?user.Name:""}</p>
          <p>Email: {user?user.email:""}</p>

        </div>
        <div className="border cursor-pointer border-gray-500 bg-gray-600 mt-5 p-2" onClick={renderHome}><p>Home</p></div>
        <div className="border cursor-pointer border-gray-500 bg-gray-600 mt-5 p-2" onClick={renderMyQuests}><p>My Quests</p></div>
      </div>

     
      <div className="flex-1 p-4">
      
        <div className="mb-4 flex gap-2">
          <input type="text" placeholder="Search quests..." className="w-full px-4 py-2 border border-gray-300 rounded-md" value={state} onChange={e=>setState(e.target.value)} />
        <button className="bg-blue-400 rounded-xl text-large bolded text-white w-[150px] " onClick={()=>handleSearch(state)}>Search</button>
        </div>

       
        <div className="grid grid-cols-3 gap-4">
                    {Quests.length === 0 ? (
                        <div>No quests available</div>
                        ) : (
                        Quests.map((quest) => <QuestCard key={quest.QuestId} quest={quest} />)
                    )}
          
        </div>
      </div>
    </div>

    )

}

export default Dashboard;