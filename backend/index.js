import express from "express"
import mongoose from "mongoose"
import {PORT, mongoDBURL} from "./config.js"
import booksRoute from './routes/booksRoute.js';

import cors from 'cors'

const app = express()
//middleware for parsing request body
app.use(express.json())

// middleware for handling CORS POLICY
// option 1: ALLOW ALL ORIGINS WITH DEAFULT OF CORS(*)
app.use(cors())
//option 2: ALLOW CUSTOM ORIGIN----> BETTER WAY
//  app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
//  )

//http request and response
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('welcome!')
})

app.use('/books', booksRoute)

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('app connected to databasde')
    app.listen(PORT, () => {
        console.log(`App is listening to port : ${PORT}`)
    })
}) 
.catch((error) => {
    console.log(error)
})