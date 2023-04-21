<html>

<head>
    <!-- <link type="text/css" rel="stylesheet" href="inc/css/usermanagement.css"> -->
</head>

<?php

require_once "inc/classes/class.Quiz.php";

const MAX_INACTIVITY_SECONDS = 60;

session_start();

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

$_SESSION["quiz"] = new Quiz();

?>

<body>

    <?php
        if ($_GET["q"] == "prev")
            $_SESSION["quiz"]->setActualQuestionNumber($_SESSION["quiz"]->getActualQuestionNumber()+1);
        else if ($_GET["q"] == "prev")
            $_SESSION["quiz"]->setActualQuestionNumber($_SESSION["quiz"]->getActualQuestionNumber()-1);
        else
            $_SESSION["quiz"]->setActualQuestionNumber($_GET["q"]);

        $question = $_SESSION["quiz"]->getActualQuestion();

        if (array_key_exists('complete', $_POST)) {
            $_SESSION["quiz"]->setCompleted(true);
        }

        $_SESSION["question"] = $question;
    ?>

    <h1>Fahrschulquiz</h1>

    <button type="submit" name="complete">Quiz fertigstellen</button>
    <?php
        for ($i = 0; $i < $_SESSION["quiz"]::QUESTIONS_COUNT; $i++) {
            $index = $i+1;
            echo "<a href=\"index.php?q=$i\">$index</a>  ";
        }
    ?>
    <a href="index.php?q=prev">Vorige Frage</a>
    <a href="index.php?q=next">Nächste Frage</a>

    <?php
        echo "<h2>Frage " . $_SESSION["quiz"]->getActualQuestionNumber()+1 . " von " . $_SESSION["quiz"]::QUESTIONS_COUNT . "</h2>";

        $text = $_SESSION["question"]->getQuestionText();
        $img = $_SESSION["question"]->getImageFilename();
        echo "<p>$text</p>";
        echo "<img src=\"inc/images/$img\">";

        echo "<table>";
        echo "<tr><th>Antwort</th><th>Richtig</th><th>Falsch</th></tr>";
        $answers = $_SESSION["question"]->getAnswers();
        foreach ($answers as $answer) {
            echo "<tr>";
            echo "<td>" . $answer->getAnswerText() . "</td>";
            echo "<td><input type=\"radio\"></td>";
            echo "<td><input type=\"radio\"></td>";
        }
        echo "</table>";
    ?>

</body>

</html>