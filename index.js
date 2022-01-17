//require("express-async-errors");
const mongoose = require("mongoose");
const express = require("express");
const todoRouter = require("./Routes/todo");
const { logger } = require("./middleware");

const app = express();

//Middleware
app.use(express.json()); // parse text from http request body => assign on req.body
app.use(logger);


app.use("/todo", todoRouter);

app.use((err, req, res, next) => {

    // server logs
    res.status(500).json({ message: err.message })
    console.log(err)
})

mongoose
    .connect("mongodb://localhost:27017/mydb")
    .then(() => {
        app.listen(3000, () => {
            console.log("server running on port 3000");
        });
        console.log("successfully connected with the database")
    })
    .catch(() => {
        console.log("error connecting to mongodb");
    });
