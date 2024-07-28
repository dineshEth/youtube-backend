import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";


const videoRouter = Router();

// * secure routes





export default videoRouter