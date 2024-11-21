<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Invalid email format.');
    }

    // Mail configuration
    $to = "your-email@example.com";
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $boundary = md5(time());

    // Content Type for attachments
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

    // Email body
    $body = "--" . $boundary . "\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message\n\n";

    // Attach files if any
    if (!empty($_FILES['attachments']['name'][0])) {
        for ($i = 0; $i < count($_FILES['attachments']['name']); $i++) {
            if ($_FILES['attachments']['error'][$i] === UPLOAD_ERR_OK) {
                $fileName = $_FILES['attachments']['name'][$i];
                $fileType = $_FILES['attachments']['type'][$i];
                $fileData = file_get_contents($_FILES['attachments']['tmp_name'][$i]);

                $body .= "--" . $boundary . "\r\n";
                $body .= "Content-Type: " . $fileType . "; name=\"" . $fileName . "\"\r\n";
                $body .= "Content-Transfer-Encoding: base64\r\n";
                $body .= "Content-Disposition: attachment; filename=\"" . $fileName . "\"\r\n\r\n";
                $body .= chunk_split(base64_encode($fileData)) . "\r\n";
            }
        }
    }

    $body .= "--" . $boundary . "--";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo 'Your message has been sent successfully.';
    } else {
        echo 'Unable to send email. Please try again.';
    }
}
?>