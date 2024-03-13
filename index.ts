import express, { Express } from "express"
import * as database from './config/database'
import cors from "cors"
import 'dotenv/config'
import clientRoutes from './routes/client/index.route'


const app: Express = express()
const port: number | string = process.env.PORT || 3000


database.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.set("views", "./views")
app.set("view engine", "pug")

app.use(cors())

// client routes
clientRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})