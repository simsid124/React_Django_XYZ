This React and Django Rest Framework (DRF) web app focuses on a subscription module for XYZ Enterprises. This web application was developed as an assignment for Transformation Automations India Pvt Ltd using React for the frontend and Django Rest Framework (DRF) for the backend, with Tailwind CSS for styling. The project focuses on building a subscription module for XYZ Enterprises, a SaaS company.

Key features include adding product subscriptions, extending subscription periods, ending subscriptions, and generating revenue reports. The system ensures that no duplicate active subscriptions exist for the same customer-product combination. The assignment showcases seamless integration between React and Django.


HOW TO RUN:
for django:
1. install requirements.txt: python -m pip install -r requirements.txt
2. python manage.py runserver
for react:
1. npm i
2. npm start
   
check db at
1. Customers List: localhost:8000/api/customers
2. Subscriptions List: localhost:8000/api/subscriptions, localhost:8000/api/subscriptions/list
3. Total revenue: localhost:8000/api/revenue
