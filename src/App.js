/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';

class App extends React.Component {
  /*
  the state and country is initally set to 0 so that the page will render nothing the frist time and it is waiting for the data from the JSON object.
  */
  state = {
    data: {},
    country: '',
  }
  
  /*
  The purpose of this "componentDidMount" is to fetch a single resource when the component mounts meaning fetch the data from the JSON object.
  This will set the state from empty when the page first renders to the JSON object data once the component mounts. 
  */
  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    /*
    Once the data has been fetched, it is passed into the child components using props and the child componets render indiviudally. 
    */

    return (
      <div className={styles.container}>
        <h1>Corona Virus</h1>
        <h2>Implemented by <a href="https://www.linkedin.com/in/ciankeeney/">Cian Keeney</a></h2>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> 
        <Cards data={data} />
      </div>
    );
  }
}

export default App;