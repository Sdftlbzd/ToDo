import express from 'express'
import mongoose from 'mongoose'
import { Mainrouter } from './src/routes/index.js'

const app = express()
app.use(express.json())
mongoose.connect("mongodb+srv://sdftlbzd:wEmvaQPztdtatkqQ@divacademy.dlyfn.mongodb.net/blog?retryWrites=true&w=majority&appName=DivAcademy")
.then(()=>{
console.log("Connet to DB")
})
.catch((error)=>{
console.error(`Error bash verdi ${error}`)
})
app.use('/', Mainrouter)
const port= 5000

app.listen(port, () => console.log(`Server is running on port ${port}`));