<?php
    require("db.php");

    $data = stripslashes(file_get_contents("php://input"));
    $mydata = json_decode($data, true);
    $name = $mydata['name'];
    $email = $mydata['email'];
    $city = $mydata['city'];
    $phone = $mydata['phone'];

    if (!empty($name) && !empty($email) && !empty($city) && !empty($phone)) {

        $sql = "INSERT INTO js_ajax_data(name, email, city, phone) VALUES('$name', '$email', '$city', '$phone')";
        $query = mysqli_query($conn, $sql);

        if ($query == true) {
            echo "Data is saved";
        } else {
            echo "Data is not saved";
        }
    }
    else {
        echo "Fill the all details";
    }
?>