const express = require("express");
const path = require("path");
const hbs = require("hbs");
const expressSession = require("express-session");
const connectDB = require("./config/connection")
const flash = require('connect-flash');
const userRouter = require("./router/userRouter");
const mongoDBSession = require("connect-mongodb-session")(expressSession);
const dotenv = require("dotenv").config();
const roleRoute = require("./router/index")
const adminRoute = require("./router/admin")
const cors = require("cors");
const registerHelpers = require("./helpers");
const setUserPermissions = require("./middleware/userPermission");


const app = express()
connectDB()



registerHelpers();
const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, HEAD, PATCH, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

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

app.use(setUserPermissions);

// Template Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.engine("html", hbs.__express);


hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.get("/", async (req, res) => {
    return res.redirect("/auth/login");
});

app.use("/auth",roleRoute)
app.use("/admin",adminRoute)
app.use("/api", userRouter)


app.listen(process.env.PORT, async (req, res) => {
    console.log(`Server listening to port....${process.env.PORT}`);
});


