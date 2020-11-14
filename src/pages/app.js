import React, { useState } from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { useQuery } from 'react-query'

export default function App() {
    return (
        <div>
            <Exchange />
                <ReactQueryDevtools initialIsOpen={false} /> 
        </div>
    )
}

const fetchExchange = async (table) => {
    // const response = await fetch(`https://api.ratesapi.io/api/latest?base=${currency}`);
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${table}?api_key=${process.env.AIRTABLE_API_KEY}`)
    const data = await response.json();
    console.log(data);
    return data;
}

function Exchange(){
    const [table, setTable] = useState("allRecord")
    // const [currency, setCurrency] = useState("SGD");
    const {status, data, error} = useQuery(table, fetchExchange, {refetchOnWindowFocus : false});
    if(status === "loading"){
        return <div>loading . . .</div>
    }
    if(status === "error"){
    return <div>cant get the data. . .{error}</div>
    }
    return (
      <div>
          <button onClick={() => setTable("allRecord")}>Semua Data</button>
          <button onClick={() => setTable("testData")}>Test Data</button>
          <button onClick={() => setTable("Kabupaten")}>Kabupaten</button>
    <h1>Showing currency {table}</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
    )
  }
