import dotenv from "dotenv";

//* configure dotenv and import all enviroment variables
dotenv.config({
    path:'../../.env',
    encoding:"latin1",
    debug:true,
    override:false
});


const conf = {
    port:String(process.env.PORT),
    mongo_db_uri:String(process.env.MONGO_DB_URI),
    frontend_domain:String(process.env.FRONTEND_DOMAIN),
}

//* freeze the object { ReadOnly Object }
Object.freeze(conf);

export { conf }