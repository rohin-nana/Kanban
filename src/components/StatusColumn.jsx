import Task from "./Task";
import CircleIcon from '@mui/icons-material/Circle';

function StatusColumn({ setSelectedTask, selectedBoard, column, statuses, color }) {

  return (
    <div className="col-3 fw-bold">
      <div className="text-secondary text-start">
        <CircleIcon sx={{fontSize: 17}} style={{color: color}} /> &nbsp;
        {column["name"]} ({column["tasks"].length})
      </div>
      <div className={`${column["tasks"].length === 0 ? "border border-secondary rounded h-75 mt-3" : ""}`}>
        {column["tasks"].map((task) => (
          <Task key={task["title"]} task={task} setSelectedTask={setSelectedTask} status={column["name"]}/>
        ))}
      </div>
    </div>
  )
}

export default StatusColumn