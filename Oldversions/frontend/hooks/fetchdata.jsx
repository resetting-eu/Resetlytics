import * as React from 'react';
import { useContext, useState } from 'react';

const options = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("access") // mudar onde está?
  }
}
export default function fetchData(endPoint, setDict) {
    /// console.log("======= CALL Fetch ======", endPoint, options)
    if (endPoint.length>0) {
      React.useEffect(() => {
        fetch(endPoint, options)
          .then(response => response.json())
          .then(data => {
            var result = JSON.parse(JSON.stringify(data))
            setDict(result)
          })
      }, [])
    }
  }

/*

*/