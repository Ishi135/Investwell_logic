const express =require('express');
const cors =require('cors')
const router =require("./routes")
const database = require("./repositories/connectDb");


const app =express()
app.use(express.json())
app.use(cors())
const Port =8000;
database;
app.use('/', router);

app.listen(Port, ()=> {
    console.log(`Listening on Port - ${Port}`);
    }
)