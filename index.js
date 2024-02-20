const express = require('express');
const app = express();
app.use(express.json());

const userRouter = require('./Route/userRoute/userRoute');
app.use('/', userRouter);
  
const port=7700;
app.listen(port,()=>{
    console.log(`server is running on ${port} port`)
});
