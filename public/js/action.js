
let input = document.querySelector("#input_username");
// fires when a page is loaded fully
window.addEventListener("load", (e)=>{
  input.focus(); // adding the focus
})

// ------------------------------code funtion หน้า login 
function goto_login() { 
    const error_msg_login = $("#error_msg_login");
    $(error_msg_login).hide();

    // Get the username and password values
    let check_username = document.getElementById("input_username").value;
    let check_password = document.getElementById("input_password").value;
    // console.log(`Logging in with username: ${check_username} and password: ${check_password}`);

    if (check_username.length <= 0 || (check_username == null )){
        $(error_msg_login).show();
        error_msg_login.html("กรุณากรอก Username").css("color", "red")
        // $("#input_username").css("border", " 1px solid red ");
        document.getElementById("input_username").focus();
        return false

    } else if (check_password.length <= 0 || (check_password == "")){
        $(error_msg_login).show();
        error_msg_login.html("กรุณากรอก Password").css("color", "red")
        $("#input_password").css("border", " 1px solid red ");
        document.getElementById("input_password").focus();
        return false
        
    } else {
        $("#input_username").css("border", "unset");
        $("#input_password").css("border", "unset");
        console.log(" login Request ");

        // var md5 = require('md5');

        // var hash = md5(check_password);

        // console.log(hash); // 8ba6c19dc1def5702ff5acbf2aeea5aa

        $.ajax({
            method: 'post',
            url: 'http://localhost:3000/api/login',
            data: {  
                //data_login_username: $(forget_fullname).val(),
                data_login_username: check_username, //ส่ง Req      //คือ ส่งทั้ง form $('#signupform').serialize(),
                data_login_password: check_password,
            },
            success: (response) => {
                console.log('response login success')
                if (response.RespCode == 200) {
                localStorage.setItem('empid', response.Result_empid)
                localStorage.setItem('fname', response.Result_fname)   
                localStorage.setItem('lname', response.Result_lname)   
                localStorage.setItem('dept', response.Result_dept_name)   

                //  window.location.href = './views/page.html'
                 window.location.href = './views/emp_personal1.html'
                 
                } else if (response.RespCode == 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'User หรือ Password ไม่ถูกต้อง!', timer: 10000 
                    })
                    
                }
            },
            error: (err) => {
                console.log('bad', err)
            }
        })
    }
}

function goto_register(){
    const error_msg_register = $("#error_msg_register");
    error_msg_register.hide();
    const check_register_fname = document.getElementById("txt_modal_register_fname").value;
    const check_register_lname = document.getElementById("txt_modal_register_lname").value;
    const check_register_dept = document.getElementById("txt_modal_register_dept").value;
    const check_register_salary = document.getElementById("txt_modal_register_salary").value;
    const check_register_username = document.getElementById("txt_modal_register_username").value;
    const check_register_password = document.getElementById("txt_modal_register_password").value;
    const check_register_email = document.getElementById("txt_modal_register_email").value;
    // const check_register_fname = $("#txt_modal_register_fname")



    //let check_format_register_email = document.getElementById("txt_modal_register_email");
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


    //Fullname
    if (check_register_fname.length <= 0 || (check_register_fname == "" )) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก fname").css("color", "red") 
        document.getElementById("txt_modal_register_fname").focus();
        return false
    //Username
    } else if (check_register_lname.length <= 0) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก lastname").css("color","red")
        document.getElementById("txt_modal_register_lname").focus();
        return false
    } else if (check_register_dept.length <= 0) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก Department").css("color","red")
        document.getElementById("txt_modal_register_dept").focus();
        return false
    } else if (check_register_salary.length <= 0) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก Salary").css("color","red")
        document.getElementById("txt_modal_register_salary").focus();
        return false

    } else if (check_register_username.length <= 0) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก Username").css("color","red")
        document.getElementById("txt_modal_register_username").focus();
        return false
    
    } else if (check_register_password.length <= 0) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก Password").css("color","red")
        document.getElementById("txt_modal_register_password").focus();
        return false
    //fomat email
    } else if (!filter.test(check_register_email)) {
        $(error_msg_register).show();
        error_msg_register.html("รูปแบบ Email ไม่ถูกต้อง").css("color", "red")
        document.getElementById("txt_modal_register_email").focus();
        return false 
    
    } else {
        console.log("Register Request")
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/api/create_signup',
            data: {
                data_reg_fname : check_register_fname,
                data_reg_lname : check_register_lname,
                data_reg_dept : check_register_dept,
                data_reg_salary : check_register_salary,
                data_reg_email : check_register_email,
                data_reg_username : check_register_username,
                data_reg_password: check_register_password,
            },
         
            success: function(response) {
                console.log("Response Register Success")
                if (response.RespCode == 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'register success', // timer: 1000 
                    })

                } else if (response.RespCode == 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email ซ้ำ กรุณาใช้ email อื่น!'
                    })
                    //$("#closeaddmodal").trigger('click')
                }
            },
            error: function(err) {
                console.log('bad', err)
            }

        })
    }

}


