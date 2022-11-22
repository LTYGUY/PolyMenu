// product list table
function getProductList() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText != "") {
          const parsed = JSON.parse(this.responseText);
          $("#productTable").html(generateProductTable(parsed));
        }
      } catch (err) {
        console.log(err);
      }
    }

    //debug.innerHTML = this.responseText;
  };

  xhr.open("GET", `Server/getProductList.php`);
  xhr.send(null);
}

function generateProductTable(obj) {
  let table =
    "<h1>Product List</h1> <button type='button' onclick='productAddpopup()' class='productAddButton'>Add</button> <table class='table_userPage'>";
  table +=
    "<tr>" +
    "<th>Product Id</th>" +
    "<th>Item Name</th>" +
    "<th>Category</th>" +
    "<th>Item Code</th>" +
    "<th>Price</th>" +
    "<th>Image</th>" +
    "<th>Action</th>" +
    "</tr>";
  let itemList = obj;
  for (let i = 0; i < itemList.length; i++)
    table += displayProductRow(itemList[i]);
  table += "</table>";
  return table;
}

const displayProductRow = function (obj) {
  let params = {
    productID: obj.productID,
    itemName: obj.itemName,
    category: obj.category,
    itemCode: obj.itemCode,
    price: obj.price,
    image: obj.image,
  };
  let table = `<tr>
        <td>
        ${obj.productID}
        </td>
        <td>
         ${obj.itemName}
        </td>
        <td>
        ${obj.category}
        </td>
        <td>
        ${obj.itemCode}
        </td>
        <td>
        ${obj.price}
        </td>
        <td>
        <div class='itemImage_product'>
        <img src='${obj.image}' alt='${obj.itemName}'>
        </div>
        </td>
        <td>
        <button type='button' onclick='adminEditProduct(${params.productID},"${params.itemName}","${params.category}","${params.itemCode}",${params.price})' class="adminEditButton">Edit</button>
        </td>
        </tr>`;
  return table;
};

// Admin edit user
function adminEditProduct(productId, itemName, category, itemCode, price) {
  $("#adminEdit_productId").val(productId);
  $("#adminEdit_itemName").val(itemName);
  $("#adminEdit_category").val(category);
  $("#adminEdit_itemCode").val(itemCode);
  $("#adminEdit_price").val(price);

  $("#adminEditProductForm").css("display", "table");
  $("#productTable").html("");
}

function adminProductEditCancel() {
  $("#adminEditProductForm").css("display", "none");
  $(".user-container").css("display", "table");
  getProductList();
}

// Delete Product
function adminProductDelete() {
  let productID = $("#adminEdit_productId").val();

  let params = "";

  params = {
    productID: productID,
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "Server/deleteProduct.php");

  xhr.setRequestHeader(
    "Content-Type",
    "application/application/x-www-form-urlencoded"
  );

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText == `success`) {
          $("#adminEditProductForm").css("display", "none");
          getProductList();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  xhr.send(JSON.stringify(params));
}

let btn_adminProductEdit = document.getElementById("btn_adminProductEdit");

btn_adminProductEdit.addEventListener("click", EditProduct);

function EditProduct(e) {
  e.preventDefault();
  let productID = $("#adminEdit_productId").val();
  let itemName = $("#adminEdit_itemName").val();
  let categoty = $("#adminEdit_category").val();
  let itemCode = $("#adminEdit_itemCode").val();
  let price = $("#adminEdit_price").val();

  let params = "";

  if (itemName == "") {
    $("#adminProductEdit_error_msg").html("Please enter item name");
    $("#adminProductEdit_error_msg").css("display", "block");
    return;
  } else if (itemCode == "") {
    $("#adminProductEdit_error_msg").html("Please enter item code");
    $("#adminProductEdit_error_msg").css("display", "block");
    return;
  } else if (price == "" || isNaN(price)) {
    $("#adminProductEdit_error_msg").html("Price not valid");
    $("#adminProductEdit_error_msg").css("display", "block");
    return;
  } else {
    params = {
      productID: productID,
      itemName: itemName,
      category: categoty,
      itemCode: itemCode,
      price: price,
    };

    $("#adminProductEdit_error_msg").html("");
    $("#adminProductEdit_error_msg").css("display", "none");
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "Server/editProduct.php");

  xhr.setRequestHeader(
    "Content-Type",
    "application/application/x-www-form-urlencoded"
  );

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText == `success`) {
          $("#adminEditProductForm").css("display", "none");
          getProductList();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  xhr.send(JSON.stringify(params));
}
