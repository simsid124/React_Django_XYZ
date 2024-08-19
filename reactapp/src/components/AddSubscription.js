import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubscription = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState({
    customer: '',
    product: '',
    start_date: '',
    end_date: '',
    no_of_users: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/customers/')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));

    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleChange = (e) => {
    setSubscription({ ...subscription, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/subscriptions/', subscription)
      .then(response => setMessage('Subscription added successfully!'))
      .catch(error => setMessage('Error adding subscription.'));
  };

  return (
    <div className="flex flex-col items-center w-full h-screen pt-36 bg-slate-100">
      <h1 className="font-semibold text-3xl">Add Subscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-4 border my-2">
          <label className="mx-2 text-xl">Customer:</label>
          <select
            name="customer"
            onChange={handleChange}
            value={subscription.customer}
          >
            <option value="">Select customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4 border my-2">
          <label className="mx-2 text-xl">Product:</label>
          <select
            name="product"
            onChange={handleChange}
            value={subscription.product}
          >
            <option value="">Select product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4 border my-2">
          <label className="ml-6 mr-2 text-xl">Start Date:</label>
          <input
            type="date"
            name="start_date"
            onChange={handleChange}
            value={subscription.start_date}
          />
        </div>
        <div className="p-4 border my-2">
          <label className="mx-2 text-xl">End Date:</label>
          <input
            type="date"
            name="end_date"
            onChange={handleChange}
            value={subscription.end_date}
          />
        </div>
        <div className="p-4 border my-2">
          <label className="ml-2 text-xl mr-1">No. of Users:</label>
          <input
            type="number"
            name="no_of_users"
            onChange={handleChange}
            value={subscription.no_of_users}
          />
        </div>
        <button
          className="border my-1 w-full p-3 bg-slate-400 text-gray-100 hover:bg-white hover:text-black transition-all"
          type="submit"
        >
          Add Subscription
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddSubscription;