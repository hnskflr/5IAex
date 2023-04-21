package net.tfobz.state.ampel.rohdateien;

import java.awt.event.ActionListener;

import javax.swing.Timer;

public class Gruen implements Zustand {

    public Gruen() {
        Ampel.getInstance().gruenEin();

        Timer timer = new Timer(gruenIntervall, new ActionListener() {
            @Override
            public void actionPerformed(java.awt.event.ActionEvent e) {
                Ampel.getInstance().zustand = new Orange();
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
