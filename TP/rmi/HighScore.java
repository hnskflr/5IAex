import java.rmi.*;

public interface HighScore extends Remote {

    public void setHighScore(String name, int highScore)
        throws RemoteException;
   
    public int getHighestScore()
        throws RemoteException;
}
