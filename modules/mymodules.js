// ให้บริการเกี่ยวกับการทำงานต่างๆในโปรเจก

function getCurrentTime() {
    return new Date()
}

function add (x, y) {
    return x + y
}

// ส่งคำสั่งออกไป
module.exports.getCurrentTime = getCurrentTime
module.exports.add = add