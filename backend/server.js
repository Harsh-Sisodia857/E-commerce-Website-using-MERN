const express = require("express");
const app = express();
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
app.use(express.json());

dotenv.config({path : "backend/config/config.env"})
connectDatabase()


const product = require('./routes/productRoute')
app.use('/api/v1',product)
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});