import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DepartmentManager extends AbstractEmployee {

    private String name;
    private String phoneNumber;
    private String department;

    private List<AbstractEmployee> employees;

    public DepartmentManager(String name, String phoneNumber, String department) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.department = department;
        employees = new ArrayList<AbstractEmployee>();
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getPhoneNumber() {
        return this.phoneNumber;
    }
    
    public String getDepartment() {
        return this.department;
    }

    public void add(AbstractEmployee employee) {
        this.employees.add(employee);
    }

    public void remove(AbstractEmployee employee) {
        this.employees.remove(employee);
    }

    public AbstractEmployee getEmployee(int i) {
        return this.employees.get(i);
    }

    public int getEmployeeCount() {
        return this.employees.size();
    }

    public void print(int layer) {
        Collections.sort(this.employees);
        System.out.println(getName() + ", " + getPhoneNumber() + ", " + getDepartment());

        for (int i = 0; i < getEmployeeCount(); i++) {
            for (int j = 0; j <= layer; j++) {
                System.out.print('.');
            }
            employees.get(i).print(layer+2);
        }
    }

    @Override
    public int compareTo(AbstractEmployee e) {
        return this.name.compareTo(e.getName());
    }
}
