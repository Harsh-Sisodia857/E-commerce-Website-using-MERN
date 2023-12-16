const express = require("express");
const app = express();
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const cloudinary = require("cloudinary")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended : true}))  
app.use(fileUpload());

dotenv.config({path : "backend/config/config.env"})
connectDatabase()
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const product = require('./routes/productRoute')
const user = require("./routes/userRoute")
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});