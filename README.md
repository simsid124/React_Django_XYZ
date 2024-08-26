This React and Django Rest Framework (DRF) web app focuses on a subscription module for XYZ Enterprises. This web application was developed as an assignment for Transformation Automations India Pvt Ltd using React for the frontend and Django Rest Framework (DRF) for the backend, with Tailwind CSS for styling. The project focuses on building a subscription module for XYZ Enterprises, a SaaS company.

Key features include adding product subscriptions, extending subscription periods, ending subscriptions, and generating revenue reports. The system ensures that no duplicate active subscriptions exist for the same customer-product combination. The assignment showcases seamless integration between React and Django.


HOW TO RUN:
for django:
1. install requirements.txt: python -m pip install -r requirements.txt
2. python manage.py runserver
for react:
1. npm i
2. npm start
![ss4](https://github.com/user-attachments/assets/92614fd3-7bd1-4bcf-880a-6687aa12783a)
![ss5](https://github.com/user-attachments/assets/14a8d6f5-5683-4f01-8e84-07782b23a505)
   
check db at
1. Customers List: localhost:8000/api/customers
![ss2](https://github.com/user-attachments/assets/1c70972a-4f4f-4b9b-b827-9ea7c7e8d401)

2. Subscriptions List: localhost:8000/api/subscriptions, localhost:8000/api/subscriptions/list
![ss1](https://github.com/user-attachments/assets/7ce0d990-57a5-48b6-b35a-df5ad92f8595)

3. Total revenue: localhost:8000/api/revenue
![ss3](https://github.com/user-attachments/assets/d30ea8a2-176b-4b4b-a294-b79f0aa36891)
