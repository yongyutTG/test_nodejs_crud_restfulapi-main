// ประเภทข้อมูล	คำอธิบาย	   ตัวอย่าง Literal
// Number	  ตัวเลข	       1, -10, 0.5, 1.8e6
// String	  ข้อความ	      "my string" หรือ 'hello'
// Boolean	  ค่าความจริง	    true และ false เท่านั้น
// BigInt	  ตัวเลขขนาดใหญ่   1n, 9007199254740992n
// Symbol	  สัญลักษณ์	       Symbol("name")
// Undefined  ไม่ได้กำหนดค่า	undefined


const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser")  //ใช้งาน body แบบ json 
const path = require('path')
const cors = require('cors');

const _ = require('lodash');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



const server = app.listen(3000, () => {
    console.log('Nodejs is running on port 3000!')
})

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: 'nodejs'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected..");
});






// *********************login************************
app.post('/api/login', (req, res) => {
    const login_username = req.body.data_login_username;
    const login_password = req.body.data_login_password
    console.log(req.body);  //เรียก req ทั้งหมด
// Validat data
    try { ///ถ้าไม่มีข้อผิดพลาดเกิดขึ้นภายในบล็อค
        if(login_username && login_password) {  //ตรวจสอบค่าตัวแปร Boolean ถ้าเป็น true
            db.query("select * from employee where username = ? and password = ? ",[login_username ,login_password],(err,data, fil) => {
                //console.log(data[0].fullname);
                if(data && data[0]) {
                    console.log('login : success')
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'success',
                       //results: data,
                        Result_empid: data[0].empid,
                        Result_fname: data[0].fname,
                        Result_lname: data[0].lname,
                        Result_dept_name: data[0].dept  
                    })
                } else {
                    console.log('Err 1! : not found data')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'ไม่พบข้อมูล',
                        Log: 1
                    })
                }
            })
        } else { //ฺBoolean ถ้าเป็น false
            console.log('Err 2! : Invalid data username or password')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid data username or password',
                Log: 2
            })
        }
    } catch(error) {
        console.log('Err 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
});


app.post('/api/create_signup', (req, res) => {
    
    let regfname = req.body.data_reg_fname
    let reglname = req.body.data_reg_lname;
    let regdept = req.body.data_reg_dept;
    let regsalary = req.body.data_reg_salary;
    let regemail = req.body.data_reg_email;
    let regusername = req.body.data_reg_username;
    let regpassword = req.body.data_reg_password;
    //const { username, password,fullname,email } = req.body;
    
    console.log(req.body);  //แสดง req ทั้งหมด
	try { ///ถ้าไม่มีข้อผิดพลาดเกิดขึ้นภายในบล็อค
        if (regfname && reglname && regdept && regsalary && regemail && regusername && regpassword) {  // ตรวจสอบ parameter เป็น true 
		    db.query('SELECT * FROM employee WHERE email = ?', [regemail],(error, results, fields)=> { //ตรวจสอบ email มีใน database หรือไม่
                if (results.length > 0) {  //ถ้ามีในระบบ
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'email มีการสมัครงานแล้ว กรุณาใช้ Email อืน',
                        Log: 1
                    })
                } else {  //ถ้าไม่มีในระบบ
                    db.query("insert into employee (fname,lname,dept,salary,email,username, password) values (?,?,?,?,?,?,?) ",[regfname, reglname,regdept,regsalary, regemail,regusername,regpassword],(err, resp, field) => { //ตรวจสอบ resp
                        if(resp) {
                            return res.status(200).json({
                                RespCode: 200,
                                RespMessage: "success"
                            })
                        } else {
                            console.log('ERR 2! : Bad sql')
                            return res.status(200).json({
                                RespCode: 400,
                                RespMessage: 'bad: bad sql',
                                Log: 2
                            })
                        } 
                    })
                }
            })
        } else { //ถ้า parameter เป็น false 
            console.log('ERR 2! : Invalid data')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid data',
                Log: 2
            })
        }
    } catch(error) {  //ข้อความ error ที่แสดงข้อผิดพลาดที่เกิดขึ้นภายในบล็อค
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            
            Log: 0
        })
    }
});
// *****End*****




