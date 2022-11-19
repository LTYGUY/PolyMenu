getUsers();

function getUsers()
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
            if (this.readyState != 4 || this.status != 200)
                return;

            //debug.innerHTML = this.responseText;

        }
    
        xhr.open("GET", `Server/getUsers.php`);
        xhr.send();
}
