// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/project');  // Create Message model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Replace this with your MongoDB Compass URI
const mongoURI = "mongodb+srv://kalyanikaruthedath:kalyani@cluster0.xlso91q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  // Local MongoDB URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API Endpoint to handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(200).json({ message: 'Message saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
 
