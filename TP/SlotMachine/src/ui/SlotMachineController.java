/**
 * Slot machine - Presentation layer
 */
package ui;

import javax.swing.JButton;
import javax.swing.JOptionPane;
// import javax.swing.SwingUtilities;

import game.SlotMachine;

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
public class SlotMachineController implements ActionListener, Observer
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
			SlotMachineView view = SlotMachineView.getInstance();
			SlotMachine machine = SlotMachine.getInstance();

			Image[] images = machine.getActualImages();

			// Updates the three images
			if (images != null)
				SlotMachineView.setImages(
					images[0],
					images[1],
					images[2]
				);

			// Updates the points
			int newGamePoints = machine.getPoints();
			
			if (gamePoints == newGamePoints)
				return;

			gamePoints = newGamePoints;
			view.getLabelPoints().setText(gamePoints + "");
			
			String text = "";

			if (gamePoints < 0)
				JOptionPane.showMessageDialog(view, "You've lost!", "Game over", JOptionPane.INFORMATION_MESSAGE);	
			if (gamePoints >= 500)
				JOptionPane.showMessageDialog(view, "You won!", "Game over", JOptionPane.INFORMATION_MESSAGE);	
		}
	}
	
	/**
	 * This constructor sets up the slot machine controller
	 */
	private SlotMachineController() {
		SlotMachine machine = SlotMachine.getInstance();
		SlotMachineView view = SlotMachineView.getInstance();

		// Sets up the five default images
		machine.setImages(
				new Image[] {
						Toolkit.getDefaultToolkit().getImage("images/1.jpg"),
						Toolkit.getDefaultToolkit().getImage("images/2.jpg"),
						Toolkit.getDefaultToolkit().getImage("images/3.jpg"),
						Toolkit.getDefaultToolkit().getImage("images/4.jpg"),
						Toolkit.getDefaultToolkit().getImage("images/5.jpg"),						
				}
		);
		// Registers the controller on the buttons
		view.getButtonStart().addActionListener(this);
		view.getButtonStop().addActionListener(this);
		// Sets the initial points to "not available"
		view.getLabelPoints().setText("n.a.");
		// Launches the frame
		view.setVisible(true);
	}

	/* (non-Javadoc)
	 * @see java.awt.event.ActionListener#actionPerformed(java.awt.event.ActionEvent)
	 */
	public void actionPerformed(ActionEvent e) {
		SlotMachine machine = SlotMachine.getInstance();

		if (((JButton)e.getSource()).getName().equals("start"))
			machine.start();

		if (((JButton)e.getSource()).getName().equals("stop"))
			machine.stop();
	}

	/**
	 * @param args Arguments
	 */
	public static void main(String[] args) {
		SlotMachineController controller = new SlotMachineController();
		SlotMachine.getInstance().addObserver(controller);
	}

	@Override
	public void update(Observable arg0, Object arg1) {
		java.awt.EventQueue.invokeLater(uiUpdater);
	}
}
