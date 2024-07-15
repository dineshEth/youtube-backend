import app from "./app.js";
import { conf } from "./config/conf.js";
import { dbConnection } from "./db/dbconnection.js";


;(async function startSever(){
    const PORT = conf.port || 8000;
    try {
        const response = await dbConnection();
        if(response.connections.host){
            app.listen(PORT,()=>{
                console.log(`app is listening on port ${PORT}`);
                console.log(`http://localhost:${PORT}`);
            });
        }
    } catch (error) {
        console.log("SERVER START ERROR :: ",error.message);
        throw new Error(error.message);
    }
})();