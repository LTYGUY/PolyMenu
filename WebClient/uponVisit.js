let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (this.readyState != 4 || this.status != 200)
        return;

}

xhr.open("GET", `Server/uponVisit.php`);
xhr.send();

