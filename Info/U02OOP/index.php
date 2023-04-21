<html>

<head>
    <link type="text/css" rel="stylesheet" href="inc/css/usermanagement.css">
</head>

<?php
require_once "inc/classes/class.ValidableUser.php";
require_once 'inc/classes/class.UserList.php';

const MAX_INACTIVITY_SECONDS = 60;

session_start();
UserList::init();

if (isset($_SESSION["lastActivity"]) && (time() - $_SESSION["lastActivity"] > MAX_INACTIVITY_SECONDS)) {
    session_destroy();
}
else {
    session_regenerate_id(true);
    if (!isset($_SESSION["creationTime"])) {
        $_SESSION["creationTime"] = time();
        $_SESSION["lastActivity"] = time();
    }

    $_SESSION["lastActivity"] = time();
}
?>

<body>
    <a href="index.php?id=1">Benutzerliste</a>
    <a href="index.php?id=2">Neuer Benutzer</a>

    <?php

    if (!isset($_SESSION["user"])) {
        $user = new ValidableUser();
        $_SESSION["user"] = $user;
    }
    $user = $_SESSION["user"];

    if (!isset($_SESSION["userList"])) {
        $userList = new UserList();
        $_SESSION["userList"] = $userList;
    }
    $userList = $_SESSION["userList"];


    if (!isset($_GET["id"]) || $_GET["id"] == "1") {
        require_once 'scripts/scr.userList.php';
    } 

    elseif ($_GET["id"] == "2") {
        $user = new ValidableUser();
        $_SESSION["user"] = $user;
        require_once 'scripts/scr.userForm.php';
    } 

    elseif ($_GET["id"] == "20") {
        $user->setUsername(filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING));
        $user->setPassword(filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING));
        $user->setPasswordRepeat(filter_input(INPUT_POST, "passwordRepeat", FILTER_SANITIZE_STRING));
        $user->setMale(filter_input(INPUT_POST, "male", FILTER_VALIDATE_BOOLEAN));
        $user->setBirthDate(filter_input(INPUT_POST, "birthDate", FILTER_SANITIZE_STRING));
        $user->setRating(filter_input(INPUT_POST, "rating", FILTER_VALIDATE_FLOAT));
        $user->setImageFromSuperglobal($_FILES["image"]);
        $user->validate();

        if ($user->getErrors() != null || !$userList->addUser($user))
            require_once 'scripts/scr.userForm.php';
        else
            require_once 'scripts/scr.userList.php';
    } 
    
    elseif ($_GET["id"] == "3") {
        if (!isset($_GET["username"]) || strlen($_GET["username"]) == 0) {
            require_once 'scripts/scr.userList.php';
        } 
        
        else {
            $user = UserList::getUser($_GET["username"]);
            if (!$user)
                require_once 'scripts/scr.userList.php';
            
                else {
                $_SESSION["user"] = $user;
                require_once 'scripts/scr.userForm.php';
            }
        }
    } 
    
    elseif ($_GET["id"] == "30") {
        $oldName = $user->getUsername();

        $user->setUsername(filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING));
        $user->setPassword(filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING));
        $user->setPasswordRepeat(filter_input(INPUT_POST, "passwordRepeat", FILTER_SANITIZE_STRING));
        $user->setMale(filter_input(INPUT_POST, "male", FILTER_VALIDATE_BOOLEAN));
        $user->setBirthDate(filter_input(INPUT_POST, "birthDate", FILTER_SANITIZE_STRING));
        $user->setRating(filter_input(INPUT_POST, "rating", FILTER_VALIDATE_FLOAT));
        $user->setImageFromSuperglobal($_FILES["image"]);
        $user->validate();

        if (isset($_POST["deleteImage"]))
            $user->setImage("");

        if (!$userList->updateUser($oldName, $user) || $user->getErrors() != null) {
            $_GET["id"] = "3";
            require_once 'scripts/scr.userForm.php';
        } 
        
        else
            require_once 'scripts/scr.userList.php';
    } 
    
    elseif ($_GET["id"] = "4") {
        if (isset($_GET["username"]) && strlen($_GET["username"]) > 0) {
            $username = filter_input(INPUT_GET, "username", FILTER_SANITIZE_STRING);
            if ($userList->deleteUser($username)) {
                unset($_SESSION["user"]);
                unset($user);
            }
        }
        require_once 'scripts/scr.userList.php';
    }
    ?>
</body>

</html>