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

const fetchExchange = async (currency) => {
    const response = await fetch(`https://api.ratesapi.io/api/latest?base=${currency}`);
    const data = await response.json();
    console.log(data);
    return data;
}

function Exchange(){
    const [currency, setCurrency] = useState("SGD");
    const {status, data, error} = useQuery(currency, fetchExchange, {refetchOnWindowFocus : false});
    if(status === "loading"){
        return <div>loading . . .</div>
    }
    if(status === "error"){
    return <div>cant get the data. . .{error}</div>
    }
    return (
      <div>
          <button onClick={() => setCurrency("HKD")}>Hong Kong Dollar</button>
          <button onClick={() => setCurrency("USD")}>US Dollar</button>
          <button onClick={() => setCurrency("SGD")}>Singapore Dollar</button>
    <h1>Showing currency {currency}</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
    )
  }
