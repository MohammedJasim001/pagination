import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './src/app.js'

dotenv.config()

const port = 3003

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('mongodb connected'))
    .catch((err)=>console.log('connection errror :', err))

app.listen(port,()=> {
    console.log(`server running on port ${port}`);
})  