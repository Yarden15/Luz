// Bring in express
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
// Initialize express
const app = express();

// Connect Database
connectDB();

// Init middleware
// app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

// Define Routes
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/validations', require('./routes/validations'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/performances', require('./routes/performances'));
app.use('/api/constraints', require('./routes/constraints'));
app.use('/api/timetables', require('./routes/timeTable'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/emails', require('./routes/emails'));

// Set a Port to listen 5000 to dev and any other port that will init in ENV
const PORT = process.env.PORT || 5000;

// Listen Method
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
