// ตัวอย่างการ import โมดูลมาใช้งาน
const mymodules = require("./modules/mymodules")
//console.log(mymodules.add(50,100))

// หรือสามารถเรียกใช้งานแบบนี้ก็ได้
const getCurrentTime = require("./modules/mymodules").getCurrentTime
const add = require("./modules/mymodules").add

//console.log(getCurrentTime())
//console.log(add(50,100 ))



// ตัวอย่างการ import โมดูลจากภายนอกมาใช้งาน 

// ตัวอย่าง โมดูลการจัดการไฟล์
// fs คือ core modules ที่อยู่ใน node.js อยู่แล้ว
const fs =  require("fs")
/*
// อ่านไฟล์ input.txt
const data = fs.readFileSync("myfile/input.txt","utf-8")
console.log(data)
console.log("จบการทำงาน")

// เขียนไฟล์
const outputText = "Hello Node.Js \n" + data + "\nไฟล์ถูกเขียนเมื่อ " + new Date()
fs.writeFileSync("myfile/output.txt", outputText)
console.log("เขียนไฟล์เรียบร้อย")
*/

// การอ่านและเขียนไฟล์แบบ Async

// อ่านไฟล์แบบ Async
// err คือเมื่อมีการอ่านไฟล์แล้วผิดพลาดจะให้ทำอะไร ส่วน data คือการเก็บผลลัพธิ์จากการอ่านไฟล์เข้ามาทำงาน
fs.readFile("myfile/input.txt","utf-8", (err, data)=>{
    
    // ดัก error
    if (err) return console.log("เกิดข้อผิดพลาด", err)
    console.log(data)
    
})
console.log("จบการทำงาน")

// เขียนไฟล์
fs.readFile("myfile/input.txt","utf-8", (err, data)=>{
    
    // ดัก error
    if (err) return console.log("เกิดข้อผิดพลาด", err)
    const outputText = "Hello Node.Js \n" + data + "\nไฟล์ถูกเขียนเมื่อ " + new Date()
    fs.writeFile("myfile/output2.txt", outputText, err=>{
        if (err) return console.log("เกิดข้อผิดพลาด", err)
        console.log("เขียนไฟล์เสร็จเรียบร้อย")
    })
    
})
console.log("จบการทำงาน")