<?php
require_once 'inc/classes/class.Answer.php';
require_once 'inc/classes/class.Question.php';

class Quiz
{
	/*
   * Konstanten
   */
	public const QUESTIONS_COUNT = 10;
	public const ANSWERS_COUNT = 3;
	public const MINIMUM_PERCENT = 86.6666;

	/**
	 * Hier wird die Fragenummer der aktuellen Frage gemerkt. Die Fragen werden
	 * mit 0 beginnend nummeriert
	 */
	private $actualQuestionNumber = -1;
	/**
	 * Hier wird gemerkt, ob das Quiz fertiggestellt bzw. abgegeben wurde
	 */
	private $completed = false;
	/**
	 * Enth�lt die f�r das Quiz ausgew�hlten Fragen
	 */
	private $questions = null;

	/*
	 * Konstruktoren
	 */
	/**
	 * Legt Quiz an und holt sich dabei Fragen zuf�llig aus der Datenbank
	 * und schreibt diese in das Fragen-Array hinein
	 */
	public function __construct()
	{
		$con = new mysqli("localhost", "root", "", "quiz");
		$sql = "SELECT * FROM fragen ORDER BY RAND() LIMIT 10;";
		$resultQuestions = $con->query($sql);

		while ($question = $resultQuestions->fetch_assoc()) {
			$id = $question["fragenummer"];

			$sql = "SELECT * FROM antworten WHERE fragenummer = $id ORDER BY RAND() LIMIT 3;";
			$resultAnswers = $con->query($sql);
			$answers = [];

			while ($answer = $resultAnswers->fetch_assoc()) {
				$answers[] = new Answer($answer["antworttext"], $answer["richtig"]);
			}

			$this->questions[] = new Question($question["fragetext"], $question["bild"], $answers);
		}
	}

	/*
	 * Getter- und Settermethoden
	 */
	/**
	 * Liefert die Nummer der aktuellen Frage zur�ck
	 * @return 
	 */
	public function getActualQuestionNumber()
	{
		return $this->actualQuestionNumber;
	}
	/**
	 * Setzt die Nummer der aktuellen Frage
	 * @param 
	 */
	public function setActualQuestionNumber($actualQuestionNumber)
	{
		$this->actualQuestionNumber = $actualQuestionNumber;
	}
	/**
	 * Springt zur n�chsten Frage die zur aktuellen Frage wird
	 * @return
	 */
	public function nextQuestion()
	{
		if ($this->getHasNextQuestion()) {
			$this->setActualQuestionNumber($this->actualQuestionNumber++);
			return $this->questions[$this->getActualQuestionNumber()];
		}

		return null;
	}
	/**
	 * Springt zur vorigen Frage die zur aktuellen Frage wird
	 * @return
	 */
	public function previousQuestion()
	{
		if ($this->getHasPreviousQuestion()) {
			$this->setActualQuestionNumber($this->actualQuestionNumber--);
			return $this->questions[$this->getActualQuestionNumber()];
		}

		return null;
	}
	/**
	 * Liefert die Anzahl der Fragen des Quiz zur�ck
	 * @return 
	 */
	public function getNumberQuestions()
	{
	}
	/**
	 * Liefert die aktuelle Frage zur�ck
	 * @return 
	 */
	public function getActualQuestion()
	{
		return $this->getQuestions()[$this->getActualQuestionNumber()];	
	}
	/**
	 * Liefert true zur�ck, falls nach der aktuellen Frage noch eine weitere
	 * Frage im Quiz existiert
	 * @return 
	 */
	public function getHasNextQuestion()
	{
		return $this->getActualQuestionNumber() < $this->QUESTION_COUNT-1;
	}
	/**
	 * Liefert true zur�ck, falls vor der aktuellen Frage noch eine Frage
	 * im Quiz vorhanden ist
	 * @return 
	 */
	public function getHasPreviousQuestion()
	{
		return $this->getActualQuestionNumber() > 0;
	}
	/**
	 * Liefert die ganzen Fragen des Quiz zur�ck
	 * @return 
	 */
	public function getQuestions()
	{
		return $this->questions;
	}
	/**
	 * Liefert die Anzahl der beantworteten Fragen des Quiz zur�ck
	 * @return 
	 */
	public function getNumberAnsweredQuestions()
	{
	}
	/**
	 * Liefert die Anzahl der nicht beantworteten Fragen des Quiz zur�ck
	 * @return 
	 */
	public function getNumberUnansweredQuestions()
	{
	}
	/**
	 * Das Quiz wird fertiggestellt
	 * @param 
	 */
	public function setCompleted($completed)
	{
	}
	/**
	 * Kontrolliert ob das Quiz fertiggestellt wurde
	 * @return
	 */
	public function getCompleted()
	{
	}
	/**
	 * Liefert die Anzahl der richtig gesetzten Antwortm�glichkeiten zur�ck. F�r
	 * jede richtige Antwort wird ein Punkt vergeben
	 * @return 
	 */
	public function getPoints()
	{
	}
	/**
	 * Liefert die insgesamt m�glichen Punkte zur�ck. Pro Antwortm�glichkeit wird
	 * ein Punkt vergeben
	 * @return 
	 */
	public function getMaximalPoints()
	{
	}
	/**
	 * Ermittelt die Anzahl der richtig gesetzten Antworten in Prozent gerundet auf 2
	 * Kommastellen
	 * @return 
	 */
	public function getPointsInPercent()
	{
	}
	/**
	 * Liefert zur�ck ob das Quiz bestanden wurde oder nicht. Ein Quiz kann nur
	 * bestanden werden, falls es fertiggestellt wurde und falls MINIMUM_PERCENT 
	 * der Punkte erzielt werden konnten
	 * @return 
	 */
	public function getPassed()
	{
	}
}
