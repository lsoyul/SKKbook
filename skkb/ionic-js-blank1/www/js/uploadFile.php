<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");


$host = "localhost";
$user = "sgykim15";
$password = "teamf123";
$DB_name = "sgykim15";

$conn = mysqli_connect($host, $user, $password, $DB_name);

if(!empty($_FILES))
{
	$path = 'upload/' . $_FILES['file']['name'];
	if(move_uploaded_file($_FILES['file']['tmp_name'], $path))
	{
        $insertT = $_FILES['file']['name'];
        $insertQuery = "INSERT INTO $DB_name.test(image) VALUES ('$insertT')";
		//$insertQuery = "INSERT INTO $DB_name.test(image) VALUES ('".$_FILES['file']['name']."')";
		if(mysqli_query($conn, $insertQuery))
		{
			echo 'File Uploaded';
		}
		else
		{
			echo 'File Uploaded But not Saved';
		}
	}	
}
else
{
	echo 'Some Error';
}
?>