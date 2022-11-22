function productAddpopup() {
  $("#addProductForm").css("display", "table");
  $("#productTable").html("");
}

function adminProductAddCancel() {
  $("#addProductForm").css("display", "none");
  getProductList();
}

let btn_addProduct = document.getElementById("btn_addProduct");
btn_addProduct.addEventListener("click", AddProduct);

function AddProduct(e) {
  e.preventDefault();

  let itemName = $("#addProduct_itemName").val();
  let category = $("#addProduct_category").val();
  let itemCode = $("#addProduct_itemCode").val();
  let price = $("#addProduct_price").val();

  let params = "";

  if (itemName == "") {
    $("#addProduct_error_msg").html("Please item name");
    $("#addProduct_error_msg").css("display", "block");
    return;
  } else if (itemCode == "") {
    $("#addProduct_error_msg").html("Please enter item code");
    $("#addProduct_error_msg").css("display", "block");
    return;
  } else if (category == "" || category == null) {
    $("#addProduct_error_msg").html("Please select category");
    $("#addProduct_error_msg").css("display", "block");
    return;
  } else if (price == "" || isNaN(price)) {
    $("#addProduct_error_msg").html("Price not valid");
    $("#addProduct_error_msg").css("display", "block");
    return;
  } else {
    params = {
      itemName: itemName,
      category: category,
      itemCode: itemCode,
      price: price,
    };
    $("#addProduct_error_msg").html("");
    $("#addProduct_error_msg").css("display", "none");
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "Server/addProduct.php");

  xhr.setRequestHeader(
    "Content-Type",
    "application/application/x-www-form-urlencoded"
  );

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      try {
        if (this.responseText == `success`) {
          clearAddProductInputs();
          $("#addProduct_error_msg").html("Added Product Success");
          $("#addProduct_error_msg").css("display", "block");
          getProductList();
        } else {
          $("#addProduct_error_msg").html(this.responseText);
          $("#addProduct_error_msg").css("display", "block");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  xhr.send(JSON.stringify(params));
}

const clearAddProductInputs = () => {
  const inputs = document.querySelectorAll(
    "#addProduct_itemName,#addProduct_category,#addProduct_itemCode,#addProduct_price"
  );

  inputs.forEach((input) => {
    input.value = "";
  });
};
