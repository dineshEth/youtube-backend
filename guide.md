# __Backend Project Guide__
### _This backend project is build in javascript programming language ( also can try in typescript only install types ). This is a complex project. thus, it is not recommended to a beginner so don't start with this complex proffesional guide project. Anyone with intermidiate javascript knowledge and backend working flow, can start with this amazing project real world project. though there is complete guide provided to build this amazing project step by step._ 

> # <center> ***ALL THE BEST*** </center>
------------

### __Tech stacks__
- Nodejs
- Expressjs
- mongoose
- MongoDB
- cors
- bcryptjs
- mongoose pipeline aggregator
- multer
- cloudinary
- Node Error
- fs module
- prettier
- git & more...

------------

### Content
1. Project setup & description
2. Add git & nodejs
3. File and Folder Structure
4. Server building
5. Database connection
6. Re-structure server { __professional approach__ }
7. API Error handling
8. API Response handling
9. Handler functions
10. Models, Routes & Controllers
    1. User Model & Middlewares
    2. Video Model & Middlewares

------------

> # <center> ***The Guide*** </center>

## Node Install
#### [Click to install latest version of node](https://www.nodejs.com) 
 `node --verison` <--- check version of node <br/>
 `npm --version` <--- check version of npm

## Project description
 #### Run command
  ` npm init ` and provide project details. <br/> *Set indexjs as main entry file, __later it will be updated__*



## Add git 
` git --version ` <--- check git version <br/>
` git init `  <--- add git to project

## Install expressjs 
```jascript 
    npm install express --save
```

## Install nodemon
```jascript 
    npm install -D nodemon
```

## Package.json
#### add this configurtions to package.json file
    "type":"module"
    "scripts": {
        "dev": "nodemon index.js"
    }

## Build a server 
#### index.js
```javascript
    import express from 'express'
    //* imports express module

    //* create a app with express module
    const app = express();

    //* Port  
    const PORT = 3000

    //* listen app on PORT
    app.listen(PORT,()=>{
        console.log(`app is listening on Port: ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });

    //* export app as default
    export default app;
```
## file & folder sturcture
<div style="color:orange; background:#000; padding:2px 8px;"> 
    <span style="font-size:24px">src</span> 
    <div style="color:yellow; margin:0 24px;">
            db <br/>
            config <br/>
            api <br/>
            middleswares   <br/>
            router   <br/>
            models <br/>
            utils <br/>
            helper <br/>
            controller <br/>
    </div>
    <div style="color:blue; margin:0 24px;">
        app.js <br/>
        index.js <br/>
        server.js
    </div>
</div>



## Install dotenv
```jascript 
    npm install -D dotenv
```

configure dotenv in <span style="color:yellow">config/conf.js</span>

```javascript
    import dotenv from 'dotenv'

    //* configure dotenv and import all enviroment variables
    dotenv.config({
        path:".env"
    })

    const conf = {
        mongo_db_uri:String(process.env.MONGO_DB_URI);
        port:String(process.env.PORT);
    }

    //* freeze the object { ReadOnly Object }
    Object.freeze(conf);

    //* export app ***not as adefault***
    export { conf };
```

## Install mongoose
```jascript 
    npm install --save mongoose
```

## DB connection
Database Constant <span style="color:yellow">db/constant.js</span><br/>
```javascript
    // configure your database name
    export const DATABASE = "VideoTube"
```

MongoDB connection through mongoose in <span style="color:yellow">db/index.js</span>

```javascript
    import mongoose from 'mongoose';
    import {conf} from '../config/conf.js';
    import {DATABSE} from'./constant.js'

    //* Database connection takes time (asynchronous action)
    async function DBconnection(){
        try{
            const instance = await mongoose.connect(`${conf.mongo_db_uri}/${DATABSE}`);
            console.log("Databse connected successfully");
            return instance;
        }
        catch(err){
            console.error("DATABASE ERROR",err.message);
            process.exit(1);
        }
    }

    export { DBconnection}
```

## Re-build the server
build an app in <span style="color:blue;font-weight:bold">app.js</span> file

```javascript
    import express from 'express'
    
    // create app through express
    const app = express();


    export defult app;
