const express = require("express")
const server = express()
const pool = require("./db")

server.use(express.json())

server.listen(5000,()=>{
    try {
        console.log("server listening on port 5000")
    } catch (error) {
        console.log("error starting server on port 5000")
    }
})

