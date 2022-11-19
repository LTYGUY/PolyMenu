const welcome = document.getElementById("welcome");

let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState != 4 || this.status != 200)
            return;

            if (this.responseText == "")
            {
                welcome.innerHTML = "Welcome to XYZ Online Shop";
            }
            else
            {
                welcome.innerHTML = `Welcome back. Your last visit was ${this.responseText}`;
            }
    }
    xhr.open("GET", `cookie.php`);
    xhr.send();