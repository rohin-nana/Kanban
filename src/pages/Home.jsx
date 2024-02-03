import { useState, useEffect } from "react";
import StatusColumn from "../components/StatusColumn";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import { useAppContext } from '../context/appContext.js';
import CircleIcon from '@mui/icons-material/Circle';
import PopupForm from "../components/PopupForm";
import Button from "../components/Button";
import GreyBoxList from "../components/GreyBoxList";
import FormRowStandard from "../components/FormRowStandard";
import FormRowSelect from "../components/FormRowSelect";

const initialValues = {
    "boards": [],

    "column": "",
    "addedColumns": []
}

const initialTask = {
  "title": "",
  "description": "",
  "subtasks": [],
  "completedSubtasks": [],
  "currentStatus": "",
}

function Home() {

  const { user, addColumns, updateTask } = useAppContext();
  const [values, setValues] = useState(initialValues);
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const [selectedBoard, setSelectedBoard] = useState(null);

  // useEffect(() => {
  //   // if (id === user._id) {
  //   //   loadCurrentUser(true);
  //   // } else {
  //   //   loadSelectedUser(id);
  //   // }

  //   getUser();
  //   // eslint-disable-next-line
  // }, []);
  // console.log(user[0]["subtasks"])
  // console.log(values["boards"])

  useEffect(() => {
    setValues({...user, column: "", addedColumns: []});
  }, [user]);

  console.log(values);

  if (user === null || values === null || values === null || values["boards"] === null) {
    return <Loading center={true} />
  }

  function handleTaskChange(e) {
    setSelectedTask({...selectedTask, [e.target.id]: e.target.value});
  }

  function handleSelectSubtask(e) {
    const data = e.target.id.split('-');
    const { completedSubtasks } = selectedTask;
    let newSubtasks = [];

    if (completedSubtasks.includes(data[1])) {
      newSubtasks = completedSubtasks.filter(x => x !== data[1])
    } else {
      completedSubtasks.push(data[1])
      newSubtasks = completedSubtasks;
    }
    console.log(newSubtasks, completedSubtasks, data[1])
    setSelectedTask({...selectedTask, "completedSubtasks": newSubtasks})
  }
  
  function handleTaskChangeSubmit(e) {
    const { completedSubtasks, currentStatus, title } = selectedTask;
    if (currentStatus && selectedBoard) {
      updateTask({completedSubtasks, currentStatus, title, boardName: selectedBoard});
    }
  }

  function handleChangeAddColumn(e) {
    setValues({...values, [e.target.id]: e.target.value});
  }

  function handleAddColumn() {
    const { addedColumns, column } = values;
    if (addedColumns.includes(column) === false && column !== "") {
      addedColumns.push(column.trim());
      setValues({...values, "addedColumns": addedColumns});
    }
  }
  function handleEditAddColumn(e) {
    const data = e.target.id.split('-');
    const { addedColumns } = values;
    addedColumns.splice(addedColumns.indexOf(data[1]), 1);
    setValues({ ...values,  "addedColumns": addedColumns})
  }

  function handleAddColumnSubmit() {
    const { addedColumns } = values;
    addColumns({ addedColumns, boardName: selectedBoard });
  }


  return (
    <div style={{ height: "100vh" }}>
      
      {/* Add Column Modal */}
      <PopupForm
        body={
        <div className="text-start">
          {/* <FormRowStandard value={values.boardName} labelText="Name" id="boardName" type="text" onChange={handleEditBoard}/> */}
          <FormRowStandard value={values.addColumn} labelText="Columns" id="column" type="text" onChange={handleChangeAddColumn}/>
          <GreyBoxList list={values.addedColumns || []} id={"subtask-"} keyAtEnd={true} charAfterText={"x"} onClick={handleEditAddColumn}/>
          <Button text="+ Add New Column" id="customPosition" type="button" bootstrap="w-100 bg-white text-black mb-3" onClick={handleAddColumn}/>
          <Button text="Save Changes" type="button" bootstrap="w-100 bg-white text-black" onClick={handleAddColumnSubmit}/>
        </div>
        }
        title="Add New Column"
        id="addColumn"
      />

      {/* Select Task Modal */}
      {selectedBoard && values["boards"].find(x => x.name === selectedBoard) && <PopupForm
        body={
        <>
          <div className="text-secondary text-start" style={{ fontSize: "15px" }}>{selectedTask["description"]}</div>
          <br />

          <div className="text-start" style={{ fontSize: "12px" }}>Subtasks (0 out of {selectedTask["subtasks"].length})</div>
          {selectedTask["subtasks"].map((subtask) => (
            <div key={subtask}>
              <div className="text-start p-2 my-2 rounded" style={{backgroundColor: "rgb(32,33,43)"}}>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id={`subtask-${subtask}`} onChange={handleSelectSubtask} checked={selectedTask["completedSubtasks"].includes(subtask) ? true : false}/>
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    {subtask}
                  </label>
                </div>
              </div>
            </div>
          ))}
          <br />
          <FormRowSelect list={values["boards"].find(x => x.name === selectedBoard)["columns"].map(x => x.name)} value={selectedTask["currentStatus"]} labelText={"Current Status"} id={"currentStatus"} onChange={handleTaskChange}/>
          <Button text="Save Task" bootstrap="w-100 bg-white text-black" onClick={handleTaskChangeSubmit}/>
        </>
        }
        title={selectedTask["title"]}
        id={"taskModal"}
      />}

      <NavBar selectedBoard={values["boards"].find(x => x.name === selectedBoard)}/>
      <div className="text-black">{values["subtasks"]}</div>
      <div className="row justify-content-start p-0 m-0 h-100" style={{backgroundColor: "rgb(32,33,43)"}}>
          <SideBar boards={values["boards"]} selectedBoard={values["boards"].find(x => x.name === selectedBoard)} setSelectedBoard={setSelectedBoard} />
          <div className="col-9 row justify-content-start p-3 m-0 h-100">
            {values["boards"].find(x => x.name === selectedBoard) && values["boards"].find(x => x.name === selectedBoard)["columns"] &&
            values["boards"].find(x => x.name === selectedBoard)["columns"].map((column, index) => (
              <StatusColumn setSelectedTask={setSelectedTask} key={column["name"]} color={colors[index % 4]} selectedBoard={selectedBoard} column={column}/>
            ))}
            {values["boards"].find(x => x.name === selectedBoard) && <div className="col-3 fw-bold">
              <div className="text-secondary text-start">
                <CircleIcon sx={{fontSize: 17}} style={{color: "rgb(32,33,43)"}} /> &nbsp;
              </div>
              <div className={"border border-secondary rounded h-75 mt-3 text-white"} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", background:"linear-gradient(rgba(255, 255, 255, 0.062),transparent)"}} data-bs-toggle="modal" data-bs-target="#addColumn">
                  + New Column
              </div>
            </div>}
          </div>
      </div>
    </div>
  )
}

const colors = [
  "rgb(107, 194, 225)",
  "rgb(128, 118, 234)",
  "rgb(136, 222, 178)",
  "rgb(220, 166, 89)",
]

export default Home;