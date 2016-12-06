<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$request = file_get_contents('php://input');
$data = json_decode($request);

$id = mysql_real_escape_string($data->id);
$username = mysql_real_escape_string($data->username);
$pw = mysql_real_escape_string($data->password);
$email = mysql_real_escape_string($data->email);
$pnumber = mysql_real_escape_string($data->pnumber);
$schoolid = mysql_real_escape_string($data->schoolid);

$id = $data->id;
$username = $data->username;
$pw = $data->password;
$email = $data->email;
$pnumber = $data->pnumber;
$schoolid = $data->schoolid;

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
	mysqli_query($conn, "insert into $DB_name.s_user(id,passwd,name,email,pnumber,schoolid) VALUES('$id', '$pw', '$username', '$email', '$pnumber', '$schoolid')");

}

mysqli_close($conn);

?>