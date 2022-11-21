let login_username = document.getElementById("login_username");
let login_password = document.getElementById("login_password");

let btn_login = document.getElementById("btn_login");

btn_login.addEventListener("click", Login);

function Login(e) {
  e.preventDefault();

  let username = login_username.value;
  let password = login_password.value;

  let params = "";

  if (username == "") {
    $("#login_error_msg").html("Please enter username");
    $("#login_error_msg").css("display", "block");
    return;
  } else if (password.length < 6 || password == "") {
    $("#login_error_msg").html(
      "Password must be at least 6 characters in length"
    );
    $("#login_error_msg").css("display", "block");
    return;
  } else {
    params = {
      username: username,
      password: password,
    };
    $("#login_error_msg").html("");
    $("#login_error_msg").css("display", "none");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "Server/login.php");

    xhr.setRequestHeader(
      "Content-Type",
      "application/application/x-www-form-urlencoded"
    );

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 || this.status === 200) {
        try {
          if (this.responseText == `success`) {
            clearLoginInputs();
            $("#login_error_msg").html("Login Success!");
            $("#login_error_msg").css("display", "block");
            getUsers();
          } else {
            clearLoginInputs();
            $("#login_error_msg").html("username or password not match!");
            $("#login_error_msg").css("display", "block");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    xhr.send(JSON.stringify(params));
  }
}

const clearLoginInputs = () => {
  const inputs = document.querySelectorAll("#login_username, #login_password");

  inputs.forEach((input) => {
    input.value = "";
  });
};

$(".signup").on("click", function () {
  $(".loginForm-popup").css("display", "none");
  $(".registerForm-popup").css("display", "table");
});
