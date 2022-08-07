import React from "react";

export default (props)=> {

    return (
        <div className="content">
            <h3>Choose which database do you want big or small:</h3>
            <button className="btn btn-outline-success" onClick={props.database.bind(null, true)}>Small database</button>
            <button className="btn btn-outline-success" onClick={props.database.bind(null, false)}>Big database</button>
        </div>
    )
}