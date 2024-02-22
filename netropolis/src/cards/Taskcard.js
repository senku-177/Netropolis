function TaskCard({data,AddToQuest}){

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden" onClick={()=>AddToQuest(data)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Task Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">_id</p>
                <p className="font-semibold">{data._id}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-semibold">{data.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Task Name</p>
                <p className="font-semibold">{data.TaskName}</p>
              </div>
              <div>
                <p className="text-gray-600">Person Name</p>
                <p className="font-semibold">{data.PersonName}</p>
              </div>
              <div>
                <p className="text-gray-600">City</p>
                <p className="font-semibold">{data.City}</p>
              </div>
              <div>
                <p className="text-gray-600">State</p>
                <p className="font-semibold">{data.State}</p>
              </div>
              <div>
                <p className="text-gray-600">Reward</p>
                <p className="font-semibold">{data.Reward}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-semibold">{data.Duration}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact Details</p>
                <p className="font-semibold">{data.ContactDetails}</p>
              </div>
              <div>
                <p className="text-gray-600">Details</p>
                <p className="font-semibold">{data.Details}</p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default TaskCard