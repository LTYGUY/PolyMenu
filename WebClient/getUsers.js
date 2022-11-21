getUsers();

function getUsers() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText !== `fail`) {
          const parsed = JSON.parse(this.responseText);
          if (parsed.isAdmin == 0) {
            generateUserTable(parsed);
            getOrder();
          }
          $(".loginForm-popup").css("display", "none");
          $("#auth").html(
            `<i class="fa-solid fa-user"></i> ${parsed.userName}`
          );
        } else {
          clearLoginInputs();
          $("#auth").html("Login");
          $("#userPage").html("");
          $("#login_error_msg").html("");
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

function generateUserTable(userObjects) {
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
                      <p>This is your profile page. You can see the order you've made and edit your account infomation.</p>
                      <h3 class="title">${name} <i class="fa-solid fa-circle-check"></i></h3>
                      <div class="userTag">
                        <span class="tag">${role ? "user" : "guest"}</span>
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
                          <button type='button' onclick="signout(${userId})" class="userSignout">Signout</button>
                      
                    </div>`;

  $("#userPage").html(combinedString);

  $("#edit_name").val(name);
  $("#edit_email").val(email);
  $("#edit_phone").val(phone);
  $("#edit_address").val(address);
}

function getOrder() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        // havent done yet for order history
        const parsed = JSON.parse(this.responseText);
        console.log(parsed);
        for (let i = 0; i < parsed.length; i++) {
          console.log(parsed[i]);
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
