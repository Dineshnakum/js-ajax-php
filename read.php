<?php

require("db.php");

// SQL query to retrieve data
$sql = "SELECT * FROM `js_ajax_data`";
$result = mysqli_query($conn, $sql);
$row = mysqli_num_rows($result);

if ($row > 0) {
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}
echo json_encode($data);
mysqli_close($conn);

?>