public class Employee extends AbstractEmployee {

    private String name;
    private String phoneNumber;

    public Employee(String name, String phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    @Override
    public void print(int layer) {
        System.out.println(getName() + ", " + getPhoneNumber());
    }

    @Override
    public int compareTo(AbstractEmployee e) {
        return this.name.compareTo(e.getName());
    }
    
}
