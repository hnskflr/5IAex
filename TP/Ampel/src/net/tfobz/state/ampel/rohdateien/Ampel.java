package net.tfobz.state.ampel.rohdateien;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Ampel extends AmpelComponent {

    private static Ampel INSTANCE;
    public Zustand zustand;
    public boolean automatisch = false;

    public Ampel() {
        super();
        addEinKnopfListener(new EinKnopfListener());
        addAusKnopfListener(new AusKnopfListener());
        addManuellKnopfListener(new ManuellKnopfListener());
        addAutomatischKnopfListener(new AutoKnopfListener());
    }

    public static Ampel getInstance() {
        if (INSTANCE == null)
            INSTANCE = new Ampel();

        return INSTANCE;
    }

    private class EinKnopfListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            Ampel.getInstance().automatisch = false;
            if (Ampel.getInstance().zustand == null)
                Ampel.getInstance().zustand = new OrangeBlinkend();
            Ampel.getInstance().zustand.ein();
        }
    }

    private class AusKnopfListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            Ampel.getInstance().automatisch = false;
            Ampel.getInstance().zustand.aus();
        }
    }

    private class ManuellKnopfListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            Ampel.getInstance().automatisch = false;
            Ampel.getInstance().zustand.manuellSchalten();
        }
    }

    private class AutoKnopfListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            Ampel.getInstance().automatisch = true;
            Ampel.getInstance().zustand.automatischSchalten();
        }
    }
}