// ---------------------------------หน้า รายละเอียดสมาชิก-----------------------------------------------------------
// ------------------------------code funtion หน้า show 







var data;
var movieid = 0;

$(document).ready(() => {
    render();
})

function render() {
    //get
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/api/getallmovie',
        success: function(response) {
        // success: (response) => {
            console.log('render all', response)
            if(response.RespCode == 200) {
                data = response.Result;
                if(data.length > 0) {
                    var html = '';
                    for (let i = 0; i < data.length; i++) {
                        html += `
                            <tr>
                                <th scope="row">${i+1}</th>
                                <td>${data[i].name}</td>
                                <td>${gettimetodate(data[i].mil)}</td>
                                <td>
                                    <button onclick="editmovie(${data[i].id}, ${i})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modaledit">Edit</button>
                                    <button onclick="deletemovie(${data[i].id}, ${i}, '${data[i].name}')" type="button" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        `;
                    }
                    $("#tbody").html(html)
                }
            }
        }, error: (err) => {
            console.log('bad', err)
        }
    })
}

function gettimetodate(mil) {
    mil = parseInt(mil)
    var d = new Date(mil)
    var dd = d.getDate() < 10 ? '0'+d.getDate() : d.getDate();
    var dm = (d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
    var dy = d.getFullYear();
    var th = d.getHours() < 10 ? '0'+d.getHours() : d.getHours();
    var tm = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes();
    var ts = d.getSeconds() < 10 ? '0'+d.getSeconds() : d.getSeconds();

    return `${dy}/${dm}/${dd} ${th}:${tm}:${ts}`
}


//create
function savemovie() {
    $(error_msg_add).hide();
    const check_register_name = document.getElementById("txtaddmodal").value;
    if (check_register_name.length <= 0 ) {
        $(error_msg_add).show();
        document.getElementById("txtaddmodal").focus();
        error_msg_add.html("กรุณากรอก name").css("color","red")
        return false 
    } else {
        console.log("Register Request")
        $.ajax({
            method: 'post',
            url: 'http://localhost:3000/api/createmovie',
            data: {
                name: $("#txtaddmodal").val(),
                mil: new Date().getTime()
            }, success: (response) => {
                console.log('save', response)
                if (response.RespCode == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Add movie successfully'
                    })
                    $("#closeaddmodal").trigger('click')
                    render();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'กรุณาตรวจสอบ API'
                    })
                }
            }, error: (err) => {
            
                console.log('bad', err)
            }
        })
    }
}

function editmovie(mid, index) {
    $("#txteditmodal").val(data[index].name)
    
    movieid = mid;
}

function updatemovie() {
    $.ajax({
        method: 'put',
        url: 'http://localhost:3000/api/updatemovie',
        data: {
            id: parseInt(movieid),
            name: $("#txteditmodal").val(),
            mil: new Date().getTime()
        }, success: (response) => {
            console.log('update', response)
            if(response.RespCode == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update successfully'
                })
                $("#closeeditmodal").trigger('click')
                render();
            } else if (response.RespCode == 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณากรอกข้อมูล'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณาตรวจสอบ API'
                })
            }
        }, error: (err) => {
            console.log('bad', err)
        }
    })
}

function deletemovie(mid, index, name) {
    Swal.fire({
        icon: "warning",
        title: 'Are you sure to delete '+ name +'?',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `DELETE`,
    }).then((result) => {
        if (result.isDenied) {
            $.ajax({
                method: "delete",
                url: 'http://localhost:3000/api/deletemoviebyid',
                data: {
                    id: mid
                }, success: (response) => {
                    console.log('good', response)
                    if(response.RespCode == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Delete successfully'
                        })
                        render();
                    }
                }, error: (err) => {
                    console.log('bad', err)
                }
            })
        }
    })
}



function gotologout() {
    Swal.fire({
        icon: "warning",
        title: 'Are you sure to Logout ?',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Logout`,
    }).then((result) => {
        if (result.isDenied) {
    window.location.href = '../index.html'
        }
    })
}
