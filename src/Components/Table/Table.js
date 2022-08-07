import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faSortAlphaAsc, faSortAlphaDesc, faSortNumericAsc, faSortNumericDesc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from 'react-paginate';


export default props => {

    const buttonName =(buttonName, name) =>{

        let iconName = (name === 'id'|| name ==='phone')
        ? props.sortType === 'asc' 
            ? faSortNumericDesc
            : faSortNumericAsc
        : props.sortType === 'asc' 
            ? faSortAlphaDesc
            : faSortAlphaAsc

        return (
            props.orderByField === name
                ? <b>{buttonName} <FontAwesomeIcon icon={iconName} /></b> 
                : buttonName
        )
    }

    let pageCount = Math.ceil(props.currentData.length / props.itemsPerPage);

    
    const NumberOfPage = page => {
        props.handlePageClick(page.selected);
    }

    return (
    <>
        <h1>Table</h1>
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                <th>
                    <button onClick={props.onOrderBy.bind(null, 'id')}>
                        {buttonName('ID', 'id')}
                    </button>
                </th>
                <th>
                    <button onClick={props.onOrderBy.bind(null, 'firstName')}>
                        {buttonName('First Name', 'firstName')}
                    </button>
                </th>
                <th>
                    <button onClick={props.onOrderBy.bind(null, 'lastName')}>
                        {buttonName('Last Name', 'lastName')}
                    </button>
                </th>
                <th>
                    <button onClick={props.onOrderBy.bind(null, 'email')}>
                        {buttonName('Email', 'email')}
                    </button>
                </th>
                <th>
                    <button onClick={props.onOrderBy.bind(null, 'phone')}>
                        {buttonName('Phone', 'phone')}
                    </button>
                </th>
                </tr>
            </thead>
            <tbody>
                {props.selectedData.map(item => (
                    <tr key={item.id + item.phone} onClick={props.selectedPerson.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
                ))}
            </tbody>
        </table> 

        {props.currentData.length > props.itemsPerPage
        ? <ReactPaginate
        breakLabel={"..."}
        nextLabel={"next >>"}
        onPageChange={NumberOfPage}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={"<< previous"}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        disabledClassName={"disabled"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"break-me"}
        breakLinkClassName={"page-link"}
        />
        : null}
        
    </>
    )
}