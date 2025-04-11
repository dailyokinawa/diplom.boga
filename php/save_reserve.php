<?php
require 'servedb.php'; // Подключение к базе данных

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = trim($_POST['фио']);
    $phoneNumber = trim($_POST['номер']);
    $peopleCount = intval($_POST['человек']);
    $reservationDate = $_POST['дата'];
    $tableNumber = $_POST['столик'];

    // Преобразуем дату в формат, понятный MS SQL
    $dateTime = DateTime::createFromFormat('Y-m-d\TH:i', $reservationDate);
    if ($dateTime) {
        $reservationDate = $dateTime->format('Y-m-d H:i:s'); // Преобразуем в формат YYYY-MM-DD HH:MM:SS
    } else {
        echo "Ошибка: Неверный формат даты.";
        exit;
    }

    // Проверяем, что все поля заполнены
    if (!empty($fullName) && !empty($phoneNumber) && !empty($peopleCount) && !empty($reservationDate) && !empty($tableNumber)) {
        // Сохраняем данные в базу данных
        $query = "INSERT INTO Reservations (FullName, PhoneNumber, PeopleCount, ReservationDate, TableNumber) VALUES (?, ?, ?, ?, ?)";
        $params = [$fullName, $phoneNumber, $peopleCount, $reservationDate, $tableNumber];
        $stmt = sqlsrv_query($conn, $query, $params);

        if ($stmt === false) {
            echo "Ошибка при сохранении данных: " . print_r(sqlsrv_errors(), true);
            exit;
        }

        echo "Бронирование успешно создано!";
    } else {
        echo "Ошибка: Все поля должны быть заполнены.";
    }
}
?>