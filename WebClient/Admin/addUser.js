function userAddpopup(userId) {
  $("#addUserForm").css("display", "table");
  $("#userTable").html("");
}

function adminUserAddCancel() {
  $("#addUserForm").css("display", "none");
  getUserList();
}

let btn_addUser = document.getElementById("btn_addUser");
btn_addUser.addEventListener("click", AddUser);

function AddUser(e) {
  e.preventDefault();

  let addUser_username = document.getElementById("addUser_username");
  let addUser_password = document.getElementById("addUser_password");
  let addUserconfirm_password = document.getElementById(
    "addUserconfirm_password"
  );
  let addUser_name = document.getElementById("addUser_name");
  let addUser_email = document.getElementById("addUser_email");
  let addUser_phone = document.getElementById("addUser_phone");
  let addUser_address = document.getElementById("addUser_address");
  let addUser_roleUser = document.getElementById("addUser_roleUser");
  let addUser_roleAdmin = document.getElementById("addUser_roleAdmin");

  let username = addUser_username.value;
  let password = addUser_password.value;
  let cfm_password = addUserconfirm_password.value;
  let name = addUser_name.value;
  let email = addUser_email.value;
  let phone = addUser_phone.value;
  let address = addUser_address.value;
  let role = 0;
  if (addUser_roleAdmin.checked == true) {
    role = 1;
  }

  let params = "";

  if (username == "") {
    $("#addUser_error_msg").html("Please enter username");
    $("#addUser_error_msg").css("display", "block");
    return;
  } else if (password.length < 6 || password == "") {
    $("#addUser_error_msg").html(
      "Password must be at least 6 characters in length"
    );
    $("#addUser_error_msg").css("display", "block");
    return;
  } else if (cfm_password.length < 6 || cfm_password == "") {
    $("#addUser_error_msg").html(
      "Confirm Password must be at least 6 characters in length"
    );
    $("#addUser_error_msg").css("display", "block");
    return;
  } else if (name == "") {
    $("#addUser_error_msg").html("Please enter your name");
    $("#addUser_error_msg").css("display", "block");
    return;
  } else if (email == "" || !validateEmail(email)) {
    $("#addUser_error_msg").html("Email not valid");
    $("#addUser_error_msg").css("display", "block");
    return;
  } else if (phone == "") {
    $("#addUser_error_msg").html("Please enter your phone");
    $("#addUser_error_msg").css("display", "block");
    return;
  } else if (address == "") {
    $("#addUser_error_msg").html("Please enter your address");
    $("#addUser_error_msg").css("display", "block");
    return;
  } else {
    params = {
      username: username,
      password: password,
      name: name,
      email: email,
      phone: phone,
      address: address,
      role: role,
    };
    $("#addUser_error_msg").html("");
    $("#addUser_error_msg").css("display", "none");
  }

  if (password == cfm_password) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "Server/addUser.php");

    xhr.setRequestHeader(
      "Content-Type",
      "application/application/x-www-form-urlencoded"
    );

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 || this.status === 200) {
        try {
          if (this.responseText == `success`) {
            clearAddUserInputs();
            $("#addUser_error_msg").html("Added user Success");
            $("#addUser_error_msg").css("display", "block");
          } else {
            $("#addUser_error_msg").html(this.responseText);
            $("#addUser_error_msg").css("display", "block");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    xhr.send(JSON.stringify(params));
  }
}

const clearAddUserInputs = () => {
  const inputs = document.querySelectorAll(
    "#addUser_username, #addUser_password,#addUserconfirm_password,#addUser_name,#addUser_email,#addUser_phone,#addUser_address"
  );

  inputs.forEach((input) => {
    input.value = "";
  });
};
