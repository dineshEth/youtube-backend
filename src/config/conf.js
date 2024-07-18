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
    cloud_api_name:String(process.env.CLOUD_NAME),
    cloud_api_key:String(process.env.CLOUD_API_KEY),
    cloud_api_secret:String(process.env.CLOUD_API_SECRET),
    access_token_secret:String(process.env.ACCESS_TOKEN_SECRET),
    access_token_expiry:String(process.env.ACCESS_TOKEN_EXPIRY),
    refresh_token_expiry:String(process.env.REFRESH_TOKEN_EXPIRY),
    refresh_token_secret:String(process.env.REFRESH_TOKEN_SECRET),
}

//* freeze the object { ReadOnly Object }
Object.freeze(conf);

export { conf }