const debug = document.getElementById("debug");
const cartContainer = document.getElementById("cartContainer");

function addToCart(productID){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState != 4 || this.status != 200)
            return;

            //very good for debugging
            debug.innerHTML = this.responseText;

        const parsed = JSON.parse(this.responseText);

        // generateTable(parsed);
    }

    xhr.open("GET", `Server/addToCart.php?addToCart=` + productID);
    xhr.send();
}

function removeFromCart(productID)
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState != 4 || this.status != 200)
            return;

            //very good for debugging
            debug.innerHTML = this.responseText;

        const parsed = JSON.parse(this.responseText);

        //generateTable(parsed);
    }

    xhr.open("GET", `Server/addToCart.php?removeFromCart=` + productID);
    xhr.send();
}

// function generateTable(productObjects){
//     let combinedString = "";

//     for(let i = 0;i < productObjects.length; i++)
//     {
//         let amount = productObjects[i].amount;
//         let product = productObjects[i].product;

//         combinedString += `<div class='item'>
//                         <div class='itemImage'>
//                             <img src='${product.image}' alt='${product.itemName}'>
//                         </div>
//                         <div>
//                             <span>${amount}</span>
//                         </div>
//                         <div class='itemPrice'>
//                             <span>$${product.price}</span>
//                         </div>
//                         <div class='itemTitle'>
//                             <span>${product.itemName}</span>
//                         </div>
//                         <div class='itemAddButton'>
//                             <span><button type='button' onclick='addToCart(${product.productID})'>Add</button></span>
//                         </div>
//                         <div class='itemRemoveButton'>
//                             <span><button type='button' onclick='removeFromCart(${product.productID})'>Add</button></span>
//                         </div>
//                     </div>`;
//     }

//     cartContainer.innerHTML = combinedString;
// }