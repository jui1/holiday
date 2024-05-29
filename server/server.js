

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', 
}));
app.use(bodyParser.json());


app.use('/api', enquiryRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
