import { useEffect,useState } from "react";
import TaskCard from "../cards/Taskcard";
import { IoClose } from "react-icons/io5";


function QuestRegisterPage(){
    const [stateList, setStateList]=useState([]);
    const [cityData,setCityData]=useState([]);
    const [State_selected,setState_selected]=useState("");
    const [Quest,setQuest] = useState([]);
    const [QuestBackend,setQuestBackend]=useState([]);
    const [timeline, setTimeline] = useState('');
    const [itinerary, setItinerary] = useState('');
    const [charges, setCharges] = useState('');
    const [Questname,setQuestName]=useState('');

    const [details,setDetails]=useState('');
    useEffect(()=>{
        fetchStates();
    },[]);

    
    const apiurl=process.env.REACT_APP_API_URL
    
    function AddToQuest(task){
        console.log(typeof(Quest));
        setQuest((prev)=>[...prev,
            {"Name":task.TaskName,"city":task.City , "taskid":task.id}]);
        setQuestBackend((prev)=>[...prev,task._id]);
        console.log("Quest:",Quest);
        
        console.log(typeof(Quest));


    }

    const createQuest=async ()=>{
        try{
            const response = await fetch(`${apiurl}QuestRegister_Quest`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({"QuestName":Questname,"tasks":{...Quest},"itinerary":itinerary,"charges":charges,"details":details,"length":timeline,"state":State_selected})
            })
            if(response.ok){
                console.log("Quest Registered Successfully")
            }
        }
        catch(err){
            console.log("registration failed",err);
            
        }
    }

    function deleteTask(task){
        console.log("delete called",task);
        setQuest(prev => {
            return prev.filter(item => {
              
              return item.Name != task.Name || item.city != task.city||item.id!=task.id;
            });
          });

    }
    
    function taskRender(task){
        const t1={...task}
        delete t1._id

        return t1
    }

    async function citiesFetch(state){

        setState_selected(state);
        console.log(state);
        try{
          const response=  await fetch(`${apiurl}QuestRegisterPage_cities`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({"state":state})
            })

            if(response.ok){
                const cities=await response.json()
                setCityData(cities);
                console.log("citydata:",cityData);

            }

        }
        catch(err){
            console.log("error:",err);
        }
    }

    async function fetchStates(){
        try{
            const response = await fetch(`${apiurl}QuestRegisterPage_state`,{
                methods:"GET",
                
            }) 
            const stateData = await response.json();
            setStateList(stateData);
            console.log(stateData);
        }
        catch(error){
            console.log("error",error);
        }

    }

    return (
        <div className="flex h-100v">
        <div className="w-1/5 
        bg-gray-200 p-4 h-100v flex-col">
            <h2 className="text-2xl font-bold mb-4">States List</h2>
            <div className="mt-2 p-1 flex-col h-full overflow-y-scroll px-2 mr-2">
            {   
                stateList.map((state, index) => (
                    <div key={index} className="p-1 text-white text-large font-bold cursor-pointer bg-gray-500 border-b-2 border-gray-400 mt-2" onClick={()=>citiesFetch(state)}>
                        <p>{state}</p>
                    </div>
                ))
            }
            </div>
        </div>
        <div className="w-full bg-gray-300 p-4 h-100v">
            <h2 className="text-3xl font-bold py-2">Availabe tasks in State: {State_selected}</h2>
            <p className="font-bold">*click on any task to add it to the quest</p>
            <div>
                {
                    cityData.map((cityEntry,index)=>(


                        <div className="mt-5">
                            <h2 className="text-xl font-bold uppercase"> city: {cityEntry._id}</h2>
                            <div className="flex gap-4  mt-4 mb-4">
                            {
                            
                            cityEntry.entries.map((task)=>(
                                
                                
                                <TaskCard data={taskRender(task)} AddToQuest={AddToQuest}></TaskCard>
                                
                             ))

                             }
                             </div>
                        </div>


                    ))
                }
            </div>
            
            </div>
            <div className="w-1/4 bg-gray-200 p-4 h-full">
      <h2 className="text-2xl font-bold mb-4 ">Quest Creation</h2>
      <ul>
        {Quest.map((task, index) => (
          <li key={index} className="cursor-pointer flex justify-between border border-gray-400 mt-1 bg-white text-xl font-bold text-blue-700 px-2 py-1 w-full">
            <div>
              <span>{task.Name}</span>
              <span className="text-gray-500 ml-2">{task.city}</span>
            </div>
            <div className="flex items-center">
              <IoClose className="ml-2 cursor-pointer text-gray-500" onClick={() => deleteTask(task)} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
      <div className="mb-3">
          <label htmlFor="QuestNamae" className="block text-sm font-medium text-gray-700">Quest Name</label>
          <input type="text" id="QuestName" name="QuestName" value={Questname} onChange={e => setQuestName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        
        <div className="mb-3">
          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">Timeline (days)</label>
          <input type="text" id="timeline" name="timeline" value={timeline} onChange={e => setTimeline(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-3">
          <label htmlFor="itinerary" className="block text-sm font-medium text-gray-700">Itinerary</label>
          <textarea id="itinerary" rows="7" name="itinerary" value={itinerary} onChange={e => setItinerary(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-3">
          <label htmlFor="charges" className="block text-sm font-medium text-gray-700">Charges (in rupees)</label>
          <input type="text" id="charges" name="charges" value={charges} onChange={e => setCharges(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-3">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">Additional Details </label>
          <textarea rows="9 " id="details" name="details" value={details} onChange={e => setDetails(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={createQuest}>
          Create Quest
        </button>
      </div>
    </div>
      </div>
    )



}



export default QuestRegisterPage;