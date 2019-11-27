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
        setTimeout(() => { setData({ entries: response.data, isFetching: false }) }, 3000); //simulate bad connection
        // setData({ entries: response.data, isFetching: false }) //async
      } catch (e) {
        console.log(e);
        setData({ entries: data.entries, isFetching: false });
      }
    };  
    fetchEntries();
  }, []);

  
    return (
      <div className="App">
        <DataTable cols={week} rows={data.entries} />
        <div className={data.isFetching ? "dev_banner wait" : "dev_banner ready"} >Fetching: {JSON.stringify(data.isFetching)}</div>
    </div>
    );

}

export default App;