import { useState } from "react";
import PopupForm from "./PopupForm"
import FormRowStandard from "./FormRowStandard"
import Button from "./Button"
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useAppContext } from '../context/appContext.js';
import GreyBoxList from "./GreyBoxList"

const initialValues = {
    name: "",
    column: "",
    columns: [],
}

function SideBar({ boards, setSelectedBoard, selectedBoard }) {

    const [values, setValues] = useState(initialValues);

    const { addBoard } = useAppContext();

    if (values && values[0]) {
        console.log(values[0]["columns"])
    }

    function handleAddBoard(e) {
        e.preventDefault();
        const { name, columns } = values;
        addBoard({ name, columns });
    }

    function addBoardColumn() {
        const { columns } = values;
        if (values["columns"].indexOf(values.column) === -1 && values.column.trim() !== "") {
            columns.push(values.column.trim());
            setValues({...values, ["columns"]: columns});
        }
    }

    function deleteAddedColumn(e) {
        const data = e.target.id.split('-');
        const { columns } = values;
        columns.splice(columns.indexOf(data[0]), 1);
        setValues({ ...values,  ["columns"]: columns})
        // console.log(data);
        // deleteReferRequest(referRequest, true);
    }

    function handleAddBoardChange(e) {
        setValues({...values, [e.target.id]: e.target.value});
    }

    return (
    <div className="col-3 text-secondary text-start border-end border-secondary p-0 fw-bold" style={{backgroundColor: "rgb(43,44,54)"}}>
        <PopupForm
            body={
            <>
                <FormRowStandard value={values.name} labelText="Name" id="name" type="text" onChange={handleAddBoardChange}/>
                <FormRowStandard value={values.column} labelText="Columns" id="column" type="text" onChange={handleAddBoardChange}/>
                <GreyBoxList list={values.columns} id={"column"} keyAtEnd={true} onClick={deleteAddedColumn} charAfterText={"x"}/>
                <Button text="+ Add New Column" id="customPosition" type="button" bootstrap="w-100 bg-white text-black mb-3" onClick={addBoardColumn} />
                <Button text="Create Board" bootstrap="w-100 bg-white text-black" onClick={handleAddBoard} data-bs-toggle="modal" data-bs-target="#addNewBoard"/>
            </>
            }
            title="Add New Board"
            id="addNewBoard"
        />
        <div className="p-3 mb-6">
            ALL BOARDS ({boards.length})
        </div>
        {boards && boards.map((board) => (
            // console.log(selectedBoard === board["name"])
            <div className="p-3" key={board["name"]} onClick={() => setSelectedBoard(board["name"])} style={{cursor: "pointer", backgroundColor: selectedBoard && selectedBoard["name"] === board["name"] ? "rgb(97,99,193)" : "initial", color: selectedBoard && selectedBoard["name"] === board["name"] ? "white" : "grey"}}>
                <SpaceDashboardIcon sx={{fontSize: 17}} /> &nbsp;
                {board["name"]}
            </div>
        ))}
        <div className="p-3" style={{color: "rgb(97,99,193", cursor: "pointer"}} data-bs-toggle="modal" data-bs-target="#addNewBoard">
            <SpaceDashboardIcon sx={{fontSize: 17}} /> &nbsp;
                + Create New Board
        </div>
    </div>
    )
}

// const boards = ["Platform Launch", "Platform Launch", "Platform Launch"]

export default SideBar