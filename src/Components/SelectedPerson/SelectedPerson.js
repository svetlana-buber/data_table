import React from "react";

export default props => {
    return (
        <>
            <p>
                Selected user: <b>{props.personData.firstName + ' ' + props.personData.lastName}</b><br/>
                Description: <br/>
               <textarea value={props.personData.description} /><br/>
                Address: <b>{props.personData.address.streetAddress}</b><br/>
                City: <b>{props.personData.address.city}</b><br/>
                Province/state: <b>{props.personData.address.state}</b><br/>
                Zip: <b>{props.personData.address.zip}</b><br/>
            </p>
        </>
    )
}