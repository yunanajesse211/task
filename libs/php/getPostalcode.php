<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$postalCode = isset($_POST['postalCode']) ? $_POST['postalCode'] : null;
$country = isset($_POST['country']) ? $_POST['country'] : null;

if (!$postalCode || !$country) {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['status' => ['name' => 'error'], 'message' => 'Need to input postal and country code']);
    exit;
}
$url = 'http://api.geonames.org/postalCodeLookupJSON?postalcode=' . urlencode($postalCode) . '&country=' . urlencode($country) . '&username=emma2025';

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);
$dc = json_decode($result, true);
$output = ['status' => ['name' => 'ok']];

if (isset($dc['postalcodes']) && count($dc['postalcodes']) > 0) {
    $output['data'] = $dc['postalcodes'][0];
} else {
    $output['data'] = null;
    $output['message'] = 'No postal code info found.';
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
?>
