<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");


$host = "localhost";
$user = "root";
$password = "0000";
$DB_name = "sakila";

$return_array = array();
$conn = mysqli_connect($host, $user, $password, $DB_name);

if(mysqli_connect_errno($conn))
{
	echo "Fail!";
}
else
{

	$result = mysqli_query($conn, "select * from sakila.category");

	while($row = mysqli_fetch_array($result))
	{
		$row_array['name'] = $row['name'];
		$row_array['id'] = $row['category_id'];
		array_push($return_array, $row_array);
	}

}

echo json_encode($return_array);

mysqli_close($conn);

?>