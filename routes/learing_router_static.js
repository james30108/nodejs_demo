// ตัวอย่างการใช้งาน srouter ร่วมกับไฟล์ static 

const express = require("express") // import Express เข้ามาทำงาน
const router = express.Router() // Router จะทำงานเกี่ยวกับระบบรับส่งข้อมูลทั้งหมด
const path = require("path")

//module.exports = router // ทำการ export 