const express = require('express');
const app = express();
const userRouter = require('./src/users/Router');
const postRouter = require('./src/posts/Router');
const cors = require('cors')
require('dotenv').config()

app.use(cors())

app.use('/users', userRouter)
app.use('/posts', postRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor en línea. Puerto: ${process.env.PORT}`);
})
