(() => {
  "use strict";

  window.JAVAPATH_ASSIGNMENTS = {
    mcq: [
      {
        id: "mcq-1",
        question: "When does method overloading is determined?",
        options: ["At run time", "At compile time", "At coding time", "At execution time"],
        answer: 1,
        explanation: "Method overloading is determined at compile time because the compiler decides which method to call based on the method signature."
      },
      {
        id: "mcq-2",
        question: "What would be the output of the following code snippet if variable a=10?\nif(a<=0) { if(a==0) { System.out.println(\"1 \"); } else { System.out.println(\"2 \"); } } System.out.println(\"3 \");",
        options: ["1 2", "2 3", "1 3", "3"],
        answer: 3,
        explanation: "Since a=10, the condition a<=0 is false, so the inner if block is skipped. Only the final System.out.println(\"3 \") executes."
      },
      {
        id: "mcq-3",
        question: "What is stored in the object obj in following lines of code?\nbox obj;",
        options: ["Memory address of allocated memory of object", "NULL", "Any arbitrary pointer", "Garbage"],
        answer: 1,
        explanation: "When you declare a reference variable without initializing it, it contains null by default in Java."
      },
      {
        id: "mcq-4",
        question: "Which of these operators is used to allocate memory for an object?",
        options: ["malloc", "alloc", "new", "give"],
        answer: 2,
        explanation: "The 'new' operator is used in Java to allocate memory for an object and invoke the constructor."
      },
      {
        id: "mcq-5",
        question: "What is the process of defining more than one method in a class differentiated by method signature?",
        options: ["Function overriding", "Function overloading", "Function doubling", "None of the mentioned"],
        answer: 1,
        explanation: "Function overloading is defining multiple methods with the same name but different parameters (signature)."
      },
      {
        id: "mcq-6",
        question: "What is the return type of Constructors?",
        options: ["int", "Float", "void", "none of the mentioned"],
        answer: 3,
        explanation: "Constructors do not have a return type, not even void. They return the instance of the class implicitly."
      },
      {
        id: "mcq-7",
        question: "What is the output of this program?\nclass box { int width, height, length, volume; box() { width=5; height=5; length=6; } void volume() { volume = width*height*length; } } ... obj.volume(); System.out.println(obj.volume);",
        options: ["100", "150", "200", "250"],
        answer: 1,
        explanation: "volume = 5 * 5 * 6 = 150. Note: The method name 'volume()' shadows the variable 'volume', so the method doesn't actually set the variable correctly."
      },
      {
        id: "mcq-8",
        question: "What is the output of the following code?\nclass San { public void m1(int i, float f) {...} public void m1(float f, int i); {...} ... s.m1(20,20); }",
        options: ["int float method", "float int method", "Runtime error", "Compile Time Error"],
        answer: 3,
        explanation: "There's a syntax error - semicolon after method declaration instead of opening brace. Also, 20 is int, so it would match m1(int, float) but the code won't compile."
      },
      {
        id: "mcq-9",
        question: "How can a protected modifier be accessed?",
        options: ["accessible only within the class", "accessible only within package", "accessible within package and outside the package but through inheritance only", "accessible by all"],
        answer: 2,
        explanation: "Protected members are accessible within the same package and outside the package only through inheritance."
      },
      {
        id: "mcq-10",
        question: "Which is the correct way of calling a constructor having no parameters, of superclass A by subclass B?",
        options: ["super(void);", "superclass.();", "super.A();", "super();"],
        answer: 3,
        explanation: "super() is used to call the no-argument constructor of the superclass. It must be the first line in the subclass constructor."
      },
      {
        id: "mcq-11",
        question: "Which block is executed only once when the class is loaded?",
        options: ["Constructor", "Static block", "Instance block", "Finalizer"],
        answer: 1,
        explanation: "Static blocks are executed only once when the class is loaded into memory, before any instance is created."
      },
      {
        id: "mcq-12",
        question: "Which keyword is used to refer to the current object?",
        options: ["class", "this", "new", "malloc"],
        answer: 1,
        explanation: "The 'this' keyword refers to the current instance of the class."
      },
      {
        id: "mcq-13",
        question: "What is the result of the following code snippet?\nLocalDate date = LocalDate.of(2024, 2, 29); System.out.println(date);",
        options: ["2024-02-29", "2024-03-01", "Error: Invalid date", "2024-02-28"],
        answer: 0,
        explanation: "2024 is a leap year, so February 29 is a valid date. The output will be 2024-02-29."
      },
      {
        id: "mcq-14",
        question: "How would you parse a date string like \"2023-08-15\" to a LocalDate object?",
        options: ["LocalDate.of(2023, 8, 15)", "LocalDate.parse(\"2023-08-15\")", "LocalDate.get(\"2023-08-15\")", "LocalDate.format(\"2023-08-15\")"],
        answer: 1,
        explanation: "LocalDate.parse() is used to parse a string in ISO format (yyyy-MM-dd) to a LocalDate object."
      },
      {
        id: "mcq-15",
        question: "What is the parent class of all classes in Java?",
        options: ["Object", "String", "Class", "System"],
        answer: 0,
        explanation: "Object is the root class of the Java class hierarchy. All classes implicitly extend Object."
      },
      {
        id: "mcq-16",
        question: "What is the primary difference between a Set and a List?",
        options: ["A Set allows duplicate elements, while a List does not", "A List is unmodifiable, while a Set is modifiable", "A List allows duplicate elements, while a Set does not", "A Set is indexed, while a List is not"],
        answer: 2,
        explanation: "List allows duplicate elements and maintains insertion order. Set does not allow duplicates and does not guarantee order."
      },
      {
        id: "mcq-17",
        question: "Which is the new method introduced in Java 8 to iterate over a collection?",
        options: ["for (String i : StringList)", "foreach (String i : StringList)", "StringList.forEach()", "List.for()"],
        answer: 2,
        explanation: "Java 8 introduced the forEach() method in the Iterable interface, which accepts a Consumer functional interface."
      },
      {
        id: "mcq-18",
        question: "What does SAM stand for in the context of Functional Interface?",
        options: ["Single Ambivalue Method", "Single Abstract Method", "Simple Active Markup", "Simple Abstract Markup"],
        answer: 1,
        explanation: "SAM stands for Single Abstract Method. A functional interface has exactly one abstract method."
      },
      {
        id: "mcq-19",
        question: "Which of the following are functional interfaces? (Select ALL that apply)",
        options: ["java.util.stream.Stream", "java.util.function.Consumer", "java.util.function.Supplier", "java.util.function.Predicate", "java.util.function.Function"],
        answer: [1, 2, 3, 4],
        explanation: "Consumer, Supplier, Predicate, and Function are all functional interfaces in java.util.function package. Stream is not a functional interface.",
        type: "multi-select"
      },
      {
        id: "mcq-20",
        question: "Which of the following are terminal operations?",
        options: ["sorted", "filter", "collect", "distinct"],
        answer: 2,
        explanation: "collect() is a terminal operation. sorted(), filter(), and distinct() are intermediate operations."
      },
      {
        id: "mcq-21",
        question: "What will be the output of the following Java program?\nclass A { int i; } class B extends A { int j; void display() { super.i = j + 1; System.out.println(j + \" \" + i); } } ... obj.i=1; obj.j=2; obj.display();",
        options: ["2 2", "3 3", "2 3", "3 2"],
        answer: 2,
        explanation: "super.i = j + 1 sets i = 2 + 1 = 3. Then it prints j (2) and i (3), so output is '2 3'."
      },
      {
        id: "mcq-22",
        question: "Output of the below Java Code?\nclass Base { public final void show() {...} } class Derived extends Base { public void show() {...} } ... Base b = new Derived(); b.show();",
        options: ["Derived::show() called", "Base::show() called", "Compiler Error", "Exception"],
        answer: 2,
        explanation: "Compiler Error: Cannot override a final method. The show() method in Base is marked final, so it cannot be overridden."
      },
      {
        id: "mcq-23",
        question: "What is not the use of \"this\" keyword in Java?",
        options: ["Referring to the instance variable when a local variable has the same name", "Passing itself to the method of the same class", "Passing itself to another method", "Calling another constructor in constructor chaining"],
        answer: 1,
        explanation: "Option B is incorrect - 'this' is not used to pass itself to a method of the same class in that way. It's used for the other purposes listed."
      },
      {
        id: "mcq-24",
        question: "Which one of the following is not an access modifier?",
        options: ["Protected", "Void", "Public", "Private"],
        answer: 1,
        explanation: "Void is a return type, not an access modifier. The access modifiers are public, private, protected, and default (package-private)."
      },
      {
        id: "mcq-25",
        question: "Which of the following is/are true about constructors in Java?\n1) Constructor name should be same as class name.\n2) If you don't define a constructor, a default parameterless constructor is automatically created.\n3) The default constructor calls super() and initializes instance variables to default values.\n4) To call parent class constructor, it must be called in first line of constructor.",
        options: ["1", "1, 2", "1, 2 and 3", "1, 2, 3 and 4"],
        answer: 3,
        explanation: "All statements 1, 2, and 3 are correct. Statement 4 is also correct but the phrasing in the option is incomplete."
      },
      {
        id: "mcq-26",
        question: "What is the output of the following Java program?\nclass Test { static int count = 0; Test() { count++; } ... Test t1 = new Test(); Test t2 = new Test(); System.out.println(Test.count); }",
        options: ["0", "1", "2", "Runtime Error"],
        answer: 2,
        explanation: "count is static, so it's shared across all instances. Each constructor call increments it. After creating 2 objects, count = 2."
      },
      {
        id: "mcq-27",
        question: "Which statement is true about abstract classes in Java?",
        options: ["An abstract class can be instantiated directly", "An abstract class can have both abstract and non-abstract methods", "An abstract class must implement all methods declared as abstract in its superclasses", "An abstract class cannot have any constructors"],
        answer: 1,
        explanation: "Abstract classes can have both abstract and non-abstract (concrete) methods. They cannot be instantiated directly."
      },
      {
        id: "mcq-28",
        question: "Which of the following lambda expressions is correct for a function that takes two integers and returns their sum?",
        options: ["(a, b) -> a + b", "a, b -> {return a + b;}", "(a, b) { return a + b }", "(a, b) -> a * b"],
        answer: 0,
        explanation: "The correct syntax is (parameters) -> expression or (parameters) -> { statements }. Option A is the correct lambda for sum."
      },
      {
        id: "mcq-29",
        question: "Can a functional interface have multiple abstract methods?",
        options: ["Yes, as long as they have default implementations", "No, it must have exactly one abstract method", "Yes, but only if they are overloaded methods", "Yes, but they must have the same method signature"],
        answer: 1,
        explanation: "A functional interface must have exactly one abstract method. It can have multiple default or static methods, but only one abstract method."
      },
      {
        id: "mcq-30",
        question: "What will happen if two classes in different packages have the same name and are imported in a Java file?",
        options: ["Compilation error due to ambiguity", "The last imported class is used", "The first imported class is used", "Java automatically renames one class"],
        answer: 0,
        explanation: "Compilation error: When two classes with the same name are imported, it creates ambiguity. You must use fully qualified names to resolve this."
      }
    ],
    practical: [
      {
        id: "practical-1",
        title: "Bank Transaction System",
        description: "Create a banking system with interface, inheritance, and runtime polymorphism for withdraw and deposit operations.",
        difficulty: "Medium",
        topics: ["interfaces", "inheritance", "polymorphism", "constructors"],
        solution: `interface ITransaction {
    double savingMinBal = 500;
    double currentMinBal = 3000;
    String withdraw(double amount);
    String deposit(double amount);
}

class Bank implements ITransaction {
    private String name;
    private String ifscCode;

    Bank() {
        this.name = "";
        this.ifscCode = "";
    }

    Bank(String name, String ifscCode) {
        this.name = name;
        this.ifscCode = ifscCode;
    }

    public String getName() { return name; }
    public String getIfscCode() { return ifscCode; }
}

class Customer extends Bank {
    private int customerId;
    private String customerName;
    private String accountType;
    private double balance;

    Customer() {
        super();
        this.customerId = 0;
        this.customerName = "";
        this.accountType = "";
        this.balance = 0;
    }

    Customer(String bankName, String ifscCode, int customerId, String customerName, String accountType, double balance) {
        super(bankName, ifscCode);
        this.customerId = customerId;
        this.customerName = customerName;
        this.accountType = accountType;
        this.balance = balance;
    }

    public String withdraw(double amount) {
        if (accountType.equals("S") || accountType.equals("Saving")) {
            if (balance - amount < savingMinBal) {
                return "Your account has insufficient funds";
            }
        } else if (accountType.equals("C") || accountType.equals("Current")) {
            if (balance - amount < currentMinBal) {
                return "Your account has insufficient funds";
            }
        }
        balance -= amount;
        return "Your account is debited with " + amount + " and current balance is " + balance;
    }

    public String deposit(double amount) {
        balance += amount;
        return "Your account is credited with " + amount + " and current balance is " + balance;
    }

    public void display() {
        System.out.println("Bank : " + getName());
        System.out.println("Customer Id : " + customerId);
        System.out.println("Customer name : " + customerName);
        System.out.println("Account type : " + accountType);
        System.out.println("Balance : " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Customer Details");
        System.out.print("Enter Bank Name: ");
        String bankName = sc.nextLine();
        System.out.print("Enter Bank IFSC Code: ");
        String ifsc = sc.nextLine();
        System.out.print("Enter Customer id: ");
        int id = sc.nextInt();
        sc.nextLine();
        System.out.print("Enter Customer Name: ");
        String name = sc.nextLine();
        System.out.print("Enter Account Type (S/C): ");
        String type = sc.nextLine();
        System.out.print("Enter Balance: ");
        double bal = sc.nextDouble();

        Customer cust = new Customer(bankName, ifsc, id, name, type, bal);

        System.out.println("Enter the option");
        System.out.println("1. Withdraw");
        System.out.println("2. Deposit");
        int choice = sc.nextInt();

        if (choice == 1) {
            System.out.print("Enter the amount: ");
            double amt = sc.nextDouble();
            String result = cust.withdraw(amt);
            cust.display();
            System.out.println(result);
        } else if (choice == 2) {
            System.out.print("Enter the amount: ");
            double amt = sc.nextDouble();
            String result = cust.deposit(amt);
            cust.display();
            System.out.println(result);
        }
    }
}`,
        explanation: "This solution demonstrates interface implementation, inheritance (Customer extends Bank), runtime polymorphism through method overriding, and encapsulation with private fields and getters."
      },
      {
        id: "practical-2",
        title: "Book Management System",
        description: "Create a Book class with input, calculation, and display methods using private methods.",
        difficulty: "Easy",
        topics: ["classes", "methods", "encapsulation"],
        solution: `import java.util.Scanner;

class Book {
    private int bookId;
    private String bookName;
    private String author;
    private double price;
    private double discount;
    private double discountedPrice;

    public void inputDetail() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Book ID: ");
        this.bookId = sc.nextInt();
        sc.nextLine();
        System.out.print("Enter Book Name: ");
        this.bookName = sc.nextLine();
        System.out.print("Enter Author: ");
        this.author = sc.nextLine();
        System.out.print("Enter Price: ");
        this.price = sc.nextDouble();
        System.out.print("Enter Discount (as decimal, e.g., 0.1 for 10%): ");
        this.discount = sc.nextDouble();
        calculate();
    }

    private void calculate() {
        this.discountedPrice = price - (price * discount);
    }

    public void printDetails() {
        System.out.println("Book ID: " + bookId);
        System.out.println("Book Name: " + bookName);
        System.out.println("Author: " + author);
        System.out.println("Original Price: " + price);
        System.out.println("Discount: " + (discount * 100) + "%");
        System.out.println("Price after discount: " + discountedPrice);
    }
}

public class Main {
    public static void main(String[] args) {
        Book book = new Book();
        book.inputDetail();
        System.out.println("\\n--- Book Details ---");
        book.printDetails();
    }
}`,
        explanation: "This solution demonstrates encapsulation with private fields, a private calculate() method for internal logic, and public methods for input and output."
      },
      {
        id: "practical-3",
        title: "Electricity Bill Calculator",
        description: "Calculate electricity bill based on slab rates for different unit ranges.",
        difficulty: "Easy",
        topics: ["conditional-statements", "arithmetic-operations"],
        solution: `import java.util.Scanner;

public class ElectricityBill {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the No of Units: ");
        int units = sc.nextInt();
        double total = 0;

        if (units <= 100) {
            total = units * 5;
        } else if (units <= 300) {
            total = (100 * 5) + ((units - 100) * 6.50);
        } else if (units <= 600) {
            total = (100 * 5) + (200 * 6.50) + ((units - 300) * 7);
        } else {
            total = (100 * 5) + (200 * 6.50) + (300 * 7) + ((units - 600) * 9);
        }

        System.out.println("The total charges are " + total);
    }
}`,
        explanation: "This solution uses conditional statements to calculate electricity bills based on tiered pricing. Each slab has a different rate, and the calculation is cumulative."
      },
      {
        id: "practical-4",
        title: "Staff Management System",
        description: "Create a staff hierarchy with Admin, TeachingStaff, and HOD using inheritance and polymorphism.",
        difficulty: "Medium",
        topics: ["inheritance", "polymorphism", "constructors", "method-overriding"],
        solution: `abstract class Staff {
    private int staffId;
    private String staffName;
    private String gender;

    Staff(int staffId, String staffName, String gender) {
        this.staffId = staffId;
        this.staffName = staffName;
        this.gender = gender;
    }

    public void print() {
        System.out.println("Staff ID: " + staffId);
        System.out.println("Staff Name: " + staffName);
        System.out.println("Gender: " + gender);
    }

    public abstract double calculate();
}

class Admin extends Staff {
    private String designation;
    private double basic;

    Admin(int staffId, String staffName, String gender, String designation, double basic) {
        super(staffId, staffName, gender);
        this.designation = designation;
        this.basic = basic;
    }

    public void print() {
        super.print();
        System.out.println("Designation: " + designation);
        System.out.println("Basic: " + basic);
    }

    public double calculate() {
        double hra = 0.10 * basic;
        double da = 0.40 * basic;
        return basic + hra + da;
    }
}

class TeachingStaff extends Staff {
    private String subject;
    private int exp;
    private double basic;
    private double teachingAllowance;

    TeachingStaff(int staffId, String staffName, String gender, String subject, int exp, double basic, double teachingAllowance) {
        super(staffId, staffName, gender);
        this.subject = subject;
        this.exp = exp;
        this.basic = basic;
        this.teachingAllowance = teachingAllowance;
    }

    public void print() {
        super.print();
        System.out.println("Subject: " + subject);
        System.out.println("Experience: " + exp + " years");
        System.out.println("Basic: " + basic);
        System.out.println("Teaching Allowance: " + teachingAllowance);
    }

    public double calculate() {
        double hra = 0.15 * basic;
        double da = 0.60 * basic;
        return basic + hra + da + teachingAllowance;
    }
}

class HOD extends TeachingStaff {
    private String deptId;
    private String deptName;

    HOD(int staffId, String staffName, String gender, String subject, int exp, double basic, double teachingAllowance, String deptId, String deptName) {
        super(staffId, staffName, gender, subject, exp, basic, teachingAllowance);
        this.deptId = deptId;
        this.deptName = deptName;
    }

    public void print() {
        super.print();
        System.out.println("Department ID: " + deptId);
        System.out.println("Department Name: " + deptName);
    }
}

public class Main {
    public static void main(String[] args) {
        Staff s1 = new Admin(101, "John", "Male", "System Admin", 50000);
        Staff s2 = new TeachingStaff(102, "Mary", "Female", "Java", 5, 45000, 5000);
        Staff s3 = new HOD(103, "Robert", "Male", "Computer Science", 10, 60000, 8000, "DEPT001", "CS Department");

        System.out.println("--- Admin ---");
        s1.print();
        System.out.println("Gross Salary: " + s1.calculate());

        System.out.println("\\n--- Teaching Staff ---");
        s2.print();
        System.out.println("Gross Salary: " + s2.calculate());

        System.out.println("\\n--- HOD ---");
        s3.print();
        System.out.println("Gross Salary: " + s3.calculate());
    }
}`,
        explanation: "This solution demonstrates inheritance hierarchy, abstract classes, method overriding, and runtime polymorphism using the Staff reference type."
      },
      {
        id: "practical-5",
        title: "Email Processing",
        description: "Process email addresses to extract usernames and domains separately.",
        difficulty: "Easy",
        topics: ["strings", "arrays", "loops"],
        solution: `import java.util.Scanner;
import java.util.ArrayList;

public class EmailProcessor {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> emails = new ArrayList<>();

        System.out.println("Enter 10 email addresses:");
        for (int i = 0; i < 10; i++) {
            emails.add(sc.nextLine());
        }

        StringBuilder usernames = new StringBuilder();
        StringBuilder domains = new StringBuilder();

        for (String email : emails) {
            int atIndex = email.indexOf('@');
            if (atIndex != -1) {
                usernames.append(email.substring(0, atIndex)).append(" ");
                domains.append(email.substring(atIndex + 1)).append(" ");
            }
        }

        System.out.println("Usernames: " + usernames.toString().trim());
        System.out.println("Domains: " + domains.toString().trim());
    }
}`,
        explanation: "This solution uses String manipulation with indexOf() and substring() to separate usernames from domains in email addresses."
      },
      {
        id: "practical-6",
        title: "String Filter",
        description: "Filter strings from a list that start with a given character.",
        difficulty: "Easy",
        topics: ["strings", "collections", "streams"],
        solution: `import java.util.*;
import java.util.stream.Collectors;

public class StringFilter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<String> strings = new ArrayList<>();

        System.out.println("Enter strings (type 'done' to finish):");
        String input;
        while (!(input = sc.nextLine()).equals("done")) {
            strings.add(input);
        }

        System.out.print("Enter character to filter: ");
        char filterChar = sc.nextLine().charAt(0);

        // Using Java 8 Streams
        List<String> filtered = strings.stream()
            .filter(s -> s.startsWith(String.valueOf(filterChar)))
            .collect(Collectors.toList());

        System.out.println("Strings starting with '" + filterChar + "':");
        filtered.forEach(System.out::println);
    }
}`,
        explanation: "This solution demonstrates Java 8 Streams with filter() to process collections. It filters strings that start with a specified character."
      },
      {
        id: "practical-7",
        title: "Palindrome Checker",
        description: "Check if a string is a palindrome by comparing it with its reverse.",
        difficulty: "Easy",
        topics: ["strings", "stringbuilder"],
        solution: `import java.util.Scanner;

public class PalindromeChecker {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String original = sc.nextLine();

        String reversed = new StringBuilder(original).reverse().toString();

        System.out.println("Reversed String: " + reversed);

        if (original.equalsIgnoreCase(reversed)) {
            System.out.println("It is Palindrome");
        } else {
            System.out.println("It is not palindrome");
        }
    }
}`,
        explanation: "This solution uses StringBuilder's reverse() method to reverse the string and compares it with the original (case-insensitive) to check for palindrome."
      },
      {
        id: "practical-8",
        title: "Age Calculator from DOB",
        description: "Calculate age from date of birth and filter those above 30 years.",
        difficulty: "Medium",
        topics: ["dates-time", "localdate", "period"],
        solution: `import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class AgeCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy");

        List<LocalDate> dobs = new ArrayList<>();
        System.out.println("Enter dates of birth (dd-MMM-yyyy format, type 'done' to finish):");

        while (true) {
            String input = sc.nextLine();
            if (input.equals("done")) break;
            try {
                dobs.add(LocalDate.parse(input, formatter));
            } catch (Exception e) {
                System.out.println("Invalid format. Use dd-MMM-yyyy (e.g., 10-Oct-2010)");
            }
        }

        LocalDate today = LocalDate.now();
        System.out.println("\\nPeople above 30 years:");

        for (LocalDate dob : dobs) {
            Period age = Period.between(dob, today);
            if (age.getYears() > 30) {
                System.out.println("DOB: " + dob.format(formatter) + " - Age: " + age.getYears() + " years");
            }
        }
    }
}`,
        explanation: "This solution uses Java 8's LocalDate and Period classes to calculate age from date of birth and filter those above 30 years."
      },
      {
        id: "practical-9",
        title: "Vehicle Equality Check",
        description: "Create Vehicle and Ticket classes with equals() and toString() overrides.",
        difficulty: "Medium",
        topics: ["classes", "object-methods", "equals", "tostring"],
        solution: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

class Ticket {
    private String ticketNo;
    private LocalDateTime parkedTime;
    private double cost;

    public Ticket(String ticketNo, LocalDateTime parkedTime, double cost) {
        this.ticketNo = ticketNo;
        this.parkedTime = parkedTime;
        this.cost = cost;
    }

    public String getTicketNo() { return ticketNo; }
    public LocalDateTime getParkedTime() { return parkedTime; }
    public double getCost() { return cost; }
}

class Vehicle {
    private String registrationNo;
    private String name;
    private String type;
    private double weight;
    private Ticket ticket;

    public Vehicle(String registrationNo, String name, String type, double weight, Ticket ticket) {
        this.registrationNo = registrationNo;
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.ticket = ticket;
    }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        return "Registration No:" + registrationNo + "\\n" +
               "Name:" + name + "\\n" +
               "Type:" + type + "\\n" +
               "Weight:" + String.format("%.1f", weight) + "\\n" +
               "Ticket No:" + ticket.getTicketNo();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Vehicle other = (Vehicle) obj;
        return registrationNo.equalsIgnoreCase(other.registrationNo) &&
               name.equalsIgnoreCase(other.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        System.out.println("Enter Vehicle 1 details:");
        String[] v1 = sc.nextLine().split(",");
        Ticket t1 = new Ticket(v1[5], LocalDateTime.parse(v1[6], formatter), Double.parseDouble(v1[7]));
        Vehicle vehicle1 = new Vehicle(v1[0], v1[1], v1[2], Double.parseDouble(v1[3]), t1);

        System.out.println("Enter Vehicle 2 details:");
        String[] v2 = sc.nextLine().split(",");
        Ticket t2 = new Ticket(v2[5], LocalDateTime.parse(v2[6], formatter), Double.parseDouble(v2[7]));
        Vehicle vehicle2 = new Vehicle(v2[0], v2[1], v2[2], Double.parseDouble(v2[3]), t2);

        System.out.println("\\nVehicle 1");
        System.out.println(vehicle1);
        System.out.println();
        System.out.println("Vehicle 2");
        System.out.println(vehicle2);
        System.out.println();

        if (vehicle1.equals(vehicle2)) {
            System.out.println("Vehicle 1 is same as Vehicle 2");
        } else {
            System.out.println("Vehicle 1 and Vehicle 2 are different");
        }
    }
}`,
        explanation: "This solution demonstrates overriding equals() and toString() methods. Two vehicles are considered equal if they have the same registration number and name (case-insensitive)."
      },
      {
        id: "practical-10",
        title: "Contact Group Management",
        description: "Create a menu-driven contact management system with Contact and Group classes.",
        difficulty: "Medium",
        topics: ["classes", "collections", "menu-driven", "string-manipulation"],
        solution: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

class Contact {
    private String name;
    private String company;
    private String title;
    private String mobile;
    private String alternateMobile;
    private String email;
    private LocalDate dateCreated;

    public Contact() {}

    public Contact(String name, String company, String title, String mobile, 
                   String alternateMobile, String email, LocalDate dateCreated) {
        this.name = name;
        this.company = company;
        this.title = title;
        this.mobile = mobile;
        this.alternateMobile = alternateMobile;
        this.email = email;
        this.dateCreated = dateCreated;
    }

    public static Contact createContact(String detail) {
        String[] parts = detail.split(",");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return new Contact(
            parts[0].trim(),
            parts[1].trim(),
            parts[2].trim(),
            parts[3].trim(),
            parts[4].trim(),
            parts[5].trim(),
            LocalDate.parse(parts[6].trim(), formatter)
        );
    }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return name + " " + company + " " + title + " " + mobile + " " + 
               alternateMobile + " " + email + " " + dateCreated.format(formatter);
    }

    public String getName() { return name; }
}

class Group {
    private String name;
    private List<Contact> contactList;

    public Group(String name, List<Contact> contactList) {
        this.name = name;
        this.contactList = contactList != null ? contactList : new ArrayList<>();
    }

    public void addContactToGroup(Contact contact) {
        contactList.add(contact);
    }

    public boolean removeContactFromGroup(String name) {
        for (Contact c : contactList) {
            if (c.getName().equalsIgnoreCase(name)) {
                contactList.remove(c);
                return true;
            }
        }
        return false;
    }

    public void displayContacts() {
        if (contactList.isEmpty()) {
            System.out.println("No contact to show");
        } else {
            System.out.println("Contacts in " + name);
            System.out.println("Name Company Title Mobile Alternate Mobile Email Date Created");
            for (Contact c : contactList) {
                System.out.println(c);
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the group name: ");
        String groupName = sc.nextLine();
        Group group = new Group(groupName, new ArrayList<>());

        while (true) {
            System.out.println("\\n1.Add Contact");
            System.out.println("2.Delete Contact");
            System.out.println("3.Display contacts");
            System.out.println("4.Exit");
            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter the number of contacts: ");
                    int n = sc.nextInt();
                    sc.nextLine();
                    for (int i = 0; i < n; i++) {
                        String detail = sc.nextLine();
                        group.addContactToGroup(Contact.createContact(detail));
                    }
                    break;
                case 2:
                    System.out.print("Enter the name of the contact to be deleted: ");
                    String name = sc.nextLine();
                    if (group.removeContactFromGroup(name)) {
                        System.out.println("Contact successfully deleted");
                    } else {
                        System.out.println("Contact not found in the group");
                    }
                    break;
                case 3:
                    group.displayContacts();
                    break;
                case 4:
                    return;
                default:
                    System.out.println("Invalid choice");
            }
        }
    }
}`,
        explanation: "This solution demonstrates a complete menu-driven application with Contact and Group classes, using ArrayList for storage, and string parsing for creating objects from comma-separated values."
      }
    ]
  };
})();
