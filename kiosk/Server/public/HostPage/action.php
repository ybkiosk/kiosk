<html>
<head>
</head>
<body>
<table>
<tr>
<td>
<p>It is Currently:</p>
</td>
<td>
<b><?php echo date("Y-m-j H:i");?></b>
</td>
</tr>
<tr>
<td>
<p>The broadcast will begin at: </p>
</td>
<td>
<b><?php 
//old code: echo $_POST["date"] . " " . $_POST["time"];
$loops = htmlspecialchars($_POST["hidden"]);
echo $times . "<br/>";
for ($i = 0; $i <= $loops; $i++) {
echo $i . " " . $_POST["time" . $i] . " " . $_POST["date" . $i] . "<br/>";
}
?></b>
</td>
</tr>
</table>
<br>
<br>
<br>
<br>
<?php
$uploadOk = "x";
$myfile = fopen("switches.json", "w") or die ("error");
$source = htmlspecialchars($_POST["source"]);
//verify source webpage
if (!isset($_POST["local"])) {
//protocol check
if(strpos($source, 'http') !== 0){
	$uploadOk = "Err: Protocol Missing";
	echo $uploadOk . ' please specify either http:// or https://';
}
//page_up check
$headers = @get_headers($source);
if($headers[0] == 'HTTP/1.0 404 Not Found' || $headers[0] == 'HTTP/1.1 404 Not Found') {
	$uploadOk = "Err: 404 Not Found";
	echo "HTTP Request Error: 404 Page Not Found";
}
else if($headers[0] == 'HTTP/1.0 200 OK' || $headers[0] == 'HTTP/1.1 200 OK') {
	echo $headers[0] . "</br>";
	echo "<b> Success! Launching Broadcast.</b>";
}
else if($headers[0] == false){
	echo "Err: Invalid URL. No Such Address.";
	$uploadOk = "Err: Invalid URL";
}
else {
	$uploadOk = "Err: Unknown Error";
	echo $uploadOk . "<br><br><br><br>";
	echo var_dump($headers);
}
}
if (isset($_POST["youtube"])) {
	$FileType = "youtube";
}
//file upload
if (isset($_POST["local"])) {
$target_file = "video/broadcast";
$uploaded_file = basename($_FILES["upload"]["name"]);
$FileType = pathinfo($uploaded_file, PATHINFO_EXTENSION);
// Validate video data
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["upload"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = $uploadOk . "Err: Corrupt File";
    }
}
//check file size
if ($_FILES["upload"]["size"] > 200000000) {
    $uploadOk = $uploadOk . "Err: File Is Too Large";
}
// Allow certain file formats
if ($FileType != "mp4" && $FileType != "mov" && $FileType != "3gp" && $FileType != "webm") {
    $uploadOk = $uploadOk . "Err: File Type Not Supported";
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk != "x") {
    echo $uploadOk;
    echo "*File must be less than 200Mb, and either mp4, mov, 3pg, or webm file types.";
}
// if everything is ok, try to upload file
else {
    if (move_uploaded_file(($_FILES["upload"]["tmp_name"]), $target_file)) {
       echo basename( $_FILES["upload"]["name"]) . "<h3> Upload Successful.</h3>";
	$source = "http://localhost/publicData/HostPage/" . $target_file;
    } 
    else {
        echo "Err: Upload Failed";
	 echo $_FILES["upload"]["error"];
	 echo "*File must be less than 200Mb, and either mp4, mov, 3pg, or webm file types.";
    }
}

}


//write to json
if ($uploadOk = "x") {
//old code: $time = htmlspecialchars($_POST["date"] . $_POST["time"]);
$loops = htmlspecialchars($_POST["hidden"]);
$storage = array();
for ($i = 0; $i < $loops; $i++) {
  array_push($storage, $_POST["date" . $i] . $_POST["time" . $i]);
}
$times = json_encode($storage);
$txt = 'jsonCallback({"source": "' . $source . '","time": ' . $times . ',"type": "' . $FileType . '",});';
fwrite($myfile, $txt);
}
fclose($myfile);
?>
</body>
</html>
