const express = require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authRouter = require('./routes/authenticationroutes');
const userRouter = require('./routes/userroutes');

const bodyParser = require('body-parser');
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
  ],
  credentials: true
}

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(cors(corsOptions));
app.use(cookieParser());
app.set('trust proxy', 1);

app.use("/auth",authRouter);
app.use("/user",userRouter);
app.listen(process.env.PORT || 5000, process.env.HOST || '::');