

function FormRowStandard({ labelText, id, type, onChange, placeholder="", value}) {
    return (
      <div className="mb-3">
          {/* { labelText && <label htmlFor={ id } className="form-label text-start">{ labelText }</label>} */}
          <p className="text-start">{labelText}</p>
          <input type={ type } placeholder={placeholder} value={value} className={"form-control text-white border border-secondary"} id={ id } onChange={ onChange } style={{backgroundColor: "rgb(43,44,54)"}}/>
      </div>
    );
}
  
export default FormRowStandard;