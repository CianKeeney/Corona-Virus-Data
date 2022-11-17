import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  /*
  On first render, the useState is empty so the page will momentarily render nothing 
  and once the "setDailyData" has recieved the data, the page will render with the components and their specified data. 
  */
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  /*
  The bar chart is conditionally rendered and if there is no data avaliable from the async await function, it will render nothing or null.
  */

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['#F9A12Eff', '#FC766AFF', '#9B4A97FF'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: true },
          title: { display: true, text: `${country}` },
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {barChart}
    </div>
  );
};

export default Chart;
