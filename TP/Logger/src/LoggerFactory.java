import java.io.File;
import java.io.IOException;
import java.util.regex.Pattern;

public class LoggerFactory {
    
    public static Logger create(String type) {
        if (type == null || type.equals(""))
            return new ConsoleLogger();

        if (isValidIpPort(type))
            return new UdpLogger(type);
        
        if (isValidPath(type))
            return new FileLogger(type);

        return new ConsoleLogger();
    }

    private static boolean isValidIpPort(String ipPort) {
        return Pattern.matches("^(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}):(\\d{1,7})$", ipPort);
    }

    private static boolean isValidPath(String path) {
        File file = new File(path);
        try {
            file.getCanonicalFile();
        } catch (IOException e) {
            return false;
        }
        return true;
    }
}
