// ตัวอย่าง การใช้งาน express.js แบบ Dymanic files

const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const router = require("./routes/router.js")
const app = express()

app.set("views", path.join(__dirname,"views")) // กำหนด views
app.set("view engine", "ejs") // ระบุรูปแบบ engine ในที่นี้ใช้แพ็กเกจเป็น ejs

// use คือการกำหนด middleware หรือก็คือตัวกรอง request ที่ส่งเข้ามา
app.use(express.urlencoded({extended:false})) // คำสั่งแปลงข้อมูลที่ถูกส่งมาแบบ post 
app.use(cookieParser())
app.use(session({secret:"mysession", resave:false, saveUninitialized:false}))
app.use(router)
app.use(express.static(path.join(__dirname,"public")))

app.listen(3000,()=>{
    console.log("รัน server ที่ port 3000")
})