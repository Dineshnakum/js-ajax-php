<?php
require("db.php");

$data = stripcslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);

$id = mysqli_real_escape_string($conn, $mydata["id"]);
$name = mysqli_real_escape_string($conn, $mydata["name"]);
$email = mysqli_real_escape_string($conn, $mydata["email"]);
$city = mysqli_real_escape_string($conn, $mydata["city"]);
$phone = mysqli_real_escape_string($conn, $mydata["phone"]);

if (!empty($id) && !empty($name) && !empty($email) && !empty($city) && !empty($phone)) {
    $sql = "UPDATE `js_ajax_data` SET `name`='$name', `email`='$email', `city`= '$city', `phone`= '$phone' WHERE `id`='$id'";
    $query = mysqli_query($conn, $sql);

    if ($query == true) {
        echo "data updated successfully.";
    } else {
        echo "faile to update data";
    }
} else {
    echo "All the details are required";
}

?>