// *********************show data *******************************


//app.get('/api/show_member/:empid', (req, res) => {
    app.get('/api/show_member/', (req, res) => {
   // 
  
    let empid = req.query.empid
    //var empid = _.get(req, ["body", "empid"]);

    try {
        if(empid) {
            db.query('select * from employee where empid = ?', [
                empid
            ],
            (err, data, fil) => {
                if(data && data[0]) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'success',
                        Result: data
                    })
                }
                else {
                    console.log('ERR 1! : not found data')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: not found data',
                        Log: 1
                    })
                }
            })
        }
        else {
            console.log('ERR 2! : Invalid data')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid data',
                Log: 2
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

   

//create
app.post('/api/createmovie', (req, res) => {    
    const moviename = req.body.name;
    const mil = req.body.mil
 
    console.log('moviename', moviename)
    console.log('mil', mil)
    console.log('create', "success")
    try {
        
        if(moviename && mil) {
            db.query('insert into tbl_movie (name, mil) values (?,?) ', [
                moviename, mil
            ], (err, resp, field) => {
                if(resp) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'success'
                    })
                }
                else {
                    console.log('ERR 2! : Bad sql')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: bad sql',
                        Log: 2
                    })
                }
            }) 
        }
        else {
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})


//get
app.get('/api/getallmovie', (req, res) => {
    try {
        db.query('select * from tbl_movie', [],
        (err, data, fil) => {
            if(data && data[0]) {

                // for (let i = 0; i < data.length; i++) {
                //     delete data[i].id                    
                // }

                return res.status(200).json({
                    
                    RespCode: 200,
                    RespMessage: 'success',
                    Result: data
                })
            }
            else {
                console.log('ERR 1! : not found data')
                return res.status(200).json({
                    RespCode: 400,
                    RespMessage: 'bad: not found data',
                    Log: 1
                })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})



//get by id
app.get('/api/getmoviebyid', (req, res) => {
    var movieid = _.get(req, ["body", "id"]);

    try {
        if(movieid) {
            db.query('select * from tbl_movie where id = ?', [
                movieid
            ],
            (err, data, fil) => {
                if(data && data[0]) {
    
                    for (let i = 0; i < data.length; i++) {
                        delete data[i].id                    
                    }
    
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'success',
                        Result: data
                    })
                }
                else {
                    console.log('ERR 1! : not found data')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: not found data',
                        Log: 1
                    })
                }
            })
        }
        else {
            console.log('ERR 2! : Invalid data')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid data',
                Log: 2
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

//update
app.put('/api/updatemovie', (req, res) => {
    var id = _.get(req, ["body", "id"]);
    var name = _.get(req, ["body", "name"]);
    var mil = _.get(req, ["body", "mil"]);

    try {
        if(id && name && mil) {
            db.query('update tbl_movie set name = ?, mil = ? where id = ?', [
                name, mil, parseInt(id)
            ], (err, data, fil) => {
                if(data) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'success',
                    })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: Update fail',
                        Log: 2
                    })
                }
            })
        }
        else {
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid data',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

//delete
app.delete('/api/deletemoviebyid', (req, res) => {
    var id = _.get(req, ["body", "id"]);

    try {
        if(id) {
            db.query('delete from tbl_movie where id = ? ', [
                parseInt(id)
            ], (err, resp, fil) => {
                if(resp) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'good',
                    })
                }
                else {
                    console.log('ERR 2! : bad sql')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: bad sql',
                        Log: 2
                    })
                }
            })
        }
        else {
            console.log('ERR 1! : Invalid id')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid id',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})





module.exports = app;