```

create a server start <span style="color:blue;font-weight:bold">server.js</span> 
 in file
```javascript
    import app from './app.js'
    import {conf} from './config/conf.js';
    import {DBconnection} from './db/index.js'

    //* create a server function;
    //* if db connects successfully then only start a sevver
    // connection takes time (asynchronous action);

    async function startServer(){
        try{
            const response = await DBconnection();
            if(response.connection.hostname){
                app.listen(PORT,()=>{
                    console.log(`app is listening on Port: ${PORT}`);
                    console.log(`http://localhost:${PORT}`);
                });
            }
            app.on('error') throw error("app error");
        }
        catch(err){
            console.log("SERVER START ERROR : ",err.message);
        }
    }


   startServer();
```

## Package.json
#### update this configurtions to package.json file
    "main":"server.js",
    "scripts": {
        "dev": "nodemon src/server.js"
    }


## API Error handling
Api Error handling through project
<span style="color:red;font-weight:bold">api/error.js</span> file


```javascript

    class ApiError{
        constructor(statusCode, message="Something went wrong"){
            this.statusCode: statusCode;
            this.message:message;
            this.success: statusCode < 200;
        }
    }

    export { ApiError }
```


## API Response handling
Api Error handling through project
<span style="color:yellow;font-weight:bold">api/response.js</span> file


```javascript

    class ApiResponse{
        constructor(statusCode, message="OK", data?=[]){
            this.statusCode: statusCode;
            this.message:message;
            this.success: statusCode < 400;
            this.data = data;
        }
    }

    export { ApiResponse }
```

## Async handler 
asynch function handler 
<span style="color:green;font-weight:bold">util/asynchandler.js</span> file

**TRY-CATCH BASED**
```javascript
    const asyncHandler = (cb) => async (req,res,next) => {
        try{
            await cb(req,res,next);
        }
        catch(err){
            throw Error("ASYNCHANDLER ERROR",err.message)
        }
    }
    
    export { asyncHandler }
```

**PROMISE BASED**
```javascript
    const asyncHandler = (cb) => async (req,res,next) => {
        return Promise.resolve(
            cb(req,res,next);
        ).
        catch(err){
            throw Error("ASYNCHANDLER ERROR",err.message)
        }
    }

    export { asyncHandler }
```

## cors middleware
```javascript
    npm install cors --save
```

config cors at <span style="color:blue;font-weight:bold">app.js</span> file
```javascript
    //  code already written

    //* NOTE : config on top 
    // *after app creation and before all other middlewares and routes

    app.use(cors({
        origin : conf.frontend_domain_name
    }));

    // code already written

    // code already written
```

config other middleswares
express.json()
```javascript
    
    //* enable accepts json data
    //* default disabled
    app.use(express.json({
        extend:true,
        limit:"20kb"  // accepts data upto 20kb only
    }))

    //* enable accepts urlencoded data (data from url)
    //* default disabled
    app.use(express.urlencoded({
        extend:true,
        limit:"50kb"
    }))
```


## Router
create a userRouter
<span style="color:green;font-weight:bold">router/userRouter.js</span> file
```javascript
    import express from 'express';

    //* create a router and register it as middleware in app.js
    const userRouter = express.Router();

    //** create all your required routes
    //! DEMO 
    // "http://localhost:3000/api/v1/users/get"
    userRouter.get('/get',(req,res)=>{
        res.send("Hello from router");
    });
    // "http://localhost:3000/api/v1/users/set"
    userRouter.post('/set',(req,res)=>{
        const {username} = req.body;
        res.send(username);
    });


    export { userRouter };
```
add this code in your app.js
<span style="color:blue;font-weight:bold">app.js</span> file

```javascript
    //  code already written

    // import all your routes 
    import {userRouter} from './router/userRouter.js'
    import {postRouter} from './router/postRouter.js'

    // code already written

    //** register all your router
    // follow your prefer path 
    // path : "http://localhost:3000/api/v1/users"
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/posts', postRouter);


    // code already written
```


## How to write models??
create your first model (MongoDB Schema) through mongoose
<span style="color:yellow;font-weight:bold">model/user.model.js</span> file

```javascript
    import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema(
        {
            username:{
                type:string,
                required:true,
                unique:true,
                max:[20,"20 characters limit"],
                min:[5,"minimum 5 characters"]
            },
            email:{
                type:string,
                required:true,
                unique:true,
                // validation can be added
            },
            password:{
                type:string,
                required:true,
                max:[50,"50 character limit"],
                min:[8, "minimum 8 characters"]
            },
            fullname:{
                type:string,
                required:true,
                max:[20,"50 character limit"],
            },
            avatar:{
                type:string,
                required:true,
            },
            coverImage:{
                type:string,
                default: ""
            },
            public:{
                type:boolean,
                default:true,
            }
            // ... more
        },
        {
            timeperiods: true
            // creadted at;
            // updated at;
        },
    );


    export const User = mongoose.model("User",userSchema);
