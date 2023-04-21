<?php 
class Question
{
	private const IMAGE_TEXT = "Abb.";
	
	private $questionText = null;
	private $imageFilename = null;
	private $answers = null;
	
  public function __construct(
    $questionText,
    $imageFilename,
    $answers) {
    $this->questionText = $questionText;
    $this->imageFilename = $imageFilename;
    $this->answers = $answers;
  }

	public function getQuestionText() {
		return $this->questionText;
	}

	public function getImageFilename() {
		return $this->imageFilename;
	}

	public function getAnswers() {
		return $this->answers;
	}
	
	public function getAnswered() {
	  $ret = true;
	  foreach ($this->answers as $answer)
	    if (!$answer->getAnswered())
	      $ret = false;
	  return $ret;
	}
	
	/**
	 * Liefert den Dateinamen des Bildes ohne Erweiterung zurück und ergänzt ihn 
	 * am Beginn durch das Wort Abb.
	 */
	public function getImageText() {
	  $ret = null;
	  if (isset($this->imageFilename))
	    $ret = self::IMAGE_TEXT . " " . substr($this->imageFilename, 0, strpos($this->imageFilename,".jpg"));
	  return $ret;
	}
}