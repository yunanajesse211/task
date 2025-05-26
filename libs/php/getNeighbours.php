<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$url = 'http://api.geonames.org/neighboursJSON?country=' . $_POST['country'] . '&username=emma2025';

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);

$dc = json_decode($result, true);
$output['status']['name'] = "ok";
$output['data'] = $dc['geonames'];

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
?>
