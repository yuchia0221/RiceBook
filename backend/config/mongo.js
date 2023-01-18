const mongoose = require("mongoose");

function connectMongo() {
    mongoose.connect(process.env.DB_CONNECTTION_STRING);

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("mongo connected!");
    });
}

const mongo = {
    connect: connectMongo,
};

module.exports = mongo;
