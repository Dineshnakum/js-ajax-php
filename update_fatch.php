<?php
require("db.php");
$data = stripcslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata["sid"];

$sql = "SELECT * FROM js_ajax_data WHERE id = '$id'";
$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_assoc($result);

echo json_encode($data);
mysqli_close($conn);

?>