import React, { useEffect, useState } from "react";

export default function QueryData() {
  const [backenddata, setBackenddata] = useState([]);

  async function fetchData(url) {
    const response = await fetch(url);
    const result = await response.json();
    // result.data should be as arrayBuffer type
    let base64String = btoa(
      String.fromCharCode(...new Uint8Array(result.data))
    );
    setBackenddata(base64String);
  }

  useEffect(() => {
    let url = "http://localhost:8081/"; //xampp server
    fetchData(url);
  }, []);

  return (
    <div>
      <img src={backenddata} />
    </div>
  );
}
