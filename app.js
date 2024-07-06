const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const dotenv=require('dotenv');
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
app.use(bodyParser.json());
app.use(itemRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log('Error connecting to MongoDB:', error);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
