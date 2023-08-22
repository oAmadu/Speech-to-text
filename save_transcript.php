<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'speech_to_text_db';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$transcript = $data['transcript'];

$sql = "INSERT INTO transcripts (transcript) VALUES ('$transcript')";

if ($conn->query($sql) === TRUE) {
  $response = array('message' => 'Transcript saved successfully');
  echo json_encode($response);
} else {
  $response = array('message' => 'Error: ' . $sql . '<br>' . $conn->error);
  echo json_encode($response);
}

$conn->close();
?>