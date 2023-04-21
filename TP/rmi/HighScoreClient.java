import java.rmi.*;

public class HighScoreClient {

    public static void main(String[] args) {
        try {
            HighScore myHighScore = (HighScore) Naming.lookup("rmi://localhost/HighScore"); 
            System.out.println(myHighScore.getHighestScore() + "");
            // System.out.println("Highscore: " + myHighScore.getHighestScore());
            // myHighScore.setHighScore("Adele", 100);
            // System.out.println("Highscore: " + myHighScore.getHighestScore());
           
        } catch(Exception e) {
            // Zugriff auf Remote-Object fehlgeschlagen
        }
    }
}
