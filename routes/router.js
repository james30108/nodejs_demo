// ตัวอย่างการใช้งาน srouter ร่วมกับไฟล์ Dynamic

const express = require("express") // import Express เข้ามาทำงาน
const router = express.Router() // Router จะทำงานเกี่ยวกับระบบรับส่งข้อมูลทั้งหมด
const Product = require("../models/products") // เรียกใช้งาน model
const multer = require("multer") // เรียกใข้งาน multer

// การอัปโหลดไฟล์
const storage = multer.diskStorage({
    
    destination:function(req, file, cb) { // การรุบุตำแหน่งที่จะทำการเก็บไฟล์
        cb(null, "./public/images/products")
    },
    filename:function(req, file, cb) { // ระบุชื่อไฟล์ใหม่เพื่อป้องกันการซ้ำกันของชื่อ
        cb(null, Date.now() + ".jpg")
    }

})

const upload = multer({ // เริ่มต้นอัปโหลด
    storage:storage
})

router.get("/", (req,res)=>{
    
    //การส่งข้อมูล
    const name = "James"
    const age = 15
    const address = "<h3>เชียงใหม่</h3>"
    const products1 = ["เสื้อ", "กางเกง", "หมวก"]
    const products2 = [
        {name:"โน๊ตบุ้ค", price:1500, image:"images/products/product1.png"},
        {name:"เสื้อ", price:700, image:"images/products/product2.png"}
    ]

    // ทำการค้นหาข้อมุลใน model Product ออกมา
    Product.find().exec((err,doc)=>{
        res.render("index",{products:doc, name:name, age:age, address:address, products1:products1, products2:products2})
    }) 
})

router.get("/add-product", (req,res)=>{
    
    if (req.session.login) {
        res.render("form") // ระบุหน้าที่ต้องการให้เปิด
    }
    else {
        res.render("admin")
    }
})

router.get("/manage", (req,res)=>{
    
    if (req.session.login) {
        Product.find().exec((err,doc)=>{
            res.render("manage",{products:doc})
        })
    }
    else {
        res.render("admin")
    }
    
})

router.get("/logout", (req,res)=>{
   
    // res.clearCookie("username")
    // res.clearCookie("password")
    // res.clearCookie("login")
    req.session.destroy((err)=>{
        res.redirect("/manage")
    })
    
})

router.get("/delete/:id", (req,res)=>{
    Product.findByIdAndDelete(req.params.id, {userFindAndModify:false}).exec(err=>{
        if(err) this.console.log(err)
        res.redirect("/manage")
    })
})

// ตัวรับข้อมูลจาก form แบบ get
/*
router.get("/insert", (req,res)=>{
    // คำสั่ง .query คือตัวเก็บกลุ่มก้อนข้อมูลที่ถูกส่งมาจากแบบฟอร์ม
    console.log(req.query.name)
})
*/

// ตัวรับข้อมูลจาก form แบบ post
router.post("/insert", upload.single("image"), (req,res)=>{
    
    // ถา้ส่งข้อมูลแบบ post ให้ใช้ .body แทน .query
    let data = new Product ({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
    Product.saveProduct(data, (err)=>{
        if (err) console.log(err)
        res.redirect("/")
    })
    
    //console.log(data)
    //res.render("form")

})

router.get("/:id", (req,res)=>{
    const product_id = req.params.id
    Product.findOne({_id:product_id}).exec((err, doc) => { // ค้าหาสินค้าจากไอดีที่ส่งเข้ามา
        res.render("product", {product:doc}) // ระบุหน้าที่ต้องการให้เปิด
    }) 
    
})

router.post("/edit", (req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err, doc) => { // ค้าหาสินค้าจากไอดีที่ส่งเข้ามา
        res.render("edit", {product:doc}) // นำข้อมูลเดิมไปแสดงที่หน้าแก้ไขข้อมูล
    }) 
})

router.post("/update", (req,res)=>{
    
    // ข้อมูลใหม่ที่ถูกส่งมาจากฟอร์มแก้ไข
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
    Product.findByIdAndUpdate(update_id, data, {userFindAndModify:false}).exec(err=>{
        res.redirect("/manage")
    })

})

router.post("/login", (req,res)=>{
    
    const username = req.body.username
    const password = req.body.password
    const timeout  = 20000 // 10 วินาที 

    if (username === "admin" && password === "123") {
        
        // เก้บค่าลงใน cookies
        // res.cookie("username", username, {maxAge:timeout})
        // res.cookie("password", password, {maxAge:timeout})
        // res.cookie("login", true, {maxAge:timeout}) // true => login เข้าสู่ระบบแล้ว
        
        // สร้าง session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeout
        res.redirect("/manage")
    }
    else {

        res.render("404")

    }
})



module.exports = router // ทำการ export 