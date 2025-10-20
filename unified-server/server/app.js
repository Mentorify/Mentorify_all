const dotenv = require("dotenv")
const express = require("express")
const cookieParser = require("cookie-parser")
const createError = require("http-errors")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json())
app.use(cors())

require("./db/conn")

app.use("/api/", require("./router/auth"))
app.use("/api/admin", require("./router/adminAuth"))
app.use("/api/franchise", require("./router/franchiseAuth"))
app.use("/api/school", require("./router/schoolAuth"))
app.use("/api/superadmin", require("./router/superAdminAuth"))
app.use("/api/profile", require("./router/profile"))
app.use("/api/coupons", require("./router/couponRoutes"))
app.use("/api/forgot-password", require("./router/forgotPassword"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")))
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"))
  })
} else {
  app.get("/", function (req, res) {
    res.send("api is running")
  })
}

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((error, req, res, next) => {
  error.status = error.status || 500
  res.status(error.status).send(error)
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Unified server running on port ${PORT}`)
})



