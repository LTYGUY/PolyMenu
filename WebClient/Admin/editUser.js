function userEdit(userId) {
  $("#editForm").css("display", "table");
  $(".user-container").css("display", "none");
}

function userEditCancel() {
  $("#editForm").css("display", "none");
  $(".user-container").css("display", "table");
}

let edit_name = document.getElementById("edit_name");
let edit_email = document.getElementById("edit_email");
let edit_phone = document.getElementById("edit_phone");
let edit_address = document.getElementById("edit_address");

let btn_edit = document.getElementById("btn_edit");

btn_edit.addEventListener("click", EditUserProfile);

function EditUserProfile(e) {
  e.preventDefault();
  let name = edit_name.value;
  let email = edit_email.value;
  let phone = edit_phone.value;
  let address = edit_address.value;

  let params = "";

  if (name == "") {
    $("#edit_error_msg").html("Please enter your name");
    $("#edit_error_msg").css("display", "block");
    return;
  } else if (email == "" || !validateEmail(email)) {
    $("#edit_error_msg").html("Email not valid");
    $("#edit_error_msg").css("display", "block");
    return;
  } else if (phone == "") {
    $("#edit_error_msg").html("Please enter your phone");
    $("#edit_error_msg").css("display", "block");
    return;
  } else if (address == "") {
    $("#edit_error_msg").html("Please enter your address");
    $("#edit_error_msg").css("display", "block");
    return;
  } else {
    params = {
      name: name,
      email: email,
      address: address,
      phone: phone,
    };

    $("#edit_error_msg").html("");
    $("#edit_error_msg").css("display", "none");
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "Server/editUser.php");

  xhr.setRequestHeader(
    "Content-Type",
    "application/application/x-www-form-urlencoded"
  );

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText == `success`) {
          $("#editForm").css("display", "none");
          location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  xhr.send(JSON.stringify(params));
}

// Admin edit user
function adminEditUser(userId, name, phone, email, address) {
  $("#adminEdit_userId").val(userId);
  $("#adminEdit_name").val(name);
  $("#adminEdit_email").val(email);
  $("#adminEdit_phone").val(phone);
  $("#adminEdit_address").val(address);

  $("#adminEditForm").css("display", "table");
  $("#userTable").html("");
}

function adminUserEditCancel() {
  $("#adminEditForm").css("display", "none");
  getUserList();
}

let btn_adminUserEdit = document.getElementById("btn_adminUserEdit");

btn_adminUserEdit.addEventListener("click", EditAdminUserProfile);

function EditAdminUserProfile(e) {
  e.preventDefault();
  let userId = $("#adminEdit_userId").val();
  let name = $("#adminEdit_name").val();
  let email = $("#adminEdit_email").val();
  let phone = $("#adminEdit_phone").val();
  let address = $("#adminEdit_address").val();

  let params = "";

  if (name == "") {
    $("#adminEdit_error_msg").html("Please enter your name");
    $("#adminEdit_error_msg").css("display", "block");
    return;
  } else if (email == "" || !validateEmail(email)) {
    $("#adminEdit_error_msg").html("Email not valid");
    $("#adminEdit_error_msg").css("display", "block");
    return;
  } else if (phone == "") {
    $("#adminEdit_error_msg").html("Please enter your phone");
    $("#adminEdit_error_msg").css("display", "block");
    return;
  } else if (address == "") {
    $("#adminEdit_error_msg").html("Please enter your address");
    $("#adminEdit_error_msg").css("display", "block");
    return;
  } else {
    params = {
      userId: userId,
      name: name,
      email: email,
      address: address,
      phone: phone,
    };

    $("#adminEdit_error_msg").html("");
    $("#adminEdit_error_msg").css("display", "none");
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "Server/adminEditUser.php");

  xhr.setRequestHeader(
    "Content-Type",
    "application/application/x-www-form-urlencoded"
  );

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText == `success`) {
          $("#adminEditForm").css("display", "none");
          getUserList();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  xhr.send(JSON.stringify(params));
}
