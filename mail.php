<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
require 'php/subscriptiondb.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = trim($_POST['email']);

    // Проверяем, что email не пустой
    if (!empty($email)) {
        // Сохраняем email в базу данных
        $query = "INSERT INTO Subscriptions (Email) VALUES (?)";
        $params = [$email];
        $stmt = sqlsrv_query($conn, $query, $params);

        if ($stmt === false) {
            die(print_r(sqlsrv_errors(), true));
        }

        // Отправляем письмо
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->isSMTP();
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth = true;

        // Настройки вашей почты
        $mail->Host = 'smtp.yandex.ru';
        $mail->Username = 'dailyweeknd@yandex.ru';
        $mail->Password = '';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->setFrom('dailyweeknd@yandex.ru', 'Lost Heaven');

        // Получатель письма
        $mail->addAddress($email);

        // Отправка сообщения
        $mail->isHTML(true);
        $mail->Subject = "Благодарим за подписку!";
        $mail->Body = "<h2>Спасибо за подписку на рассылку Lost Heaven!</h2>";

        if ($mail->send()) {
            echo "Подписка успешно оформлена!";
        } else {
            echo "Ошибка при отправке письма: {$mail->ErrorInfo}";
        }
    } else {
        echo "Ошибка: Email не указан.";
    }
}
?>