<?php

$redirect = '../add_task.html';
$link = "https://vanessa-wuerdinger.developerakademie.net/modul10_join/index.html";
$message = "Hello, \r\n \r\n 
I would like to invite you to our JOIN-Kanban-Board.
Please click on following link to start working together.  \r\n \r\n $link \r\n \r\n
Yours Sincerely \r\n
Your JOIN-Kanban team
";

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $subject = "Invitation // join our JOIN-Kanban Team";
        $headers = "From:  noreply@developerakademie.com";
        $recipient = $_POST['mail'];

        mail($recipient, $subject, $message, $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
