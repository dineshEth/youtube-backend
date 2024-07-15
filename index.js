import express from "express";


const app = express();

const PORT = 3000;


app.listen(PORT,()=>{
    console.log(`app is listening on port:${PORT}`);
    console.log(`http://localhost:${PORT}`);
});


export default app;