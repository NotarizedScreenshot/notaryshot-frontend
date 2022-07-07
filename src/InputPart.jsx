import React from "react";

export default ({save, onChange, onKeyDown, value}) => {
    return <>
        <div>Enter static address!</div>
        <input type="text" placeholder="https://" value={value}
               onChange={onChange}
               onKeyDown={onKeyDown}
        />
        <button onClick={save}>Сохранить</button>
    </>
}