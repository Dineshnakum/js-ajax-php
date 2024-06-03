<?php
require("db.php");

$data = stripcslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata["sid"];

// Delete Data
if (!empty($id)) {
    $sql = "DELETE FROM js_ajax_data WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if ($result == TRUE) {
        echo "Data deleted successfully.";
    } else {
        echo "Data does not deleted!";
    }
} else {
    echo "Something went wrong";
}
mysqli_close($conn);

?>