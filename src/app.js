import express from 'express';
import cors from 'cors'
import {conf} from './config/conf.js';
import userRouter from './router/userRouter.js';
import multer from 'multer';
import path from'node:path'

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

//** config multer
//* enables file upload 
const upload = multer({
    dest:path.resolve('./public/temp'),
    limits:5*1024*1024, // filesize in bytes
})


//* register routers
app.use('/api/v1/users/',
    upload.fields([
        { name:"avatar", maxCount:1},
        { name:"coverImage", maxCount:1}
    ]),
    userRouter);  // http://localhost:3000/api/v1/users/


export default app;