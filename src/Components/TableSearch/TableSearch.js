import React, {useState}from "react";

export default props => {
    const [value, setValue] = useState('');

    const onChangeHandler = (event) => {
        setValue(event.target.value);
    }
    
    
    return (
        <div className="input-group mb-3 mt-5">
            <div className="input-group-append">
                <input type="text" className="form-control"  value={value} onChange={onChangeHandler}/>
                <button className="btn btn-outline-success" onClick={()=> props.onSearchData(value)}>Search</button>
            </div>
        </div>
    )
}