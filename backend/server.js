const express = require("express");
const app = express();
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
    
app.use(express.json());

dotenv.config({path : "backend/config/config.env"})
connectDatabase()

app.use(cookieParser())

const product = require('./routes/productRoute')
const user = require("./routes/userRoute")
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});