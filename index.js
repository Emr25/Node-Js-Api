const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const bodyParser = require('body-parser')
const productRouter = require("./routers/productRouter")
const cookieParser = require("cookie-parser")
const authRouter = require("./routers/authRouter")

const app = express();
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db ="mongodb+srv://emrecan:emre123@cluster0.t22gd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(db)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
  

 app.use(express.json()); // JSON verisini parse eder
 app.use(express.urlencoded({ extended: true })); // Form verisi için


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/product",productRouter)
app.use("/account",authRouter)
