<?php
include "inc/classes/class.User.php";

class ValidableUser extends User
{
    protected $errors = array();

    function __construct() {
        $this->errors = [
            "username" => "",
            "password" => "",
            "passwordRepeat" => "",
            "birthDate" => "",
            "male" => "",
            "rating" => "",
            "image" => "",
        ];
    }

    function setError($key, $msg) {
        $this->errors[$key] = $msg;
    }

    function getErrors() {
        foreach ($this->errors as $key => $value) {
            if ($value != "")
                return $this->errors;
        }
        return null;
    }

    function getError($key) {
        return $this->errors[$key];
    }

    function validate() {
        $this->validateUsername();
        $this->validatePasswords();
        $this->validatePasswordRepeat();
        $this->validatePassword();
        $this->validateDate();
        $this->validateRating();
        $this->validateImageSize();
        $this->validateFileType();
    }

    function validateUsername() {
        if (empty($this->getUsername()))
            $this->errors["username"] = "Kein Benutzername eingegeben";
        else
            $this->errors["username"] = "";
    }

    function validatePassword() {
        if (empty($this->getPassword()))
            $this->errors["password"] = "Kein Passwort eingegeben";
        else
            $this->errors["password"] = "";
    }

    function validatePasswords() {
        if ($this->getPassword() != $this->getPasswordRepeat()) {
            $this->errors["password"] = "Passwörter stimmen nicht überein";
            $this->errors["passwordRepeat"] = "Passwörter stimmen nicht überein";
        } else {
            $this->errors["password"] = "";
            $this->errors["passwordRepeat"] = "";
        }
    }

    function validatePasswordRepeat() {
        if (empty($this->getPasswordRepeat()))
            $this->errors["passwordRepeat"] = "Kein Passwort eingegeben";
        else
            $this->validatePasswords();
    }

    function validateDate() {
        if (empty($this->getBirthDate()))
            $this->errors["birthDate"] = "Kein Geburtsdatum eingegeben";
        else
            $this->errors["birthDate"] = "";
    }

    function validateRating() {
        if (empty($this->getRating()))
            $this->errors["rating"] = "Keine Bewertung eingegeben";
        else if ($this->getRating() < 1 or $this->getRating() > 5)
            $this->errors["rating"] = "Bewertung muss zwischen 1 und 5 liegen";
        else
            $this->errors["rating"] = "";
    }

    function validateImageSize() {
        if ($this->getImageSize() < self::MAX_IMAGE_SIZE)
            $this->errors["image"] = "Bild ist zu groß";
        else
            $this->errors["image"] = "";
    }

    function validateFileType() {
        $type = $this->getImageType();

        if ($type != "image/png" && $type != "image/jpg" && $type != "image/jpeg")
            $this->errors["image"] = "Datei muss ein Bild sein";
        else
            $this->errors["image"] = "";
    }
}
