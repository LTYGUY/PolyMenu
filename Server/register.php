<?php

    $ROLE_USER = 0;

    include 'connectToDatabase.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { 

        $data = file_get_contents( "php://input" );
        $data = json_decode($data);

        $username = $data->username;
        $password = $data->password;
        $name = $data->name;
        $email = $data->email;
        $phone = $data->phone;
        $address = $data->address;

        // Hash password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO User values (null,'$username','$address','$phone','$email','',$ROLE_USER,'$hashed_password','$name')";
        $success = mysqli_query($dbc, $query);

        if($success)
        {
            echo 'success';
        }else {
            printf("The query failed\n");
            printf("Error message: %s", $mysqli->error);
        }
        mysqli_close($dbc);
 

    }

?>