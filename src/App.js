import React, { useEffect, useState } from 'react';
import { PHOTOSHOOT_DAILY } from './api';
import './App.css';
import DataTable from './components/DataTable';


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
        const response = await PHOTOSHOOT_DAILY.daily({ params: { limit: 20}})
        setData({ entries: response.data, isFetching: false });
        console.log(JSON.stringify(response))
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
    </div>
    );

}

export default App;