import React, { useEffect, useState } from 'react';
import { PHOTOSHOOT_DAILY } from './api';
import './App.css';
import DataTable from './components/DataTable';


function App() {
  const [data, setData] = useState({ entries: [], isFetching: false });

  // assuming fixed cols numbers
  const weekCols = [
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
        const response = await PHOTOSHOOT_DAILY.daily({ params: { limit: 20 } })
        setData({ entries: response.data, isFetching: false }) //async
        console.log('xxx', JSON.stringify(response.data))
      } catch (e) {
        console.log(e);
        setData({ entries: data.entries, isFetching: false });
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="App">
      <DataTable cols={weekCols} rows={data.entries} />
    </div>
  );
}

export default App;