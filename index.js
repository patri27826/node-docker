const express = require("express")
const mongoose = require('mongoose');

const app = express()

mongoose
    .connect("mongodb://patrick:123@172.22.0.2:27017/?authSource=admin")
    .then( () => console.log("successfully connected to mongo"))
    .catch( (e) => console.error(e));

app.get("/", (req,res) => {
    res.send("<h2>Welcome~~~~1213bbbbbb21321~</h2>")
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))