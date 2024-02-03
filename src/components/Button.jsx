

function Button({ text, id, type="submit", onClick, bootstrap="", ...props }) {
    return (
        <button type={type} id={id} className={`btn btn-dark ${bootstrap}`} onClick={ onClick } {...props} >{ text } </button>
    );
}
  
export default Button;