getUsers();

function getUsers() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText !== `fail` && this.responseText != "") {
          const parsed = JSON.parse(this.responseText);
          if (parsed.isAdmin == 0) {
            generateUserDetail(parsed);
            getOrder();
          } else if (parsed.isAdmin == 1) {
            generateUserDetail(parsed);
          }
          $(".loginForm-popup").css("display", "none");
          $("#auth").html(
            `<i class="fa-solid fa-user"></i> ${parsed.userName}`
          );
        } else {
          clearLoginInputs();
          $("#auth").html("Login");
          $("#userPage").html("");
          $("#orderTable").html("");
          $("#userTable").html("");
          $("#productTable").html("");
          $("#login_error_msg").html("");
          $("#addProductForm").css("display", "none");
          $("#addUserForm").css("display", "none");
          $("#editForm").css("display", "none");
          $("#adminEditProductForm").css("display", "none");
          $(".registerForm-popup").css("display", "none");
          $("#login_error_msg").css("display", "block");
          $(".loginForm-popup").css("display", "table");
        }
      } catch (err) {
        console.log(err);
      }
    }

    //debug.innerHTML = this.responseText;
  };

  xhr.open("GET", `Server/getUsers.php`);
  xhr.send(null);
}

function generateUserDetail(userObjects) {
  let combinedString = "";

  let userId = userObjects.userId;
  let username = userObjects.userName;
  let email = userObjects.email;
  let name = userObjects.name;
  let address = userObjects.userAddress;
  let phone = userObjects.phone;
  let role = userObjects.isAdmin;

  combinedString = ` <div class='user-container'>
                      <h1>Welcome back, ${username}</h1>
                      ${
                        role == 0
                          ? "<p>This is your profile page. You can see the order you've made and edit your account infomation.</p>"
                          : "<p>This is your profile page. You can Add / Edit user and product infomation.</p>"
                      }
                      <h3 class="title">${name} <i class="fa-solid fa-circle-check"></i></h3>
                      <div class="userTag">
                        <span class="tag">${role == 0 ? "user" : "admin"}</span>
                      </div>
                      <div  class='userText'>
                          <span><i class="fa-solid fa-phone"></i> ${phone}</span>
                      </div>
                      <div class='userText'>
                          <span><i class="fa-sharp fa-solid fa-location-dot"></i> ${address}</span>
                      </div>
                      <div class='userText'>
                          <span><i class="fa-solid fa-envelope"></i> ${email}</span>
                      </div>
                          <button type='button' onclick='userEdit(${userId})' class="userEditButton">Edit</button>
                          ${
                            role == 0
                              ? ""
                              : "<button type='button' onclick='trigUserList()' class='trigButton'>User List</button><button type='button' onclick='trigProductList()' class='trigButton'>Product List</button>"
                          }
                          <button type='button' onclick="signout(${userId})" class="userSignout">Signout</button>
                    </div>`;

  $("#userPage").html(combinedString);

  $("#edit_name").val(name);
  $("#edit_email").val(email);
  $("#edit_phone").val(phone);
  $("#edit_address").val(address);
}

// Get User Order History
function getOrder() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText != "") {
          const parsed = JSON.parse(this.responseText);
          $("#orderTable").html(generateOrderTable(parsed));
        }
      } catch (err) {
        console.log(err);
      }
    }

    //debug.innerHTML = this.responseText;
  };

  xhr.open("GET", `Server/getOrder.php`);
  xhr.send(null);
}

function generateOrderTable(obj) {
  let table = "<h1>Order History</h1><table class='table_userPage'>";
  table +=
    " <tr>" +
    "<th>Order ID</th>" +
    "<th>Item Name</th>" +
    "<th>Order Date</th>" +
    "</tr>";
  let itemList = obj;
  for (let i = 0; i < itemList.length; i++) table += displayRow(itemList[i]);
  table += "</table>";
  return table;
}

const displayRow = function (obj) {
  let table =
    "<tr>" +
    "<td>" +
    obj.productID +
    "</td>" +
    "<td> " +
    obj.itemName +
    "</td>" +
    "<td>" +
    obj.orderdate +
    "</td>" +
    "</tr>";
  return table;
};

// user list table
function getUserList() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText != "") {
          const parsed = JSON.parse(this.responseText);
          $("#userTable").html(generateUserTable(parsed));
        }
      } catch (err) {
        console.log(err);
      }
    }

    //debug.innerHTML = this.responseText;
  };

  xhr.open("GET", `Server/getUserList.php`);
  xhr.send(null);
}

function generateUserTable(obj) {
  let table =
    "<h1>User List</h1> <button type='button' onclick='userAddpopup()' class='userAddButton'>Add</button> <table class='table_userPage'>";
  table +=
    "<tr>" +
    "<th>User Id</th>" +
    "<th>Username</th>" +
    "<th>Name</th>" +
    "<th>Phone</th>" +
    "<th>Email</th>" +
    "<th>Address</th>" +
    "<th>Role</th>" +
    "<th>Action</th>" +
    "</tr>";
  let itemList = obj;
  for (let i = 0; i < itemList.length; i++)
    table += displayUserRow(itemList[i]);
  table += "</table>";
  return table;
}

const displayUserRow = function (obj) {
  let params = {
    userId: obj.userId,
    userName: obj.userName,
    name: obj.name,
    phone: obj.phone,
    email: obj.email,
    address: obj.userAddress,
    role: obj.isAdmin,
  };
  let table = `<tr>
      <td>
      ${obj.userId}
      </td>
      <td>
      ${obj.userName}
      </td>
      <td>
      ${obj.name}
      </td>
      <td>
      ${obj.phone}
      </td>
      <td>
      ${obj.email}
      </td>
      <td>
      ${obj.userAddress}
      </td>
      <td>
      ${obj.isAdmin == 0 ? "User" : "Admin"}
      </td>
      <td>
      <button type='button' onclick='adminEditUser(${params.userId},"${
    params.name
  }","${params.phone}","${params.email}","${
    params.address
  }")' class="adminEditButton">Edit</button>
      </td>
      </tr>`;
  return table;
};

function trigUserList() {
  $("#productTable").html("");
  getUserList();
}

function trigProductList() {
  $("#userTable").html("");
  getProductList();
}
