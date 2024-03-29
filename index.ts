import express, { Express } from "express"
import * as database from './config/database'
import cors from "cors"
import path from "path"
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'
import clientRoutes from './routes/client/index.route'
import adminRoutes from "./routes/admin/index.route"
import { systemConfig } from "./config/config"
import passport from 'passport'
import { configLoginWithGG, configLoginWithFB } from "./config/passport"
import session from 'express-session'
import moment from "moment"

const app: Express = express()
const port: number | string = process.env.PORT || 3000

app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment

database.connect()

app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cấu hình session middleware
app.use(session({ 
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}));

// Sử dụng Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(cors())

// admin routes
adminRoutes(app)
// client routes
clientRoutes(app)

// 
configLoginWithGG()
configLoginWithFB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})