<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Shop our new brand collections!">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" href="img/x-con.png" type="image/x-icon">
    <link rel="stylesheet" href="css/home.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script src="js/script.js" defer></script>
    <title>Message Successfully sent!</title>
</head>
<body>
    <div class="header contact-header">
        <div class="header-div">
            <!-- Header Links Container 1 -->
            <div class="header-links-div-1">
                <div class="header-links-1">
                    <menu class="header-links-1-menu">
                        <li class="header-link"><a href="/home.html">SHOP</a></li>
                        <li class="header-link"><a>NEW ARRIVALS</a></li>
                        <li class="header-link"><a>COLLECTIONS</a></li>
                    </menu>
                </div>
                <div class="collection-section">
                    <menu class="collection-menu">
                        <li class="collection-element"><a href="">Men</a></li>
                        <li class="collection-element"><a href="">Women</a></li>
                        <li class="collection-element"><a href="">Children</a></li>
                        <li class="collection-element"><a href="">Variations</a></li>
                        <li class="collection-element"><a href="">Latest Releases</a></li>
                    </menu>
                </div>
            </div>
            <div class="header-logo">
                <div class="header-logo-image">
                    <a href="home.html"><img src="img/logo.png" alt="Crossed Bunny Logo"></a>
                </div>
            </div>
            <div class="header-links-div-2">
                <div class="header-links-2">
                    <menu class="header-links-2-menu">
                        <li class="header-link-2"><a>SALES/DISCOUNT</a></li>
                        <li class="header-link-2"><a href="/about.html">ABOUT US</a></li>
                        <li class="header-link-2"><a href="/contact.html">CONTACT</a></li>
                    </menu>
                </div>
            </div>
        </div>
        <div class="cart-div">
            <div class="cart">
                <a href=""><img src="img/cart.png" alt="Cart Logo"></a>
            </div>
        </div>
    </div>

<?php
$servername = "sql5.freesqldatabase.com";
$username = "sql5716638";
$password = "XGZCfvjJCH";
$dbname = "sql5716638";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("<p class='message'>Connection failed: " . $conn->connect_error . "</p>");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $stmt = $conn->prepare("INSERT INTO userComments (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $subject, $message);

    if ($stmt->execute()) {
        echo "<div class='output-message'>
                 <div class='message'>
                    <p>Thank you for your feedback! Your message has been successfully submitted.</p>
                </div>
                <div class='go-back-button'>
                    <a href='home.html'><button class='go-back'>Go Back</button></a>
                </div>
              </div>";
    } else {
        echo "<div class='output-message'>
                <p class='message'>Error: " . $stmt->error . "</p>
              </div>";
    }

    $stmt->close();
}

$conn->close();
?>

</body>
</html>
