import java.rmi.*;

public class HighScoreServer {

    public static void main(String[] args) {
        try {
            Naming.bind("rmi://localhost/HighScore", new HighScoreImpl());
        } catch(Exception e) {
            // Registrieren des Remote-Objects fehlgeschlagen
        }       
    }
}
