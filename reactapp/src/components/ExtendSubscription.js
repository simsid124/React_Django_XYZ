import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExtendSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/subscriptions/')
      .then(response => setSubscriptions(response.data))
      .catch(error => console.error('Error fetching subscriptions:', error));
  }, []);

  const handleChange = (e) => {
    setSelectedSubscription(e.target.value);
  };

  const handleDateChange = (e) => {
    setNewEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSubscription && newEndDate) {
      axios.get(`http://127.0.0.1:8000/api/subscriptions/extend/${selectedSubscription}/`, {
        params: { end_date: newEndDate }
      })
      .then(response => setMessage('Subscription extended successfully!'))
      .catch(error => setMessage('Error extending subscription.'));
    } else {
      setMessage('Please select a subscription and enter a new end date.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen pt-36 bg-slate-100">
      <h1 className="font-semibold text-3xl">Extend Subscription</h1>
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
        <div className="p-4 border my-2">
          <label className="mx-2 text-xl">New End Date:</label>
          <input type="date" onChange={handleDateChange} value={newEndDate} />
        </div>
        <button
          className="border my-1 w-full p-3 bg-slate-400 text-gray-100 hover:bg-white hover:text-black transition-all"
          type="submit"
        >
          Extend Subscription
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ExtendSubscription;