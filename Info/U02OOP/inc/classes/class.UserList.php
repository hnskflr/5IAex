<?php


class UserList
{
    // protected $users = array();
    protected static $con;

    public static function init() {
        UserList::$con = new mysqli("localhost", "root", "", "users");
    }

    public static function addUser($user)
    {
        if (!isset($user))
            return false;

        $user->validate();
        if (!$user->getError("username")) {
            if (UserList::getUser($user->getUsername()) != false)
                $user->setError("username", "Benutzername bereits vergeben");
        }
        if ($user->getErrors() == null) {
            // $this->users[$user->getUsername()] = $user;
            $sql = "INSERT INTO users (uusername, upassword, umale, ubirthdate, urating, uimagetype, uimagesize, uimage) VALUES (?,?,?,?,?,?,?,?);";
            $stmt = UserList::$con->prepare($sql);
            $stmt->bind_param("ssisdsib", $user->getUsername(), $user->getPassword(), $user->getMale(), $user->getBirthdate(), $user->getRating(), $user->getImageType(), $user->getImageSize(), $user->getImage());
            $stmt->execute();
        }
        return true;
    }

    public static function updateUser($oldUsername, $user)
    {
        if (!isset($oldUsername) || !isset($user))
            return false;
        
        $user->validate();
        if ($user->getErrors() != null)
            return false;

        $dbUser = UserList::getUser($user->getUsername());
        if ($dbUser) {
            $user->setError("username", "Benutzername bereits vergeben");
            return false;
        }
            
        UserList::deleteUser($oldUsername);
        UserList::addUser($user);

        return true;
    }

    public static function getUsers()
    {
        $sql = "SELECT * FROM users";
        $result = UserList::$con->query($sql);

        if ($result->num_rows == 0)
            return false;

        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = UserList::createUser($row);
        }

        return $users;
    }

    public static function getUser($username)
    {
        if (!isset($username))
            return false;

        $sql = "SELECT * FROM users WHERE uusername = ?;";
        $stmt = UserList::$con->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if (!isset($row))
            return false;

        return UserList::createUser($row);
    }

    public static function deleteUser($username)
    {
        if (!isset($username))
            return false;

        $sql = "DELETE FROM users WHERE uusername = ?;";
        $stmt = UserList::$con->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();

        return true;
    }

    public static function getImage($username)
    {
        $user = UserList::getUser($username);
        return $user == false ? false : $user->getImage();
    }

    private static function createUser($data) {
        $user = new ValidableUser();
        $user->setUsername($data["uusername"]);
        $user->setPassword("");
        $user->setPasswordRepeat("");
        $user->setMale($data["umale"] == 1);
        $user->setBirthDate($data["ubirthdate"]);
        $user->setRating($data["urating"]);
        $user->setImageType($data["uimagetype"]);
        $user->setImageSize($data["uimagesize"]);
        $user->setImage($data["uimage"]);
        return $user;
    }
}
