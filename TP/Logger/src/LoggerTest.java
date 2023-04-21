public class LoggerTest {

    private LoggerFactory factory = new LoggerFactory();

    @Test
    public void testConsole() {
        Logger consoleLogger = factory.create("");
        consoleLogger.log("Hello World");
        assertTrue(true);
    }

    @Test
    public void testFile() {
        Logger fileLogger = factory.create("./log.txt");
        fileLogger.log("Hello World");
        assertTrue(true);
    }

    @Test
    public void testUdp() {
        Logger udpLogger = factory.create("10.0.0.123:9876");
        udpLogger.log("Hello World");
        assertTrue(true);
    }

}
