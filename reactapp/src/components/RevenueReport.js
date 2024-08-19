import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RevenueReport = () => {
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/revenue/')
      .then(response => {
        setRevenue(response.data.revenue);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center w-full h-screen pt-36 bg-slate-100">
      <h1 className="font-semibold text-3xl">Total Revenue</h1>
      <p className=" text-xl">${revenue}</p>
    </div>
  );
};

export default RevenueReport;