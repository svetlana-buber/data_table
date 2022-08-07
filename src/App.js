import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './Components/Loader/Loader';
import Table from './Components/Table/Table';
import _ from 'lodash';
import SelectedPerson from './Components/SelectedPerson/SelectedPerson';
import ChooseDatabase from './Components/ChooseDatabase/ChooseDatabase';
import TableSearch from './Components/TableSearch/TableSearch';

class App extends Component {

  state = {
    isLoading: false,
    data: [],
    currentData: [],
    sortType: 'asc',
    orderByField: '',
    personData: null,
    address: null,
    selectedData: '',
    itemsPerPage: 50 
  }


  database = (isSmall) => {
    const smallUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    const bigUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    let address = isSmall ? smallUrl : bigUrl
    this.setState({isLoading: true, address});
    this.databaseLoader(address);
  }

  async databaseLoader (address) {
    const response = await fetch(address);
    const data = await response.json();
    this.setState({isLoading: false, currentData: data, data})
    this.selectDataToTablePage(0, this.state.itemsPerPage, data);
 }


  onOrderBy = (orderByField) => {
    let cloneData = this.state.currentData;
    let orderedData = _.orderBy(cloneData, orderByField, this.state.sortType);
    this.setState ({
      currentData: orderedData,
      sortType: this.state.sortType === 'asc'? 'desc':'asc',
      orderByField
    })
    this.selectDataToTablePage(0, this.state.itemsPerPage, orderedData);
  } 

  selectedPerson = row => {
    this.setState({personData: row})
  }


  handlePageClick = (pageNumber) => {
    let newStartPosition  = pageNumber * this.state.itemsPerPage;
    const newEndPosition = newStartPosition + this.state.itemsPerPage;
    this.selectDataToTablePage(newStartPosition, newEndPosition)
  };

  selectDataToTablePage = (newStartPosition, newEndPosition, cloneData = this.state.currentData) => {
    let selectedData = cloneData.slice(newStartPosition, newEndPosition);
    this.setState({
      selectedData
    })
  }  

  onSearchData = (filterValue) => {
    let searchData = filterValue.toLowerCase();
    let currentData = this.state.data.filter(item => {
      return (item.id.toString().includes(searchData)
              || item.firstName.toLowerCase().includes(searchData)
              || item.lastName.toLowerCase().includes(searchData)
              || item.email.toLowerCase().includes(searchData)
              || item.phone.toString().includes(searchData))});
    this.setState({currentData})
    this.selectDataToTablePage(0, this.state.itemsPerPage, currentData);
  }

  render(){
    return (
      <div className="content">
        <ChooseDatabase database={this.database}/><br/>
        {
          this.state.isLoading
          ? <Loader /> 
          : this.state.address
            ? <React.Fragment>
                <TableSearch onSearchData = {this.onSearchData}/>
                <Table currentData = {this.state.currentData} onOrderBy = {this.onOrderBy} sortType = {this.state.sortType} orderByField = {this.state.orderByField} selectedPerson = {this.selectedPerson} itemsPerPage={this.state.itemsPerPage} selectedData={this.state.selectedData} handlePageClick={this.handlePageClick} onSearchData = {this.onSearchData}/>
              </React.Fragment>
            : null
        }
        {
          this.state.personData
          ? <SelectedPerson personData = {this.state.personData} />
          : null
        }
      </div>
    );
  }
}

export default App;
