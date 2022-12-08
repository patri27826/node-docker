const express = require("express")
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")
const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then( () => console.log("successfully connected to mongo"))
        .catch( (e) => console.error(e));

    app.get("/", (req,res) => {
        res.send("<h2>Welcome~~~~1213bbbbbb21321~</h2>")
    })
    .then(() => console.log("successfully connected to mongo"))
    .catch((e) => {
        setTimeout(connectWithRetry, 5000)
    })
}


const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))