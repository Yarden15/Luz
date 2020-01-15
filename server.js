// Bring in express
const express = require('express');
const connectDB = require('./config/db');
// Initialize express
const app = express();

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Memos Keeper API...' }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/performance', require('./routes/performances'));

// Set a Port to listen 5000 to dev and any other port that will init in ENV
const PORT = process.env.PORT || 5000;

// Listen Method
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
