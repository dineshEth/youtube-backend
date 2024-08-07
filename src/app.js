import express from 'express';
import cors from 'cors'
import {conf} from './config/conf.js';
import userRouter from './router/userRouter.js';
import cookieParser from 'cookie-parser';
import videoRouter from './router/videoRouter.js';
import postRouter from './router/postRouter.js';
import subscriptionRouter from './router/subscriptionRouter.js';

const app = express();

//* cors configuraion
app.use(cors({
    origin: conf.frontend_domain,
}));

//* enable accepts json data
//* default disabled
app.use(express.json({
    limit: "100mb",
}))

//* enable accepts urlencoded data (data from url)
//* default disabled
app.use(express.urlencoded({
    limit:"100mb",
    extended:true
}));

//* configure cookieParser middleware
app.use(cookieParser());


//* register routers
app.use('/api/v1/users/',userRouter);  // http://localhost:3000/api/v1/users/
app.use('/api/v1/videos/',videoRouter); // http://localhost:3000/api/v1/videos/
app.use('/api/v1/posts/', postRouter); // http://localhost:3000/api/v1/posts/
app.use('/api/v1/subscription/', subscriptionRouter);


export default app;