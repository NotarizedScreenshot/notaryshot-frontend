import React from "react";

export default ({save, onChange, onKeyDown, value}) => {
    return <>
        <div className="form-group">
            <input type="text" placeholder="https://" value={value}
                   onChange={onChange}
                   onKeyDown={onKeyDown}
                   className="form-control"
            /></div>
        <div className="text-center">
            <button onClick={save} className="btn btn-primary">Send</button>
        </div>
    </>
}