

function FormRowSelect({ list, value, id, onChange, labelText, htmlFor, itemValue, itemKey, itemText }) {
  return (
    <div className="mb-3">
      {/* <label htmlFor={htmlFor} className="form-label">{ labelText }</label> */}
      <p className="text-start">{labelText}</p>
      <select className="form-select text-white" value={value} aria-label="Default select example" id={ id } onChange={ onChange } style={{backgroundColor: "rgb(43,44,54)"}}>
          {list.map(item => {
              return (
                  <option key={item} value={item}>{item}</option>
              );
          })}
      </select>
    </div>
  );
}

export default FormRowSelect;