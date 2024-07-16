import express from 'express';
import cors from 'cors'
import {conf} from './config/conf.js';
import userRouter from './router/userRouter.js';

const app = express();

//* cors configuraion
app.use(cors({
    origin: conf.frontend_domain,
    // credentials: true,
}));

//* enable accepts json data
//* default disabled
app.use(express.json({
    limit: "50kb",
}))

//* enable accepts urlencoded data (data from url)
//* default disabled
app.use(express.urlencoded({
    limit:"50kb",
    extended:true
}));


//* register routers
app.use('/api/v1/users/',userRouter);  // http://localhost:3000/api/v1/users/


export default app;