function signout(userId) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "Server/signout.php");

  xhr.setRequestHeader(
    "Content-Type",
    "application/application/x-www-form-urlencoded"
  );

  let params = {
    userId: userId,
  };

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText == `success`) {
          getUsers();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  xhr.send(JSON.stringify(params));
}
