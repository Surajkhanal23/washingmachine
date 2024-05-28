// const axios = require('axios')
const axios = window.axios || axios;

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const pickupDate = document.getElementById('pickupDate').value;

    const sendData = async () => {
        try {
            const data = {
                customerName: customerName,
                pickupDate: pickupDate
            };
            const response = await axios.post('http://localhost:5000/api/orders', data);
        
            console.log('success');
            
        } catch (error) {
            console.log('error');
        }
    };

    sendData();

    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/orders');
          console.log(response.data);
  
          const orders = response.data;
          const orderList = document.getElementById('orderList');
  
          orders.forEach((order) => {
            const listItem = document.createElement('li');
            // Access and format your order data for display
            listItem.textContent = `Customer: ${order.customerName} --- Pick up Date ${order.pickupDate}`;
  
            orderList.appendChild(listItem);
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    });
  