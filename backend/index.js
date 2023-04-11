const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
app.use(express.json())
app.use(cors())

app.listen('8005', () => {
    console.log('server is running on port 8005')
})