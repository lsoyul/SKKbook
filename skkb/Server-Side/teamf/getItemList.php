<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");


$host = "localhost";
$user = "sgykim15";
$password = "teamf123";
$DB_name = "sgykim15";

$return_array = array();
$conn = mysqli_connect($host, $user, $password, $DB_name);

if(mysqli_connect_errno($conn))
{
	echo "Fail!";
}
else
{

	$result = mysqli_query($conn, "select * from $DB_name.s_sell_list");

	while($row = mysqli_fetch_array($result))
	{
		$row_array['id_seller'] = $row['id_seller'];
		$row_array['name_prod'] = $row['code'];
		$row_array['description'] = $row['description'];
		$row_array['name_img'] = $row['img'];
		$row_array['price'] = $row['price'];
		$row_array['status'] = $row['status'];
		array_push($return_array, $row_array);
	}

}

echo json_encode($return_array);

mysqli_close($conn);

?>