import express from 'express';
import cors from 'cors'
import {conf} from './config/conf.js';

const app = express();

//* cors configuraion
app.use(cors({
    origin: conf.frontend_domain,
    // credentials: true,
}));




export default app;