```


## Controllers? How to write it;

controller example
<span style="color:yellow;font-weight:bold">controller/user.controller.js</span> file

```javascript

    // import all your require modules

    const register =  asyncHandler(async (req,res,next)=>{
        const {username, fullname, email, password} = req.body;
        const {avatar, coverImage} =  req?.files;

        if(!username || !fullname || !email || !password){
            return res.status(404).json(
                new ApiError(404,"your error message on failure");
            );
        }

        //* process everything based on your algorithm;


        // res response
        res.status(200,"your message on succes",data)
    })

    export {register}
    
```

## bcryptjs
password encryption javascript library

#### install bcryptjs
```javascript
   npm install --save bcryptjs
```
encryption
```javascript
   import bcrypt from 'bcryptjs';

    //* returns hash value
    const hashedPassword = await bcrypt.hash("your-password",10) // 10 rounds or salt
```

comparision
```javascript
   import bcrypt from 'bcryptjs';

    //* return boolean value
   const decodedpassword =  await bcrypt.compare("your-password","hashed-password");
```


## jsonwebtoken
jwt token for user authentication

#### install jsonwebtoken
```javascript
   npm install --save jsonwebtoken
```
encryption
```javascript
   import jwt from 'jsonwebtoken';

    //* return a jwt string
    const token = await jwt.sign(
        {
            _id:"user.id",
            username:"user.username",
            email:"user.email",
            fullname:"user.fullname", 
            // ... and more  
        },
        "your secret",
        {
            expiresIn:"2d" // 2 days
        }
    );
```

verify jwt token
```javascript
    import jwt from 'jsonwebtoken';

    // returns an object of data store in jwt token
    const decodedToken = await jwt.verify(token, "your secret");

    const { fullname, email, username, _id } = decodedToken;
```

## multer middleware
multi-form data (multi-type data),
enable to accept images, videos, pdf ... raw file data

#### install multer
```javascript
    npm install --save multer
```
configure multer
```javascript
    import multer from 'multer';

    // default disk storage.
    const upload = multer({
        dest: path.resolve("./public/temp"), // destination to store files on sever,
        limit: 2*1024*1024, // value in bytes
    });

    export { upload }
```
use multer in routes
```javascript
    

    app.post(
        '/register',
        upload.fields([
            { name : "avatar", maxCount:1}, 
            { name : "coverImage", maxCount:1}, 
        ]),
        middleware2, // middlewares 2
        mddileware3, // middlewares
        signup // controller
    );
```


## cloudinary 
s3 cloud to store files : images , videos, raw files

#### install cloudinary
```javascript
    npm install cloudinary
```

config cloduinary
```javascript
    import {v2 as cloudinary } from 'cloudinary';

    cloudinary.config({
        cloud_name: conf.cloud_name,
        api_key: conf.cloud_api_key,
        api_scret: cloud.api_secret
    });

```

upload on cloudinary
```javascript
    
    const cloudUpload = async (localfilepath, type){
        try{
            const response = await cloudinary
                            .uploader
                            .upload(localfilepath,
                                {
                                    resource_type: type ? type : "auto" // "raw" || "image" || "video"
                                    folder: "foldername";
                                });
            fs.unlinksync(localfilepath); // unlink file from server
            return response;
        }
        catch(err){
            fs.unlicksync(localfilepath);  // unlink file from server
            console.log("CLOUDINARY UPLOAD ERROR:: ",err.message);
            throw Error(err.message);
        }
    }

    export { cloudinaryUpload }
```
remove from cloudinary
```javascript
    
    const cloudRemove = async (publicId, type){
        try{
           await cloudinary
                .uploader
                .destroy(publicId,
                    {
                        resource_type: type ? type : "raw" // "raw" "image" || "video"
                    });
        }
        catch(err){
            console.log("CLOUDINARY REMOVE ERROR:: ",err.message);
            throw Error(err.message);
        }
    }

    export { cloudinaryRemove }
```

## auth middleware
custom middleware 
user authentication middleware

```javascript
    async function auth (req,res,next){
        // token : BEARER <token>
        const token = req.header["authorization"].split(' ')[1];
        if(!token){
            return next(new ApiError(400,"Unauthorized user request"));
        }

        const decodedToken = await jwt.verify(token, "your secret");

        req.userId = decodedToken._id;
        next();
    }
```