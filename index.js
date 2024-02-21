const express = require('express');
const userRouter = require('./Route/userRoute/userRoute');
const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/', userRouter);
  
const port=7700;
app.listen(port,()=>{
    console.log(`server is running on ${port} port`)
});
