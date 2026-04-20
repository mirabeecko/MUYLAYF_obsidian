```html
<!DOCTYPE html>
<html>
<head>
    <title>Kontaktní Formulář</title>
</head>
<body>
    <h2>Kontaktní Formulář</h2>
    <form action="sendemail.php" method="post">
        <label for="name">Jméno:</label><br>
        <input type="text" id="name" name="name" required><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>

        <label for="message">Zpráva:</label><br>
        <textarea id="message" name="message" required></textarea><br>

        <input type="submit" value="Odeslat">
    </form>
</body>
</html>

```



```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Zde by měla být chybová zpráva
        echo "Prosím vyplňte formulář správně.";
        exit;
    }

    $recipient = "telovychovnajednotakrupka@gmail.com";
    $subject = "Nová zpráva od $name";

    $email_content = "Jméno: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Zpráva:\n$message\n";

    $email_headers = "Od: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Úspěšně odesláno
        echo "Děkujeme, vaše zpráva byla odeslána.";
    } else {
        // Neúspěšné odeslání
        echo "Bohužel se nám nepodařilo odeslat vaši zprávu.";
    }
} else {
    // Neplatný požadavek
    echo "Toto je neplatný požadavek.";
}
?>

```

#claude_tjkrupka
