import React from "react";

export default ({save, onChange, onKeyDown, value}) => {
    return <>
        <div>Enter static address!</div>
        <div className="form-group">
            <input type="text" placeholder="https://" value={value}
                   onChange={onChange}
                   onKeyDown={onKeyDown}
                   className="form-control"
            /></div>
        <button onClick={save} className="btn btn-primary">Сохранить</button>
    </>
}