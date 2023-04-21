public class Mitarbeiterhierarchie {
    public static void main(String[] args) {
        DepartmentManager manager = new DepartmentManager("Manager1", "1111111111", "Department1");
        manager.add(new Employee("Employee1", "1111111111"));
        
        DepartmentManager manager2 = new DepartmentManager("Manager2", "2222222222", "Department2");
        manager2.add(new Employee("Employee1", "2222222222"));
        manager2.add(new Employee("Employee2", "2222222222"));
        manager.add(manager2);

        DepartmentManager manager3 = new DepartmentManager("Manager3", "3333333333", "Department3");
        manager3.add(new Employee("Employee3", "3333333333"));
        manager2.add(manager3);

        manager.print(1);
    }    
}