const express = require("express");
const path = require("path");
const hbs = require("hbs");
const expressSession = require("express-session");
const connectDB = require("./config/connection");
const userRouter = require("./userRouter");
const mongoDBSession = require("connect-mongodb-session")(expressSession);
const dotenv = require("dotenv").config();
const cors = require("cors");


const app = express()
connectDB()




const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, HEAD, PATCH, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new mongoDBSession({
    uri: process.env.MONGO_URI,
    collection: "userSessions",
});

app.use(expressSession({
    secret: "thisIsHeallTTthClliIIKKSecretKey!",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 29
    },
    resave: false,
    saveUninitialized: false,
    store: store,
}));



// Template Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("html", hbs.__express);

app.use("/api", userRouter)




app.listen(process.env.PORT, async (req, res) => {
    console.log(`Server listening to port....${process.env.PORT}`);
});


