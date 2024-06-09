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
        const orders = response.data;
        const orderList = document.getElementById('orderList');
    
        orderList.innerHTML = ''; // Clear existing list items before adding new ones
    
        orders.forEach((order) => {
          const listItem = document.createElement('li');
          const text = document.createElement('p');
          const deleteButton = document.createElement('button');
          text.textContent = `Customer: ${order.customerName} --- Pick up Date ${order.pickupDate}`;
      deleteButton.textContent = 'Delete';

      // Add click event listener to the delete button
      deleteButton.addEventListener('click', async () => {
        try {
          await axios.delete(`http://localhost:5000/api/orders/${order._id}`);
          fetchData(); // Re-fetch data after deletion (optional)
          console.log('Order deleted successfully!');
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      });

      listItem.appendChild(text);
      listItem.appendChild(deleteButton);
      orderList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
  }
};
      fetchData();
    });
  