<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


if(isset($_POST['send']))
{
$name = $_POST['name'];
$email = $_POST['email'];
$$msg = $_POST['msg'];


//Load Composer's autoloader
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMaailer.php';
require 'PHPMailer/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
       $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'rkc242855@gmail.com';                     //SMTP username
    $mail->Password   = 'exaz mwqu eyay ajf';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('rkc242855@gmail.com', 'Contact Form');
    $mail->addAddress('rosankc820@gmail.com', ' Rosan Khattri Chettri Website');     //Add a recipient

      //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Test Contat Form';
    $mail->Body    = "Sender Name - $name <br> Sender Email - $email <br> massage -$msg";
   
    $mail->send();
    echo "<div Class='sucess'>Massege Has Been Sent !</div>";
} catch (Exception $e) {
    echo "<div Class='alert'>Massege Has Been Could't Send. </div>";
}

}
?>