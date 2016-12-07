<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$request = file_get_contents('php://input');
$data = json_decode($request);

$prod_id = mysql_real_escape_string($data->prod_id);
$buyer = mysql_real_escape_string($data->buyer);
$seller = mysql_real_escape_string($data->seller);
$prod_name = mysql_real_escape_string($data->prod_name);

$prod_id = $data->prod_id;
$buyer = $data->buyer;
$seller = $data->seller;
$prod_name = $data->prod_name;

echo "success";

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
	echo "success connection";
	mysqli_query($conn, "insert into $DB_name.s_transaction_list(prod_id,prod_name,buyer,seller) VALUES('$prod_id', '$prod_name', '$buyer', '$seller')");

}

mysqli_close($conn);

?>