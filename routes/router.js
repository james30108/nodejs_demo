// ตัวอย่างการใช้งาน srouter ร่วมกับไฟล์ Dynamic

const express = require("express") // import Express เข้ามาทำงาน
const router = express.Router() // Router จะทำงานเกี่ยวกับระบบรับส่งข้อมูลทั้งหมด
const Product = require("../models/products") // เรียกใช้งาน model

router.get("/", (req,res)=>{
    
    //การส่งข้อมูล
    const name = "James"
    const age = 15
    const address = "<h3>เชียงใหม่</h3>"
    const products = ["เสื้อ", "กางเกง", "หมวก"]
    const products2 = [
        {name:"โน๊ตบุ้ค", price:1500, image:"images/products/product1.png"},
        {name:"เสื้อ", price:700, image:"images/products/product2.png"}
    ]
    res.render("index", {name:name, age:age, address:address, products:products, products2:products2})
})

router.get("/addForm", (req,res)=>{
    res.render("form") // ระบุหน้าที่ต้องการให้เปิด
})

router.get("/manage", (req,res)=>{
    res.render("manage") // ระบุหน้าที่ต้องการให้เปิด
})

// ตัวรับข้อมูลจาก form แบบ get
/*
router.get("/insert", (req,res)=>{
    // คำสั่ง .query คือตัวเก็บกลุ่มก้อนข้อมูลที่ถูกส่งมาจากแบบฟอร์ม
    console.log(req.query.name)
})
*/

// ตัวรับข้อมูลจาก form แบบ post
router.post("/insert", (req,res)=>{
    // ถา้ส่งข้อมูลแบบ post ให้ใช้ .body แทน .query
    let data = new Product ({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        description:req.body.description
    })
    Product.saveProduct(data, (err)=>{
        if (err) console.log(err)
        res.redirect("/")
    })
    //console.log(data)
    //res.render("form")
})

module.exports = router // ทำการ export 