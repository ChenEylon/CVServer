const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 4000
const mongoose = require('mongoose')
const userRoutes= require('./routes/users')
const cvRoutes= require('./routes/cv')
require("dotenv").config()
const cors = require("cors");
app.use(cors());


mongoose
    .connect(
        'mongodb+srv://cheneylon1:Chen2001@cluster12.lpaa34s.mongodb.net/?retryWrites=true&w=majority'
    )
    .then
    (() => {
        console.log("successffully connected to the database")
    })
    .catch((err) => {
        console.log(err)
    })

app.use(bodyParser.json())

app.use('/users',userRoutes)
app.use('/cv',cvRoutes)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

