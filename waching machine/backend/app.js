const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        //Apply CORS middleware and allow requests from all origins origin: '*',
    })

    );


// Connect to MongoDB


mongoose.connect("mongodb+srv://skhanal2051:FbdDPhiqpVnJNHTr@washingmachine.w0xcu1e.mongodb.net/?retryWrites=true&w=majority&appName=WashingMachine")

  
  .then(() => {
    app.listen(PORT, console.log('server started'));
  })
  .catch((err) => {
    console.log(err);
  });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongodb connected');
});


// Define schema for Laundry Order
const orderSchema = new mongoose.Schema({
    customerName: String,
    pickupDate: String,
    status: { type: String, default: 'pending' }
});
const Order = mongoose.model('Order', orderSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, pickupDate } = req.body;
    console.log('hi');
    console.log('HELLLOOOOOOOOO');
    const order = await Order.create ({
      customerName: customerName,
      pickupDate: pickupDate,
    });
      console.log('created');
    console.log('order');
    res.status(201).json(order);

    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(process.env.PORT, () => console.log(`Server started on port ${PORT}`));










