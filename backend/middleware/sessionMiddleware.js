const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const sessionMiddleware = session({
    name: "user_session", 
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), 
    cookie: {
        secure: false, // Set to `true` in production with HTTPS
        httpOnly: true, 
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours expiration
    },
    
});

module.exports = sessionMiddleware;
