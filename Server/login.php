<?php
header("Access-Control-Allow-Origin: http://localhost:8000");
include 'connectToDatabase.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 

    $data = file_get_contents( "php://input" );
    $data = json_decode($data);

    $username = $data->username;
    $password = $data->password;

    // check if username exist
    $query = "SELECT * FROM User WHERE userName='$username'";
    $result = mysqli_query($dbc, $query);

    if ($result && (mysqli_num_rows($result)>0))
        {
            
        $row = mysqli_fetch_object($result);

        $hashed_password = $row->userPassword;
        
        if(password_verify($password,$hashed_password))
        {
            session_start();
            $_SESSION['startLogin'] = time();
            $_SESSION['expireLogin'] = $_SESSION['startLogin'] + (7* 24* 60 * 60);
            $_SESSION['userId'] = $row->userId;
            $_SESSION['username'] = $row->userName;
            $_SESSION['isAdmin'] = $row->isAdmin;
            $_SESSION['token'] = hash('sha256',uniqid());
            $token = $_SESSION['token'];

            $query = "UPDATE User SET token = '$token' WHERE userName='$username'";
            $success = mysqli_query($dbc, $query);

            if($success)
            {
                echo 'success';
            } else
            {
                printf("The query failed\n");
                printf("Error message: %s", $mysqli->error);
            }
        }
        else
        {
            echo 'fail';
        }
    }else {
        printf("The query failed\n");
        printf("Error message: %s", $mysqli->error);
    }
    mysqli_free_result ($result);
    mysqli_close($dbc);

}

?>