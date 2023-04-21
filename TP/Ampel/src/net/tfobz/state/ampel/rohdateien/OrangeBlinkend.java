package net.tfobz.state.ampel.rohdateien;

public class OrangeBlinkend implements Zustand {

    public OrangeBlinkend() {
        Ampel.getInstance().orangeBlinkenEin();
    }

    @Override
    public void ein() {
        Ampel.getInstance().zustand = new Orange();
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
