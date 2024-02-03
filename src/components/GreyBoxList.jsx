import { useState } from 'react';

function GreyBoxList({ list, onClick, id, keyAtEnd, itemKey=null, itemText=null, charAfterText=null, selectable=false }) {

    return (
        <div>
            {list.map((item) => {
                const key = itemKey ? item[itemKey] : item;
                let newId = id
                if (keyAtEnd) {
                    newId = id + key
                }
                return <GreyBox key={newId} item={item} onClick={onClick} id={id} keyAtEnd={keyAtEnd} itemKey={itemKey} itemText={itemText} charAfterText={charAfterText} selectable={selectable} />;
                // const key = itemKey ? item[itemKey] : item;
                // const text = itemText ? item[itemText] : item;
                // let newId = id
                // if (keyAtEnd) {
                //     newId = id + key
                // }
                // const styling = `badge p-2 mb-1 border-${selected ? 2 : 0} border-black bg-body-secondary text-black me-2`;
                // return (
                //     <button onClick={handleOnClick} key={ key } type="button" id={ newId } className={styling} style={{ fontSize:"13px" }}>
                //     { text } { charAfterText && <>&nbsp;{charAfterText}</> }
                //     </button>
                // );
            })}
        </div>
    );
}

function GreyBox({item, onClick, id, keyAtEnd, itemKey=null, itemText=null, charAfterText=null, selectable=false}) {

    const [selected, setSelected] = useState(false);

    function handleOnClick(e) {
        if (selectable) {
            setSelected(!selected);
        }
        onClick(e);
    }

    const key = itemKey ? item[itemKey] : item;
    const text = itemText ? item[itemText] : item;
    let newId = id
    if (keyAtEnd) {
        newId = id + key
    }
    const styling = `badge p-2 mb-1 border-2 border-${selectable && selected ? "black" : "light"} bg-body-secondary text-black me-2`;
    return (
        <button onClick={handleOnClick} key={ key } type="button" id={ newId } className={styling} style={{ fontSize:"13px" }}>
        { text } { charAfterText && <>&nbsp;{charAfterText}</> }
        </button>
    );
}

export default GreyBoxList;