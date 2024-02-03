function PopupForm({ title, id, body }) {

    return (
        <div className="modal fade" id={ id } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content text-white modal-color-white" style={{backgroundColor: "rgb(43,44,54)"}}>
                    <div className="modal-header ps-5 pt-4">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{ title }</h1>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-5">
                        { body }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupForm;