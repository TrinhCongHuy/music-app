import express, { Express } from "express"
import * as database from './config/database'
import cors from "cors"
import path from "path"
import 'dotenv/config'
import clientRoutes from './routes/client/index.route'
import adminRoutes from "./routes/admin/index.route"
import { systemConfig } from "./config/config"

const app: Express = express()
const port: number | string = process.env.PORT || 3000

app.locals.prefixAdmin = systemConfig.prefixAdmin

database.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.set("views", "./views")
app.set("view engine", "pug")

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(cors())

// admin routes
adminRoutes(app)
// client routes
clientRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})