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

if(!empty($_FILES))
{
	$path = './upload/' . basename($_FILES['image']['name']);
	if(move_uploaded_file($_FILES['image']['tmp_name'], $path))
	{
        $insert_name = $_POST['user_name'];
	$insert_title = $_POST['name'];
	$insert_desc = $_POST['description'];
	$insert_status = $_POST['status'];
	$insert_price = $_POST['price'];
	$insert_name_img = $_FILES['image']['name'];

        $insertQuery = "INSERT INTO $DB_name.s_sell_list(id_seller, code, description, img, price, status) 
			VALUES ('$insert_name','$insert_title','$insert_desc','$insert_name_img', '$insert_price', '$insert_status')";
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