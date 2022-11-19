<?php
$getproducts = $_REQUEST["getproducts"];

include 'connectToDatabase.php';

$split = explode(" ",$getproducts);

$index = 0;
$query = "SELECT * FROM Product";

foreach($split as $key => $value)
{
  if ($index == 0)
  {
    if ($value != 'All')
      $query .= " WHERE category='$value'";
    else
      $query .= " WHERE category!=''";

    $index++;
    continue;
  }

  $like = "'%$value%'";
  $chainOfLike = "(itemName LIKE $like OR image LIKE $like OR remark LIKE $like)";

  if ($index == 1)
  {
      $query .= " AND $chainOfLike";
  }
  else
  {
    $query .= " OR $chainOfLike";
  }

  $index++;
}

$query .= ";";

$result = mysqli_query($dbc, $query);

if (!$result) {
  printf("The query failed\n");
  printf("Error message: %s",
  $mysqli->error);
  }

$nr = mysqli_num_rows($result);
//printf("Select returned %d rows.<br/>\n", nr);


class Product{

}

$allProducts = array();

while($row=mysqli_fetch_object($result)){
  $obj = new Product;
  $obj->productID = $row->productID;
  $obj->itemName = $row->itemName;
  $obj->category = $row->category;
  $obj->itemCode = $row->itemCode;
  $obj->price = $row->price;
  $obj->image = $row->image;
  $obj->calories = $row->calories;
  $obj->remark = $row->remark;
  $allProducts[] = $obj;
}

echo json_encode($allProducts);
?>