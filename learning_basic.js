// การใช้งาน Callback Function
/*
function calculate (x,y,callback) {
    console.log("กำลังคำนวน....")
    // ให้ทำงานใน setTimeout รวดเดียวเลย
    setTimeout(()=> {
        const sum = x+y
        callback(sum)
    },3000)
}

function display (result) {
    console.log("ผลบวก = ", result)
}

// การทำงานแบบ callback 
calculate(100,50,display)

// หรือสามารถเขียนลดรูปได้แบบนี้
calculate(100,50,function (result) {
    console.log("ผลบวก1 = ", result)
    
    // สามารถทำการคำนวนเพิ่มได้ในฟังก์ชั่น
    calculate(150,50,function(result){
        console.log("ผลบวก2 = ", result)
    })

})
*/

/*

การใช้งาน Promise
มีการทำงานหลักๆคือการส่งค่าออกมาเมื่อการทำงานให้ฟังก์ชั่นเสร็จเรียบร้อย โดยจะมีสองค่าคือ เสร็จสิ้น(resolve) และล้มเหว (reject)

Promise มีไว้แก้ปัญหาการทำงานซ้ำซ้อน

then    คือ คำสั่งที่จะทำงานก็ต่อเมื่อสถานะเป็นเสร้จสิ้น
catch   คือ คำสั่งที่จะทำงานเมื่อสถานะเป็นล้มเหลว
finally จะทำงานเมื่อสถานะเป้นทัง้คู่ (ไม่สนใจสถานะที่ออกมา)


*/

// ตัวอย่างการทำงาของ Promise
const connect = true // สถานะการต่อเน็ต
const url1 = "james.dev/file1.json" 
const url2 = "james.dev/file2.json" 
const url3 = "james.dev/file3.json" 
const url4 = "james.dev/file4.json" 
const url5 = "james.dev/file5.json" 

function downloading (url) {
    
    // ประกาศการใช้งาน Promise
    return new Promise (function (resolve, reject) {
        console.log("กำลังดาวน์โหลดไฟล์ .... ")
        setTimeout(() => {
            if (connect) {
                resolve("โหลด " + url + " เรียบร้อย")
            }
            else {
                reject("โหลด ผิดพลาด")
            }
        }, 3000);
    })

}

// คำสั่ง then จะทำงานเมื่อมีคำสั่ง resolve ถูกส่งออกมา
// คำสั่ง catch จะทำงานเมื่อมีคำสั่ง reject ถูกส่งออกมา
// คำสั่ง finally จะทำงานโดยไม่สนใจสถานะที่ถูกส่งออกมา
/*
downloading(url1).then(result=>{
    console.log(result)
}).catch(error=>{
    console.log(error)
}).finally(()=>{
    console.log("จบการทำงาน")
})

// ตัวอย่างการทำงานซ้อนเพื่อแก้ปัญหา callback hell
downloading(url1)
.then(function(result){
    console.log(result)
    return downloading(url2)
}).then(function(result){
    console.log(result)
    return downloading(url3)
}).then(function(result){
    console.log(result)
    return downloading(url4)
}).then(function(result){
    console.log(result)
    return downloading(url5)
}).then(function(result){
    console.log(result)
})
*/


/*

Async and Await

async เขียนอยู่ด้านหน้าฟังก์ชั่นที่มีการเรียกใช้งาน promise
await เขียนอยู่หน้า promise

ปัจจุบันจะใช้การทำงานรูปแบบนี้มากกว่า
เพราะเขียนง่ายและเข้าใจง่ายกว่า

*/

// ตัวอย่าง
async function start() {
    console.log(await downloading(url1))
    console.log(await downloading(url2))
}

start()