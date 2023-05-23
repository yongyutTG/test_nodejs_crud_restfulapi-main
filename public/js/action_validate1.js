
const input = document.getElementById("input_username");
// fires when a page is loaded fully
window.addEventListener("load", (e)=>{
   input.focus(); // adding the focus
})
//function Login
function validate_login() { 
    var error_msg_login = $("#error_msg_login");
    var chk_username = $("#input_username");
    var chk_password = $("#input_password");
    var validate_login_status = true;

    $(error_msg_login).hide();

    if (chk_username.val() == ""|| (chk_username).val().length <= 0){
        $(error_msg_login).show();
        error_msg_login.html("กรุณากรอก Username").css("color", "red")
        chk_username.css("border", " 1px solid red ");
        document.getElementById("input_username").focus();

        validate_login_status = false;
        return 
    } else {
        chk_username.css("border",  "unset");
        validate_login_status = true;
    }
    if (chk_password.val() == ""|| (chk_password).val().length <= 0){
        $(error_msg_login).show();
        error_msg_login.html("กรุณากรอก Password").css("color", "red")
        chk_password.css("border", " 1px solid red ");
        document.getElementById("input_password").focus();

        validate_login_status = false;
        return
    } else {
        chk_password.css("border", "unset");
        validate_login_status = true;
    }

    return validate_login_status;

}

function goto_login(){
    var login_username = $("#input_username");
    var login_password = $("#input_password");
    var msg_login = $("#error_msg_login");
    $(msg_login).hide();

    if (validate_login()){
        console.log("login submit successfully");
        $.ajax({
            method: 'POST',
            url: './api/action.php',
            data: {
                data_login_username: login_username.val(), //ส่ง Req
                data_login_password: MD5(login_password.val()),
                data_login : "login",
            },
            //success: (response) => {
            success: function(response) {
                console.log('response login success', response)
                if (response.RespCode == 200) {
                    //get response ไว้ใน localStorage
                    localStorage.setItem('id', response.Result.ID)
                    localStorage.setItem('token', response.Result.Token)
                     window.location.href = './page.html'  
                } else if (response.RespCode == 404 ) {
                    msg_login.show();
                    msg_login.html("Username ไม่ถูกต้อง").css("color", "red")
                    login_username.focus();
                } else if (response.RespCode == 400) {
                    msg_login.show();
                    msg_login.html("Password ไม่ถูกต้อง").css("color", "red")
                    login_password.focus();
                }
            },
            error: (err) => {
                console.log('bad', err)
            }
        })
    }
}

//function goto_forget
//ตรวจสอบการกรอกข้อมูลลืมรหัสผ่าน
function validate_forget(){
    var error_msg_forget = $("#error_msg_forget");
    var chk_forget_fullname = $("#txt_modal_forget_fullname");
    var chk_forget_forget_email = $("#txt_modal_forget_email");
    var chk_forget_new_password = $("#txt_modal_forget_new_password");
  
    var validate_forget_status = true;
    
    $(error_msg_forget).hide();

    if ($(chk_forget_fullname).val== "" || ($(chk_forget_fullname).val().length <= 0)){
        $(error_msg_forget).show();
        error_msg_forget.html("กรุณากรอก Fullname").css("color", "red")
        document.getElementById("txt_modal_forget_fullname").focus();

        validate_forget_status = false;
        return 

    } else if ($(chk_forget_forget_email).val== "" || ($(chk_forget_forget_email).val().length <= 0)){
        $(error_msg_forget).show();
        error_msg_forget.html("กรุณากรอก Email").css("color", "red")
        document.getElementById("txt_modal_forget_email").focus();   

        validate_forget_status = false;
        return 

    } else if ($(chk_forget_new_password).val== "" || ($(chk_forget_new_password).val().length <= 0)){
        $(error_msg_forget).show();
        error_msg_forget.html("กรุณากรอก Newpassword").css("color", "red")
        document.getElementById("txt_modal_forget_new_password").focus();

        validate_forget_status = false;
        return
    }

    var forget_email = document.getElementById('txt_modal_forget_email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(forget_email.value)) {
        $(error_msg_forget).show();
        error_msg_forget.html("รูปแบบ Email ไม่ถูกต้อง").css("color", "red")
        document.getElementById("txt_modal_forget_email").focus();

        validate_forget_status = false;
        return
    }

    return validate_forget_status;
}

