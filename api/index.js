import express from 'express'

const app = express()

app.listen(1000, () => {
    console.log("Server is running on port 1000")
})