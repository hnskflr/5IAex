import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class FileLogger implements Logger {

    private String path;

    public FileLogger(String path) {
        this.path = path;
    }

    @Override
    public void log(String text) {
        System.out.println("Writing " + text + " to path: " + path);

        File file = new File(path);

        try {
            if (file.createNewFile())
                System.out.println("Created file " + file.getName());
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            FileWriter writer = new FileWriter(path, true);
            writer.write(text + '\n');
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
