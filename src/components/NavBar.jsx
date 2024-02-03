import { useState, useEffect } from "react"
import PopupForm from "./PopupForm"
import FormRowStandard from "./FormRowStandard"
import FormRowSelect from "./FormRowSelect"
import Button from "./Button"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GreyBoxList from "./GreyBoxList"
import { useAppContext } from '../context/appContext.js';
import logo from "../assets/logo-light.svg"
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const initialValues = {
    boardName: "",
    changedBoardColumns: [],
    column: "",

    title: "",
    description: "",
    subtask: "",
    subtasks: [],
    status_: "",
    statuses: []
};

function NavBar({ user, selectedBoard, login=false }) {
    const [values, setValues] = useState(initialValues);
    const { addTask, editBoard, deleteBoard, logoutUser } = useAppContext();

    // console.log(values.changedBoardColumns)

    useEffect(() => {
        if (selectedBoard && selectedBoard["columns"]) {
            setValues({...initialValues, "statuses":[], "changedBoardColumns": selectedBoard["columns"].map(x => x.name), "boardName": selectedBoard["name"], "statuses": selectedBoard["columns"], "status_": selectedBoard["columns"][0] ? selectedBoard["columns"][0]["name"] : ""});
        }
    }, [selectedBoard]);

    // if (selectedBoard && selectedBoard["columns"]) {
    //     console.log(selectedBoard["columns"])
    // }

    function handleDeleteAddedSubtask(e) {
        const data = e.target.id.split('-');
        console.log(data)
        const { subtasks } = values;
        subtasks.splice(subtasks.indexOf(data[1]), 1);
        setValues({ ...values,  "subtasks": subtasks})
    }

    function handleEditAddTask(e) {
        setValues({...values, [e.target.id]: e.target.value});
    }

    function handleAddSubtask() {
        const { subtasks } = values;
        if (values["subtasks"].indexOf(values.subtask) === -1 && values.subtask.trim() !== "") {
            subtasks.push(values.subtask.trim());
            setValues({...values, "subtasks": subtasks});
        }
    }

    function handleAddTaskSubmit(e) {
        e.preventDefault();
        const { title, description, subtasks, status_ } = values;
        if (title.length === 0 || description.length === 0 || subtasks === [] || !status_) {
            return;
        }
        addTask({ title, description, subtasks, status: status_, board: selectedBoard["name"] });
    }
    
    function handleEditChangedBoardColumns(e) {
        const data = e.target.id.split('-');
        console.log(data);
        const { changedBoardColumns } = values;
        changedBoardColumns.splice(changedBoardColumns.indexOf(data[1]), 1);
        setValues({ ...values,  "changedBoardColumns": changedBoardColumns})
    }

    function handleAddChangedBoardColumn() {
        const { changedBoardColumns } = values;
        if (values["changedBoardColumns"].indexOf(values.column) === -1 && values.column.trim() !== "") {
            changedBoardColumns.push(values.column.trim());
            setValues({...values, "changedBoardColumns": changedBoardColumns});
        }
    }

    function handleEditBoard(e) {
        setValues({...values, [e.target.id]: e.target.value});
    }

    function handleEditBoardSubmit(e) {
        e.preventDefault();
        const { boardName, changedBoardColumns } = values;
        if (!boardName || !selectedBoard) {
            return;
        }
        editBoard({ changedBoardColumns, newBoardName: boardName, oldBoardName: selectedBoard["name"] });
    }

    function deleteBoardSubmit(e) {
        e.preventDefault();
        if (!selectedBoard) {
            return;
        }
        deleteBoard({ boardName: selectedBoard["name"] });
    }

  return (
    <nav className="fw-bold" style={{backgroundColor: "rgb(43,44,54)"}}>
        {/* Add New Task */}
        <PopupForm
            body={
            <div className="text-start">
                <FormRowStandard value={values.title} labelText="Title" id="title" type="text" onChange={handleEditAddTask} />
                <FormRowStandard value={values.description} labelText="Description" id="description" type="text" onChange={handleEditAddTask}/>
                <FormRowStandard value={values.subtask} labelText="Subtasks" id="subtask" type="text" onChange={handleEditAddTask}/>
                <GreyBoxList list={values.subtasks} id={"subtask-"} keyAtEnd={true} onClick={handleDeleteAddedSubtask} charAfterText={"x"}/>
                <Button text="+ Add New Subtask" id="customPosition" type="button" bootstrap="w-100 bg-white text-black mb-3" onClick={handleAddSubtask}/>
                <FormRowSelect list={values.statuses.map(x => x.name)} value={values.status_} labelText={"Status"} id={"status_"} onChange={handleEditAddTask}/>
                <Button text="Create Task" bootstrap="w-100 bg-white text-black" onClick={handleAddTaskSubmit}/>
            </div>
            }
            title="Add New Task"
            id="addNewTask"
        />

        {/* Edit Board */}
        <PopupForm
            body={
            <div className="text-start">
                <FormRowStandard value={values.boardName} labelText="Name" id="boardName" type="text" onChange={handleEditBoard}/>
                <FormRowStandard value={values.column} labelText="Columns" id="column" type="text" onChange={handleEditBoard}/>
                <GreyBoxList list={values.changedBoardColumns} id={"subtask-"} keyAtEnd={true} charAfterText={"x"} onClick={handleEditChangedBoardColumns}/>
                <Button text="+ Add New Column" id="customPosition" type="button" bootstrap="w-100 bg-white text-black mb-3" onClick={handleAddChangedBoardColumn}/>
                <Button text="Save Changes" type="button" bootstrap="w-100 bg-white text-black" onClick={handleEditBoardSubmit}/>
            </div>
            }
            title="Edit Board"
            id="editBoard"
        />
        
        {/* Delete Board */}
        <PopupForm
            body={
            <div className="text-start">
                Are you sure you want to delete this board?
                <br />
                <br />
                <Button text="Delete" bootstrap="w-100 bg-danger text-white" onClick={deleteBoardSubmit} data-bs-toggle="modal" data-bs-target="#deleteBoard"/>
            </div>
            }
            title="Edit Board"
            id="deleteBoard"
        />

        <div className="row justify-content-start text-white m-0 border-bottom border-secondary">
            <div className="col-3 fs-2 border-end border-secondary py-3">
                <img src={logo} alt="kanban" />
            </div>
            {!login && <div className="col-3 fs-3 py-4 ps-4 text-start">
                {selectedBoard ? selectedBoard["name"] : "No board selected"}
            </div>}
            {/* <Button onClick={logout} bootstrap="w-25" text="Logout" /> */}
            <div className="col-4 py-4">
                {selectedBoard && <div className="float-end rounded px-3 py-2" style={{cursor: "pointer", backgroundColor: "rgb(97,99,193)"}} data-bs-toggle="modal" data-bs-target="#addNewTask">
                    + Add New Task
                </div>}
            </div>
            <div className="col-1 py-4">
                {selectedBoard && <MoreVertIcon className="float-end" sx={{ fontSize: 40 }} style={{cursor:"pointer"}} data-bs-toggle="dropdown" aria-expanded="false" />}
                <ul className="dropdown-menu" style={{backgroundColor: "rgb(43,44,54)"}}>
                    <li><div className="dropdown-item text-white" data-bs-toggle="modal" data-bs-target="#editBoard">Edit Board</div></li>
                    <li><div className="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target="#deleteBoard">Delete Board</div></li>
                </ul>
            </div>
            <div className="col-1 py-4">
                {!login && <Button onClick={logoutUser} bootstrap="w-100" text="Logout" />}
            </div>
        </div>
    </nav>
  )
}

export default NavBar