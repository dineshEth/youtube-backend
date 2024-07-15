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
}

//* freeze the object { ReadOnly Object }
Object.freeze(conf);

export { conf }