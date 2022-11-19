let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (this.readyState != 4 || this.status != 200)
        return;

}

xhr.open("GET", `Server/uponVisit.php`);
xhr.send();



const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function(event){
    event.preventDefault();
    getProducts();
});

const submitLoginBtn = document.getElementById("submitLogin");
submitLoginBtn.addEventListener("click", function(event){
    event.preventDefault();
    
});
