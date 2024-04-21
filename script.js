document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const pickupDate = document.getElementById('pickupDate').value;

    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerName, pickupDate })
    })
    .then(response => response.json())
    .then(data => {
        const orderList = document.getElementById('orderList');
        const listItem = document.createElement('li');
        listItem.textContent = `Order ID: ${data._id}, Customer: ${data.customerName}, Pickup Date: ${data.pickupDate}`;
        orderList.appendChild(listItem);
    })
    .catch(error => console.error('Error:', error));
});
