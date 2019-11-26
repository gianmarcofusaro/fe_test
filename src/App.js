import React, { useState, useEffect } from 'react';
import './App.css';
import DataTable from './components/DataTable';
import { PHOTOSHOOT_DAILY } from './api';


function App() {
  const [data, setData] = useState({entries: [], isFetching: false});

  const week = [
    '',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ];


  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setData({ entries: data.entries, isFetching: true });
        const response = await PHOTOSHOOT_DAILY.daily({ params: { limit: 100}})
        setData({ entries: response.data, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ entries: data.entries, isFetching: false });
      }
    };  
    fetchEntries();
  }, []);

  
    return (
      <div className="App">
        <div>Fetching: {JSON.stringify(data.isFetching)}</div>
        <DataTable cols={week} rows={data.entries} />
        <p>CLICK ON CELL TO SHOW THE LIST OF CLIENTS</p>
    </div>
    );

}

export default App;