function goto_forget() {
    var forget_fullname = $("#txt_modal_forget_fullname");
    var forget_email = $("#txt_modal_forget_email");
    var forget_new_password = $("#txt_modal_forget_new_password");
    var msg_forget = $("#error_msg_forget");
    $(msg_forget).hide();

    if (validate_forget()){
        console.log('go!!')
        $.ajax({
            method: 'POST',
            url: './api/action.php',
            data: {
                data_forget_fullname: $(forget_fullname).val(),
                data_forget_email: $(forget_email).val(),
                data_forget_new_password: MD5($(forget_new_password).val()),
                data_forget :"forget",
            },
            //success: (response) => {
                success: function(response) {
                console.log('response forget success', response)
                if (response.RespCode == 200) {
                    //เก็บ response ใน localStorage
                    msg_forget.show();
                    msg_forget.html("ทำรายการลืม password success").css("color", "green")
                } else if (response.RespCode == 404) {
                    msg_forget.show();
                    msg_forget.html("Email คุณไม่ได้ลงทะเบียน!").css("color", "red")
                }
            },
            error: function(err) {
                console.log('bad', err)
            }
        })
    }
}
function validate_register(){
    var error_msg_register = $("#error_msg_register");
    var chk_register_fullname = $("#txt_modal_register_fullname");
    var chk_register_username = $("#txt_modal_register_username");
    var chk_register_password = $("#txt_modal_register_password");
    var chk_register_email = $("#txt_modal_register_email");

    var validate_register_status = true ;
    error_msg_register.hide();

    if ($(chk_register_fullname).val== "" || ($(chk_register_fullname).val().length <= 0)) {
        
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก Fullname").css("color", "red")
        document.getElementById("txt_modal_register_fullname").focus();

        validate_register_status = false;
        return

    } else if ($(chk_register_username).val().length <= 0) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก Username").css("color","red")
        document.getElementById("txt_modal_register_username").focus();

        validate_register_status = false;
        return

    } else if ($(chk_register_password).val().length <= 3) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก Password").css("color","red")
        document.getElementById("txt_modal_register_password").focus();

        validate_register_status = false;
        return

    } else if ($(chk_register_email).val().length <= 0) {
        error_msg_register.show();
        error_msg_register.html("กรุณากรอก Email").css("color","red")
        document.getElementById("txt_modal_register_email").focus();

        validate_register_status = false;
        return
    
    } 

    var register_email = document.getElementById('txt_modal_register_email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(register_email.value)) {
        $(error_msg_register).show();
        error_msg_register.html("รูปแบบ Email ไม่ถูกต้อง").css("color", "red")
        document.getElementById("txt_modal_register_email").focus();
        validate_register_status = false;
        return
    }

    return validate_register_status ;
}
//ตรวจสอบการกรอกข้อมูลลงทะเบียนร
function goto_register() { 
    var error_msg_register = $("#error_msg_register");
    var register_fullname = $("#txt_modal_register_fullname");
    var register_username = $("#txt_modal_register_username");
    var register_password = $("#txt_modal_register_password");
    var register_email = $("#txt_modal_register_email");
    $(error_msg_register).hide();
  
    if (validate_register()) {
        console.log('go!!')
        $.ajax({
            method: 'POST',
            url: './api/action.php',
            data: {
                data_reg_fullname: $(register_fullname).val(),
                data_reg_username: $(register_username).val(),
                data_reg_password: MD5($(register_password).val()),
                data_reg_email: $(register_email).val(),
                data_register : "register",
            },
            success: (response) => {
                console.log('response register success', response)
                if (response.RespCode == 200) {
                    window.location.href = './index.html'
                } else if (response.RespCode == 400) {
                    ($('#txt_modal_register_email').focus());
                    Swal.fire({
                        icon: 'error',
                        title: 'Email ซ้ำ กรุณาใช้ email อื่น!'
                    })
                }
            },
            error: function(err) {
                console.log('bad', err)
            }
        })
    }
}


//logout 
function gotologout() {
    $.ajax({
        method: 'post',
        dataType: 'json',
        url: './api/logout.php',
        data: {
            id: localStorage.id
        },
        success: function(response) {
            console.log(' gotologout success', response)
            if (response.RespCode == 200) {
                localStorage.clear();
                let timerInterval
                    Swal.fire({
                        title: 'Auto close alert!',
                        html: 'I will close in <b></b> milliseconds.',
                        timer: 500,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then(() => {
                        window.location.href = './index.html'
                    })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!'
                })
            }
        },
        error: (err) => {
            console.log('bad', err)
        }
    });
}

function gotosave() {
    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: './api/action.php',
        data: {
            data_save_token: localStorage.token,
            data_save_username: $("#txt_username").val(),
            data_save_fullname: $("#txt_fullname").val(),
            data_save_email: $("#txt_email").val(),
            data_save : "save"
        },
        success: function(response) {
            console.log(' response save success', response)
            if (response.RespCode == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Save success', // timer: 1000 
                }).then(() => {
                    window.location.href = './page.html'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!'
                })
            }
        },
        error: (err) => {
            console.log('bad', err)
        }
    });
}