<?php
    $productID = $_REQUEST["addToCart"];

    $cookie_name = "cart_productIDs";

    $cookie_value;

    //If cookie of name is found
    if (isset($_COOKIE[$cookie_name]))
    {
        $cookie_value = json_decode($_COOKIE[$cookie_name], true);
    }
    else
    {
        $cookie_value = array();
    }


    include 'connectToDatabase.php';

    $query = "SELECT * FROM Product WHERE productID=$productID;";

    $result = mysqli_query($dbc, $query);

    if (!$result) {
        printf("The query failed\n");
        printf("Error message: %s",
        $mysqli->error);
    }

    $nr = mysqli_num_rows($result);

    class CartObject{
    }

    class Product{

    }

    while($row=mysqli_fetch_object($result)){
      $obj = new Product;
      $obj->productID = $row->productID;
      $obj->itemName = $row->itemName;
      $obj->category = $row->category;
      $obj->itemCode = $row->itemCode;
      $obj->price = $row->price;
      $obj->image = $row->img;
      $obj->calories = $row->calories;
      $obj->remark = $row->remark;

      if (array_key_exists($productID, $cookie_value))
      {
        $cookie_value[$productID]['amount'] += 1;
      }
      else
      {
        $newCartObject = new CartObject;
        $newCartObject->amount = 1;
        $newCartObject->product = $obj;
        //Add new obj into cookie
        $cookie_value[$productID] = $newCartObject;
      }
    }
    
    setcookie($cookie_name, json_encode($cookie_value), time() + (86400 * 1)); // cookie lasts for 1 day

    echo json_encode($cookie_value);
?>