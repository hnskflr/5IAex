import java.rmi.RemoteException;
import java.rmi.server.*;

public class HighScoreImpl extends UnicastRemoteObject implements HighScore
{
    public HighScoreImpl()
        throws RemoteException {}
   
    public void setHighScore(String name, int highScore)
        throws RemoteException {
            // setze highscore
        }

    public int getHighestScore() throws RemoteException {
            int HighestScore = 0;
            // get highest score from list
            return(HighestScore);
        }
}
