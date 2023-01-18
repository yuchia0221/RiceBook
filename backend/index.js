const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const mongo = require("./config/mongo");
const cloudinary = require("./config/cloudinary");
const verifyAccess = require("./middleware/verifyAccess");

dotenv.config();
mongo.connect();

const app = express();
app.sessions = new Set();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(
    cors({
        origin: ["http://localhost:3000", "https://ricebook-client.surge.sh"],
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.use(cloudinary.cloudinaryConfig);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/", require("./routers/auth"));
app.use("/", require("./routers/test"));
app.use(verifyAccess);
app.use("/", require("./routers/link"));
app.use("/", require("./routers/profile"));
app.use("/", require("./routers/article"));
app.use("/", require("./routers/following"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
