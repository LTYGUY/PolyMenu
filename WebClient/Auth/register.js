let register_username = document.getElementById("register_username");
let register_password = document.getElementById("register_password");
let confirm_password = document.getElementById("confirm_password");
let register_name = document.getElementById("register_name");
let register_email = document.getElementById("register_email");
let register_phone = document.getElementById("register_phone");
let register_address = document.getElementById("register_address");
let btn_register = document.getElementById("btn_register");

btn_register.addEventListener("click", Register);

function Register(e) {
  e.preventDefault();

  let username = register_username.value;
  let password = register_password.value;
  let cfm_password = confirm_password.value;
  let name = register_name.value;
  let email = register_email.value;
  let phone = register_phone.value;
  let address = register_address.value;

  let params = "";

  if (username == "") {
    $("#register_error_msg").html("Please enter username");
    $("#register_error_msg").css("display", "block");
    return;
  } else if (password.length < 6 || password == "") {
    $("#register_error_msg").html(
      "Password must be at least 6 characters in length"
    );
    $("#register_error_msg").css("display", "block");
    return;
  } else if (cfm_password.length < 6 || cfm_password == "") {
    $("#register_error_msg").html(
      "Confirm Password must be at least 6 characters in length"
    );
    $("#register_error_msg").css("display", "block");
    return;
  } else if (name == "") {
    $("#register_error_msg").html("Please enter your name");
    $("#register_error_msg").css("display", "block");
    return;
  } else if (email == "" || !validateEmail(email)) {
    $("#register_error_msg").html("Email not valid");
    $("#register_error_msg").css("display", "block");
    return;
  } else if (phone == "") {
    $("#register_error_msg").html("Please enter your phone");
    $("#register_error_msg").css("display", "block");
    return;
  } else if (address == "") {
    $("#register_error_msg").html("Please enter your address");
    $("#register_error_msg").css("display", "block");
    return;
  } else {
    params = {
      username: username,
      password: password,
      name: name,
      email: email,
      phone: phone,
      address: address,
    };
    $("#register_error_msg").html("");
    $("#register_error_msg").css("display", "none");
  }

  if (password == cfm_password) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "Server/register.php");

    xhr.setRequestHeader(
      "Content-Type",
      "application/application/x-www-form-urlencoded"
    );

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 || this.status === 200) {
        try {
          if (this.responseText == `success`) {
            clearInputs();
            $("#register_error_msg").html("Registration Success");
            $("#register_error_msg").css("display", "block");
          } else {
            $("#register_error_msg").html(this.responseText);
            $("#register_error_msg").css("display", "block");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    xhr.send(JSON.stringify(params));
  }
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const clearInputs = () => {
  const inputs = document.querySelectorAll(
    "#register_username, #register_password,#confirm_password,#register_name,#register_email,#register_phone,#register_address"
  );

  inputs.forEach((input) => {
    input.value = "";
  });
};

$(".signin").on("click", function () {
  $(".loginForm-popup").css("display", "table");
  $(".registerForm-popup").css("display", "none");
});
