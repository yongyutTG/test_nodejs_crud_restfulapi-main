// //จัดการ Routing ที่มีอยู่
// const express = require("express")
// const router = express.Router()


// router.post('/api/login', (req, res) => {
//     const login_username = req.body.data_login_username;
//     const login_password = req.body.data_login_password
 
//     console.log(req.body);  //เรียก req ทั้งหมด
//     try { ///ถ้าไม่มีข้อผิดพลาดเกิดขึ้นภายในบล็อค
//         if(login_username && login_password) {  //ตรวจสอบค่าตัวแปร Boolean ถ้าเป็น true
//             db.query("select * from db_api_user where user = ? and password = ? ",[login_username ,login_password],(err,data, fil) => {
//                 if(data && data[0]) {
//                     console.log('login : success')
//                     return res.status(200).json({
//                         RespCode: 200,
//                         RespMessage: 'success'
//                         //Result: data
//                     })
//                 } else {
//                     console.log('Err 1! : not found data')
//                     return res.status(200).json({
//                         RespCode: 400,
//                         RespMessage: 'ไม่พบข้อมูล',
//                         Log: 1
//                     })
//                 }
//             })
//         }
//         else { //ฺBoolean ถ้าเป็น false
//             console.log('Err 2! : Invalid data username or password')
//             return res.status(200).json({
//                 RespCode: 400,
//                 RespMessage: 'bad: Invalid data username or password',
//                 Log: 2
//             })
//         }
//     } catch(error) {
//         console.log('Err 0! :', error)
//         return res.status(200).json({
//             RespCode: 400,
//             RespMessage: 'bad',
//             Log: 0
//         })
//     }
// });




// module.exports = router