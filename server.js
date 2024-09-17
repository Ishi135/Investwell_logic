const express =require('express');
const cors =require('cors')
const router =require("./routes")
const database = require("./repositories/connectDb");
const cookieParser=require('cookie-parser')

const app =express()
app.use(express.json()) 
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));
const Port =8000;
database;
app.use('/', router);

app.listen(Port, ()=> {
    console.log(`Listening on Port - ${Port}`);
})