// ตัวอย่าง การใช้งาน express.js

const express = require("express")
//const router = require("./routes/router") // import router มาใช้งาน
const path = require("path")
const app = express()

// use ต้องเขียนด้านบน listen เสมอ
// use เปรียบเสมือนการใช้งานตัว routing ในตอนเริ่มต้น
/*
app.use((req, res)=>{
    res.send("<h1>Hello Express.js<h1>")
})
*/

//app.use(router) // ใช้งาน router โดยให้ express เรียกใช้งาน router

// การใช้งาน static file
// ในไฟล์ public ต้องมีไฟล์ index.html อยู่ด้วยทุกครั้ง
// public คือชื่อโฟลเดอร์ที่เก็บไฟล์ static ต่างๆ เอาไว้
app.use(express.static(path.join(__dirname,"public")))

app.listen(3000,()=>{
    console.log("รัน server ที่ port 3000")
})