const express = require('express');
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authenticationroutes';
import userRouter from './routes/userroutes';
import sellerRouter from './routes/sellerroutes';
import { json } from 'body-parser';
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "https://peaceful-stonebraker-22525a.netlify.app"
  ],
  credentials: true
}

app.use(json());
app.use(epress.urlencoded({extended:false}));
app.use(cors(corsOptions));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/seller",sellerRouter);
app.listen(process.env.PORT || 5000, process.env.HOST || '::');