<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Process-Data, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");


$host = "localhost";
$user = "sgykim15";
$password = "teamf123";
$DB_name = "sgykim15";

$conn = mysqli_connect($host, $user, $password, $DB_name);


        $insertQuery = "INSERT INTO $DB_name.test(image) VALUES ('asdfsd')";
		//$insertQuery = "INSERT INTO $DB_name.test(image) VALUES ('".$_FILES['file']['name']."')";
		if(mysqli_query($conn, $insertQuery))
		{
			echo 'File Uploaded';
		}
		else
		{
			echo 'File Uploaded But not Saved';
		}
		
?>