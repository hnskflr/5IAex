<form method="post" action="index.php?id=<?= ($_GET["id"] == "3" ? "30" : "20"); ?>" enctype="multipart/form-data">
    <table>
        <tr>
            <td>
                <label>Benutzername:</label>
            </td>
            <td>
                <input type="text" name="username" value="<?= $user->getUsername() ?>">
            </td>
            <td class="error">
                <?= $user->getError("username") ?>
            </td>
        </tr>
        <tr>
            <td>
                <label>Passwort:</label>
            </td>
            <td>
                <input type="password" name="password" value="<?= $user->getPassword() ?>">
            </td>
            <td class="error">
                <?= $user->getError("password") ?>
            </td>
        </tr>
        <tr>
            <td>
                <label>Passwort wiederholen:</label>
            </td>
            <td>
                <input type="password" name="passwordRepeat" value="<?= $user->getPasswordRepeat() ?>">
            </td>
            <td class="error">
                <?= $user->getError("passwordRepeat") ?>
            </td>
        </tr>
        <tr>
            <td>Geschlecht:</td>
            <td>
                <input type="radio" id="male" name="male" <?php if ($user->getMale()) echo "checked" ?>>Männlich
                <input type="radio" id="male" name="male" <?php if (!$user->getMale()) echo "checked" ?>>Weiblich
            </td>
        <tr>
        <tr>
            <td>Geburtsdatum:</td>
            <td><input type="date" name="birthDate" value=<?= $user->getBirthDate() ?>></td>
            <td class="error">
                <?= $user->getError("birthDate") ?>
            </td>
        </tr>
        <tr>
            <td>Bewertung:</td>
            <td><input name="rating" id="rating" type="number" value=<?= $user->getRating() ?> step="0.25" min="1" max="5"></td>
            <td class="error">
                <?= $user->getError("rating") ?>
            </td>
        </tr>
        <tr>
            <td>Profilbild:</td>
            <td>
                <?php
                if (!empty($user->getImage()))
                    echo ('<img src="data:' . $user->getImageType() . ';base64,' . base64_encode($user->getImage()) . '"/>');
                ?>
                <br>
                <input type="file" name="image">
                <?php
                if ($_GET["id"] == "3")
                    echo ('<input type="submit" name="deleteImage" value="Bild löschen">');
                ?>
            </td>
            <td class="error">
                <?= $user->getError("image") ?>
            </td>
        </tr>
        <td></td>
        <td>
            <input type="submit" name="submit" value="<?= ($_GET["id"] == "3" ? "Ändern" : "Hinzufügen"); ?>">
            <input type="reset" name="reset" value="Zurücksetzen">
        </td>
        <td></td>
        </tr>
    </table>
</form>