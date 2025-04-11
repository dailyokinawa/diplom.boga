<?php
$serverName = "localhost"; // Имя сервера
$connectionOptions = [
    "Database" => "mrpenis", // Замените на имя вашей базы данных
    "CharacterSet" => "UTF-8"
];

// Устанавливаем соединение
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}
?>