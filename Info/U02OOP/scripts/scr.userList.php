<?php $list = UserList::getUsers(); ?>
<?php if (!$list) { ?>
    <p>Keine Benutzer vorhanden</p>
<?php } else { ?>
    <table>
        <tr>
            <th>Benutzername</th>
            <th>Geschlecht</th>
            <th>Geburtsdatum</th>
            <th>Bewertung</th>
            <th></th>
        </tr>
        <?php foreach ($list as $key => $value) { ?>
            <tr>
                <td><?= $value->getUsername() ?></td>
                <td><?= $value->getMale() ? "Männlich" : "Weiblich" ?></td>
                <td><?= $value->getBirthDate() ?></td>
                <td><?= $value->getRating() ?></td>
                <td>
                    <a href="index.php?id=3&username=<?= $value->getUsername() ?>">Bearbeiten</a>
                    <a href="index.php?id=4&username=<?= $value->getUsername() ?>">Löschen</a>
                </td>
            </tr>
        <?php } ?>
    </table>
<?php } ?>