/**
 * Slot machine - Presentation layer
 */
package ui;

import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;

import java.awt.Image;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Observable;
import java.util.Observer;

/**
 * This is the controller of the slot machine. It handles the communication
 * between the model and the GUI. It registers as an observer to "SlotMachine".
 * 
 * @author mdw
 * 
 */
// TODO: Fix the missing singleton calls to game.SlotMachine and SlotMachineView
// TODO: Add the observer pattern, be aware that the UI may only be updated
// safely through the AWT dispatcher thread
public class SlotMachineController implements ActionListener
{
	/** An instance of the UI updater */
	private SlotMachineViewUpdater uiUpdater = new SlotMachineViewUpdater();
	
	/**
	 * This class is used for GUI updating (invoked through AWT dispatcher thread)
	 * 
	 * @author mdw
	 * 
	 */
	private class SlotMachineViewUpdater implements Runnable {
		private int gamePoints = 0;

		public void run() {
			// Updates the three images
			SlotMachineView...setImages(
					game.SlotMachine...getActualImages()[0],
					game.SlotMachine...getActualImages()[1],
					game.SlotMachine...getActualImages()[2]
			);
			// Updates the points
			int newGamePoints = game.SlotMachine...getPoints();
			if (gamePoints == newGamePoints)
				return;
			gamePoints = newGamePoints;
			SlotMachineView...getLabelPoints().setText(
					gamePoints + "");
			if (gamePoints < 0)
				JOptionPane.showMessageDialog(SlotMachineView..,
						"You've lost!", "Game over", JOptionPane.INFORMATION_MESSAGE);
			if (gamePoints >= 500)
				JOptionPane.showMessageDialog(SlotMachineView..,
						"You won!", "Game over", JOptionPane.INFORMATION_MESSAGE);			
		}
	}
	
	/**
	 * This constructor sets up the slot machine controller
	 */
	private SlotMachineController() {
		// Sets up the five default images
		game.SlotMachine...setImages(
				new Image[] {
						Toolkit.getDefaultToolkit().getImage("images/1.jpg"),
						Toolkit.getDefaultToolkit().getImage("images/2.jpg"),
						Toolkit.getDefaultToolkit().getImage("images/3.jpg"),
						Toolkit.getDefaultToolkit().getImage("images/4.jpg"),
						Toolkit.getDefaultToolkit().getImage("images/5.jpg"),						
				}
		);
		// Registers the controller on the buttons
		SlotMachineView...getButtonStart().addActionListener(this);
		SlotMachineView...getButtonStop().addActionListener(this);
		// Sets the initial points to "not available"
		SlotMachineView...getLabelPoints().setText("n.a.");
		// Launches the frame
		SlotMachineView...setVisible(true);
	}

	/* (non-Javadoc)
	 * @see java.awt.event.ActionListener#actionPerformed(java.awt.event.ActionEvent)
	 */
	public void actionPerformed(ActionEvent e) {
		if (((JButton)e.getSource()).getName().equals("start"))
			game.SlotMachine...start();
		if (((JButton)e.getSource()).getName().equals("stop"))
			game.SlotMachine...stop();
	}

	/**
	 * @param args Arguments
	 */
	public static void main(String[] args) {
		new SlotMachineController();
	}
}
