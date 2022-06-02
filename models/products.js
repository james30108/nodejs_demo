// ใช้งาน mongoose
const mongoose = require("mongoose")

// เชื่อมไปยัง MongoDB
// * สร้างฐานข้อมูล
const dbUrl = "mongodb://127.0.0.1:27017/productDB" // สร้าง productDB ให้อัติโนมัติ
mongoose.connect(dbUrl,{
    // ตั้งค่าเบื้องต้น
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).catch(err=>console.log(err))


// ออกแบบโครงสร้างในการจัดเก็บข้อมูล (Schema)
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

// สร้างโมเดล
// * สร้างตาราง
let Product = mongoose.model("products", productSchema)

// ส่งออกโมเดล
module.exports = Product

// --------------------------
// ออกแบบฟังก์ชันสำหรับบันทึกข้อมูลจาก form
module.exports.saveProduct = function (model, data) {
    model.save (data)
}