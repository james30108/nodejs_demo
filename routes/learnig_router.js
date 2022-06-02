// จัดการเกี่ยวกับกลุ่มคำสั่งที่เกี่ยวกับระบบ routing ทั้งหมด

const express = require("express") // import Express เข้ามาทำงาน
const router = express.Router() // Router จะทำงานเกี่ยวกับระบบรับส่งข้อมูลทั้งหมด

// import modules ที่ชื่อ path มาทำงาน 
// โมดูล path คือโมดูลที่จัดการเกี่ยวกับการเรียกใช้งานไฟล์ต่างๆ
const path = require("path")
// ทำการอ้างอิงตำแหน่งไฟล์
const indexPage = path.join(__dirname, "../templates/index.html")

// การใช้งาน .get
// เนื่องจาก .use มีข้อจำกัดในการทำงาน เพราะ use จะส่ง path ได้ทีละมากๆไม่ได้ 
// จึงนิยมเอา .get หรือ .post มาใช้งานแทน
router.get("/", (req, res)=>{
    //res.send("<h1>Hello Express.js 2022 : get mothod<h1>")
    res.status(200) // ค่าสถานะ
    res.type("text/html") // รูปแบบของการ respond
    res.sendFile(indexPage)
})

router.get("/product/:id", (req, res)=>{
    const product_id = req.params.id
    if (product_id === "1") {
        res.sendFile(path.join(__dirname, "../templates/product1.html"))
    }
    else if (product_id === "2") {
        res.sendFile(path.join(__dirname, "../templates/product2.html"))
    }
    else if (product_id === "3") {
        res.sendFile(path.join(__dirname, "../templates/product3.html"))
    }
    else {
        
        // การ redirect คือการเปลี่ยนเส้นทาง
        res.redirect("/")
    }
})

module.exports = router // ทำการ export 