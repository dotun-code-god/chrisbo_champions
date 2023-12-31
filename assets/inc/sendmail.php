<?php

require_once('phpmailer/class.phpmailer.php');
require_once('phpmailer/class.smtp.php');

require dirname(dirname(__DIR__)) . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(dirname(__DIR__)) . '/');
$dotenv->load();

$mail = new PHPMailer();

//$mail->SMTPDebug = 3;                               // Enable verbose debug output
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = $_SERVER['MAIL_HOST'];  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                                             // Enable SMTP authentication
$mail->Username = $_SERVER['MAIL_USERNAME'];          // SMTP username
$mail->Password = $_SERVER['MAIL_PASSWORD'];             // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to

$message = "";
$status = "false";

if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

    $user_response = $_POST["g-recaptcha-response"];
    $recaptcha_secret_key = $_SERVER['RECAPTCHA_SECRET_KEY'];
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://www.google.com/recaptcha/api/siteverify?secret=$recaptcha_secret_key&response={$user_response}",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode([
            "secret" => "$recaptcha_secret_key",
            "response" => $_POST["g-recaptcha-response"]
        ]),    
    ]);
    $response = curl_exec($curl);
    $response = json_decode($response);
    if($response->success){
        if( $_POST['form_name'] != '' AND $_POST['form_email'] != '' AND $_POST['form_message'] != '' ) {
    
            $name = $_POST['form_name'];
            $email = $_POST['form_email'];
            $subject = $_POST['form_subject'];
            $phone = $_POST['form_phone'];
            $message = $_POST['form_message'];
    
            $subject = isset($subject) ? $subject : 'New Message | Contact Form';
    
            $botcheck = $_POST['form_botcheck'];
    
            $toemail = $_SERVER['MAIL_USERNAME']; // Your Email Address
            $toname = $_SERVER['MAIL_NAME']; // Your Name
    
            if( $botcheck == '' ) {
    
                $mail->SetFrom( $email , $name );
                $mail->AddReplyTo( $email , $name );
                $mail->AddAddress( $toemail , $toname );
                $mail->Subject = $subject;
    
                $name = isset($name) ? "Name: $name<br><br>" : '';
                $email = isset($email) ? "Email: $email<br><br>" : '';
                $phone = isset($phone) ? "Phone: $phone<br><br>" : '';
                $message = isset($message) ? "Message: $message<br><br>" : '';
    
                $referrer = $_SERVER['HTTP_REFERER'] ? '<br><br><br>This Form was submitted from: ' . $_SERVER['HTTP_REFERER'] : '';
    
                $body = "$name $email $phone $message $referrer";
    
                $mail->MsgHTML( $body );
                $sendEmail = $mail->Send();
    
                if( $sendEmail == true ):
                    $message = 'We have <strong>successfully</strong> received your Message and will get Back to you as soon as possible.';
                    $status = "true";
                else:
                    $message = 'Email <strong>could not</strong> be sent due to some Unexpected Error. Please Try Again later.<br /><br /><strong>Reason:</strong><br />' . $mail->ErrorInfo . '';
                    $status = "false";
                endif;
            } else {
                $message = 'Bot <strong>Detected</strong>.! Clean yourself Botster.!';
                $status = "false";
            }
        } else {
            $message = 'Please <strong>Fill up</strong> all the Fields and Try Again.';
            $status = "false";
        }
    }else {
        $message = 'Please <strong>Confirm</strong> you are not a robot.';
        $status = "false";
    }
    
} else {
    $message = 'An <strong>unexpected error</strong> occured. Please Try Again later.';
    $status = "false";
}

header("Location: ../../contact.php?msg=$message&status=$status");
?>