// การสร้าง server

/*
Nodemon คือโปรงแกรมช่วยในการแสดงหน้าจอ ให้ไม่ต้อง reset ระบบในการทดสอบทุกครั้ง

ให้ลง nodemon ด้วยทุกครั้งที่มีการทำงานกับ server
- npm install nodmon
- แล้วไปเซ็คต่าให้ไฟล์ package.json
    ในแท็ก scrip เพิ่มคำสั่งว่า "start" : "nodemon ./bin/www" ลงไป
*/

const http = require("http")

// fs = file system คือ โมดูลสำหรับจัดการไฟล์
const fs = require("fs")

const url = require("url")

/*
หากต้องการเข้าไปในไฟล์ต่างๆของฝั่ง server จะต้องอ้างอิง
ผ่านค่าในตัวแปรที่ชื่ว่า __dirname

เพราะการอ้างอิง file หรือ directory ฝั่ง server จะอ้างอิงไม่เหมือนกับฝั่ง client
*/
const indexPage = fs.readFileSync(__dirname + "/templates/index.html", "utf-8")
const producePage1 = fs.readFileSync(__dirname + "/templates/product1.html", "utf-8")
const producePage2 = fs.readFileSync(__dirname + "/templates/product2.html", "utf-8")
const producePage3 = fs.readFileSync(__dirname + "/templates/product3.html", "utf-8")

/*
red มาจากคำว่า request ใช้สำหรับรับค่าจากฝั่งผู้ใช้งาน
res มาจากคำว่า respond ใช้สำหรับการส่งข้อมูลแสดงผลไปหาผู้ใช้งาน
*/
const server = http.createServer((req,res)=>{

    /*
    // ตัวอย่างการเขียนข้อความลงหน้าเพจ
    const myhtml = `
    <html>
    <body>
    <h4>Hello Node.js</h4>
    <p>2022</p>
    </body>
    <html>
    `
    // การส่งข้อมูลออกไป
    res.write(myhtml)
    */
    
    // ตัวอย่างการทำงานของ Rout
    
    // การแสดงรายละเอียดของ url ที่ส่งเข้ามา
    console.log(url.parse(req.url, true))

    // การดึงข้อมูลเฉพาะใน parse url มาใช้งาน
    // ในที่นี้กำลังดึงค่า query มาใช้งาน
    // ชื่อต้องเป็นตัวเล็กทั้งหมด
    const {pathname,query} = url.parse(req.url, true)
    console.log(pathname)

    //const pathname = req.url
    //console.log("url = " + pathname)
    
    if (pathname === "/" || pathname === "/home") {
        res.write(indexPage)
    }
    else if (pathname === "/product") {

        if (query.id === '1') {
            res.write(producePage1)
        }
        else if (query.id === '2') {
            res.write(producePage2)
        }
        else if (query.id === '3') {
            res.write(producePage3)
        }
    }
    else {

        // writeHead คือการส่งค่า http status code 404 กลับไปหา Browser
        res.writeHead(404)
        res.write("Not Found")
    }

    // สิ้นสุดการส่งข้อมูล
    res.end()
})

// ระบุ port ในการเชื่อมต่อ
server.listen(3000, ()=> {
    console.log("Start Server in Port 3000")
})

