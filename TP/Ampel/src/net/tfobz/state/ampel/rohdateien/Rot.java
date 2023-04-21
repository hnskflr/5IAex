package net.tfobz.state.ampel.rohdateien;

import java.awt.event.ActionListener;

import javax.swing.Timer;

public class Rot implements Zustand {

    public Rot () {
        Ampel.getInstance().rotEin();
        if (Ampel.getInstance().automatisch)
            automatischSchalten();
    }

    @Override
    public void ein() {
    }

    @Override
    public void aus() {
        Ampel.getInstance().zustand = new OrangeBlinkend();
    }

    @Override
    public void manuellSchalten() {
        Ampel.getInstance().zustand = new Gruen();
    }

    @Override
    public void automatischSchalten() {
        Timer timer = new Timer(rotIntervall, new ActionListener() {
            @Override
            public void actionPerformed(java.awt.event.ActionEvent e) {
                Ampel.getInstance().zustand = new Gruen();
            }
        });
        timer.setRepeats(false);
        timer.start();
    }
        
}
