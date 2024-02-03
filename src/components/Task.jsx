

function Task({ task, setSelectedTask, status }) {

  return (
    <div style={{backgroundColor: "rgb(43,44,54)", cursor:"pointer"}} className="p-4 text-white rounded my-3 text-start fs-5 fw-bold" data-bs-toggle="modal" data-bs-target="#taskModal" onClick={() => setSelectedTask({...task, currentStatus: status})}>
        {task["title"]}
        <div style={{color: "rgb(109,118,133)", fontSize: "12px"}}>
          {task["completedSubtasks"].length} out of {task["subtasks"].length} subtasks
        </div>
    </div>
  )
}

export default Task