<?php
$addresses = array(
    'rush.yu@gmail.com',
    // 'mail2@gmail.com',
);
 
if (isset($_REQUEST['name']) && !empty($_REQUEST['name'])){
    $name = $_REQUEST['name'];
    $tel = $_REQUEST['tel'];
    $choisesArray = $_REQUEST['choises'];
    foreach ($choisesArray as $value) {
        $choises = $choises ." \r\n ". $value;
    }
    $send = "На сайте pixelbro.ru оставили заявку \r\n Имя: ".$name."\r\n Телефон: ".$tel."\r\n".$choises;
    $to= implode(', ', $addresses);
    $from = "rush.yu@gmail.com";
    $subject = "Заявка от сайта";
    $headers = "From: $from\r\nReplay-To: $from\r\nContent-type: text/plain; charset=utf-8\r\n";
    mail($to, $subject, $send, $headers);
}
?>