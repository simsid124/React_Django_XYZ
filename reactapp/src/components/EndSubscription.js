import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EndSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/subscriptions/')
      .then(response => setSubscriptions(response.data))
      .catch(error => console.error('Error fetching subscriptions:', error));
  }, []);

  const handleChange = (e) => {
    setSelectedSubscription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSubscription) {
      setMessage('Please select a subscription.');
      return;
    }

    axios.patch(`http://127.0.0.1:8000/api/subscriptions/${selectedSubscription}/`, { end_date: new Date().toISOString().split('T')[0] })
      .then(response => setMessage('Subscription ended successfully!'))
      .catch(error => setMessage('Error ending subscription.'));
  };

  return (
    <div className="flex flex-col items-center w-full h-screen pt-36 bg-slate-100">
      <h1 className="font-semibold text-3xl">End Subscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-4 border my-2">
          <label className="mx-2 text-xl">Subscription:</label>
          <select onChange={handleChange} value={selectedSubscription}>
            <option value="">Select subscription</option>
            {subscriptions.map((subscription) => (
              <option key={subscription.id} value={subscription.id}>
                {subscription.customer} - {subscription.product}
              </option>
            ))}
          </select>
        </div>
        <button
          className="border my-1 w-full p-3 bg-slate-400 text-gray-100 hover:bg-white hover:text-black transition-all"
          type="submit"
        >
          End Subscription
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
  };

  export default EndSubscription;
