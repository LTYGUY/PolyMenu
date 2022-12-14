const debug = document.getElementById("debug");
const cartContainer = document.getElementById("cartContainer");
const menuCartBtn = document.getElementById("menuCartNav");
const submitOrderStatus = document.getElementById("submitOrderStatus");

getCart();

function getCart() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState != 4 || this.status != 200) return;

    //very good for debugging
    //debug.innerHTML = this.responseText;

    const parsed = JSON.parse(this.responseText);

    generateCartTable(parsed);
  };

  xhr.open("GET", `Server/getCart.php`);
  xhr.send();
}

function clearCart() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState != 4 || this.status != 200) return;

    const parsed = [];
    generateCartTable(parsed);
  };

  xhr.open("GET", `Server/clearCart.php`);
  xhr.send();
}

function submitCart() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState != 4 || this.status != 200) return;

    //debug.innerHTML = this.responseText;
    const parsed = this.responseText;
    if (parsed == `success`) {
      clearCart();

      submitOrderStatus.innerHTML = "Order Successfully submitted!";
    } else {
      submitOrderStatus.innerHTML = parsed;
    }
  };

  xhr.open("GET", `Server/submitCart.php`);
  xhr.send();
}

function addToCart(productID) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState != 4 || this.status != 200) return;

    //very good for debugging
    //debug.innerHTML = this.responseText;

    const parsed = JSON.parse(this.responseText);

    generateCartTable(parsed);
  };

  xhr.open("GET", `Server/addToCart.php?addToCart=` + productID);
  xhr.send();
}

function removeFromCart(productID) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState != 4 || this.status != 200) return;

    //very good for debugging
    //debug.innerHTML = this.responseText;

    const parsed = JSON.parse(this.responseText);

    generateCartTable(parsed);
  };

  xhr.open("GET", `Server/removeFromCart.php?removeFromCart=` + productID);
  xhr.send();
}

function generateCartTable(productObjects) {
  // if (submitOrderStatus != "")
  //     submitOrderStatus.innerHTML = "";

  let combinedString = "";
  let totalItems = 0;

  for (let i = 0; i < productObjects.length; i++) {
    let amount = productObjects[i].amount;
    let product = productObjects[i].product;
    totalItems += amount;

    combinedString += `<div class='cartItem'>
                        <div class='itemImage'>
                            <img src='${product.image}' alt='${product.itemName}'>
                        </div>
                        <div>
                            <span>${amount}</span>
                        </div>
                        <div class='itemPrice'>
                            <span>$${product.price}</span>
                        </div>
                        <div class='itemTitle'>
                            <span>${product.itemName}</span>
                        </div>
                        <div class='itemBottomPart'>
                            <div>
                                <span><button type='button' onclick='addToCart(${product.productID})'>Add</button></span>
                            </div>
                            <div>
                                <span><button type='button' onclick='removeFromCart(${product.productID})'>Remove</button></span>
                            </div>
                        </div>
                    </div>`;
  }

  if (totalItems < 1) menuCartBtn.innerHTML = "Cart";
  else menuCartBtn.innerHTML = `Cart(${totalItems})`;

  cartContainer.innerHTML = combinedString;
}
