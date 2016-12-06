<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$request = file_get_contents('php://input');
$data = json_decode($request);

$id = $data->id;
$pw = $data->password;


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
	$result = mysqli_query($conn, "SELECT * FROM $DB_name.s_user WHERE `id` = '$id'");
	
	while($row = mysqli_fetch_array($result))
	{
		$row_array['name'] = $row['name'];
		$row_array['id'] = $row['id'];
		$row_array['passwd'] = $row['passwd'];
		$row_array['email'] = $row['email'];
		array_push($return_array, $row_array);	
	}

	if($return_array[0]['passwd'] == $pw)
	{
		echo json_encode($return_array);
	}
	else
	{
		echo "No Data in Database!";
	}
}



mysqli_close($conn);

?>