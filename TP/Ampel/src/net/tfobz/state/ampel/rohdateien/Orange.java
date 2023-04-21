package net.tfobz.state.ampel.rohdateien;

import java.awt.event.ActionListener;

import javax.swing.Timer;

public class Orange implements Zustand {

    public Orange() {
        Ampel.getInstance().orangeEin();

        Timer timer = new Timer(orangeIntervall, new ActionListener() {
            @Override
            public void actionPerformed(java.awt.event.ActionEvent e) {
                Ampel.getInstance().zustand = new Rot();
            }
        });
        timer.setRepeats(false);
        timer.start();
    }

    @Override
    public void ein() {
    }

    @Override
    public void aus() {
    }

    @Override
    public void manuellSchalten() {
    }

    @Override
    public void automatischSchalten() {
    }
        
}
