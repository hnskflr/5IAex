public class UdpLogger implements Logger {

    private String ip;
    private int port;

    public UdpLogger(String ipPort) {
        String split[] = ipPort.split(":");
        this.ip = split[0];
        this.port = Integer.parseInt(split[1]);
    }

    @Override
    public void log(String text) {
        System.out.println("Writing " + text + " to ip: " + ip + ", port: " + port);
    }
    
}
