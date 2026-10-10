window.JAVAPATH_PHASE67_TOPICS = [
  {
    id: 'employee-management-project',
    phase: 6,
    title: 'Employee Management Console Application',
    icon: '🏢',
    level: 'Advanced',
    minutes: 45,
    description: 'A complete console application bringing together OOP, Collections, and Exception Handling.',
    objectives: [
      'Design a comprehensive data model with validation',
      'Implement a menu-driven console interface',
      'Use Collections (List, Map) for data management',
      'Apply custom exceptions for error handling',
      'Implement multiple sorting and filtering mechanisms'
    ],
    content: `
      <h2>The Problem: Managing Corporate Data</h2>
      <p>Until now, we have written small programs to test individual features of Java. In the real world, applications require a structured way to handle continuous user input, store data in memory, validate business rules, and provide useful operations.</p>
      <p>We are going to build a complete <strong>Employee Management Console Application</strong>. It will allow a user to add, remove, search, sort, and analyze employee records.</p>
      
      <h3>Project Requirements</h3>
      <ul>
        <li><strong>Data Model:</strong> An <code>Employee</code> class with <code>id</code>, <code>name</code>, <code>department</code>, and <code>salary</code>.</li>
        <li><strong>Validation:</strong> Salary cannot be negative. ID must be unique.</li>
        <li><strong>Storage:</strong> Use a <code>List&lt;Employee&gt;</code> to keep track of employees, and a <code>HashMap&lt;Integer, Employee&gt;</code> for fast ID lookups.</li>
        <li><strong>Operations:</strong> Add, List All, Search (by ID/Name), Remove, Sort (by name/salary/id), filter by department, calculate payroll.</li>
        <li><strong>Interface:</strong> A terminal-based menu that loops until the user chooses to exit.</li>
      </ul>

      <h3>1. The Data Model & Exceptions</h3>
      <p>First, we create a custom exception for our business logic, followed by the <code>Employee</code> class.</p>
      <div class="code-block">
        <div class="code-header"><span>InvalidEmployeeException.java</span></div>
        <pre><code>public class InvalidEmployeeException extends Exception {
    public InvalidEmployeeException(String message) {
        super(message);
    }
}</code></pre>
      </div>

      <div class="code-block">
        <div class="code-header"><span>Employee.java</span></div>
        <pre><code>import java.util.Objects;

public class Employee implements Comparable&lt;Employee&gt; {
    private int id;
    private String name;
    private String department;
    private double salary;

    public Employee(int id, String name, String department, double salary) throws InvalidEmployeeException {
        if (salary < 0) {
            throw new InvalidEmployeeException("Salary cannot be negative.");
        }
        if (name == null || name.trim().isEmpty()) {
            throw new InvalidEmployeeException("Name cannot be empty.");
        }
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }

    // Setters with validation
    public void setSalary(double salary) throws InvalidEmployeeException {
        if (salary < 0) {
            throw new InvalidEmployeeException("Salary cannot be negative.");
        }
        this.salary = salary;
    }

    @Override
    public String toString() {
        return String.format("ID: %d | Name: %-15s | Dept: %-10s | Salary: $%.2f", 
                             id, name, department, salary);
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return id == employee.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}</code></pre>
      </div>
      <div class="callout">
        <strong>Design Decision:</strong> We implemented <code>Comparable&lt;Employee&gt;</code> to define a "natural ordering" by ID. We also overrode <code>equals</code> and <code>hashCode</code> based on the <code>id</code> so that standard Java collections can accurately identify duplicate employees.
      </div>

      <h3>2. The Application Logic</h3>
      <p>Now we create the main application that manages the collections and the user menu.</p>
      <div class="code-block">
        <div class="code-header"><span>EmployeeManagerApp.java</span></div>
        <pre><code>import java.util.*;
import java.util.stream.Collectors;

public class EmployeeManagerApp {
    private Map&lt;Integer, Employee&gt; employeeMap;
    private Scanner scanner;

    public EmployeeManagerApp() {
        this.employeeMap = new HashMap&lt;&gt;();
        this.scanner = new Scanner(System.in);
    }

    public void start() {
        boolean running = true;
        System.out.println("=== Welcome to Employee Manager ===");
        
        while (running) {
            printMenu();
            int choice = getIntInput("Enter choice: ");
            
            try {
                switch (choice) {
                    case 1: addEmployee(); break;
                    case 2: listAllEmployees(); break;
                    case 3: searchById(); break;
                    case 4: sortEmployees(); break;
                    case 5: showAnalytics(); break;
                    case 6: 
                        running = false; 
                        System.out.println("Exiting application...");
                        break;
                    default:
                        System.out.println("Invalid choice. Please try again.");
                }
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
            System.out.println(); // Blank line for readability
        }
    }

    private void printMenu() {
        System.out.println("1. Add Employee");
        System.out.println("2. List All Employees");
        System.out.println("3. Search by ID");
        System.out.println("4. Sort Employees (by Salary)");
        System.out.println("5. Show Analytics (Payroll)");
        System.out.println("6. Exit");
    }

    private void addEmployee() throws InvalidEmployeeException {
        int id = getIntInput("Enter ID: ");
        if (employeeMap.containsKey(id)) {
            throw new InvalidEmployeeException("Employee with ID " + id + " already exists.");
        }
        
        System.out.print("Enter Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter Department: ");
        String dept = scanner.nextLine();
        
        double salary = getDoubleInput("Enter Salary: ");
        
        Employee emp = new Employee(id, name, dept, salary);
        employeeMap.put(id, emp);
        System.out.println("Employee added successfully!");
    }

    private void listAllEmployees() {
        if (employeeMap.isEmpty()) {
            System.out.println("No employees found.");
            return;
        }
        // Get values from map, put them in a list to iterate
        List&lt;Employee&gt; employees = new ArrayList&lt;&gt;(employeeMap.values());
        for (Employee e : employees) {
            System.out.println(e);
        }
    }

    private void searchById() {
        int id = getIntInput("Enter ID to search: ");
        Employee e = employeeMap.get(id);
        if (e != null) {
            System.out.println("Found: " + e);
        } else {
            System.out.println("Employee not found.");
        }
    }

    private void sortEmployees() {
        List&lt;Employee&gt; sortedList = new ArrayList&lt;&gt;(employeeMap.values());
        // Custom comparator for descending salary
        sortedList.sort((e1, e2) -> Double.compare(e2.getSalary(), e1.getSalary()));
        
        System.out.println("--- Employees Sorted by Salary (High to Low) ---");
        for (Employee e : sortedList) {
            System.out.println(e);
        }
    }
    
    private void showAnalytics() {
        if (employeeMap.isEmpty()) {
            System.out.println("No data available.");
            return;
        }
        
        double totalPayroll = 0;
        for (Employee e : employeeMap.values()) {
            totalPayroll += e.getSalary();
        }
        
        double avg = totalPayroll / employeeMap.size();
        System.out.printf("Total Payroll: $%.2f%n", totalPayroll);
        System.out.printf("Average Salary: $%.2f%n", avg);
    }

    // Helper methods to handle invalid number inputs cleanly
    private int getIntInput(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextInt()) {
            System.out.print("Invalid input. " + prompt);
            scanner.next(); // consume the bad input
        }
        int val = scanner.nextInt();
        scanner.nextLine(); // consume newline
        return val;
    }

    private double getDoubleInput(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextDouble()) {
            System.out.print("Invalid input. " + prompt);
            scanner.next();
        }
        double val = scanner.nextDouble();
        scanner.nextLine(); 
        return val;
    }

    public static void main(String[] args) {
        new EmployeeManagerApp().start();
    }
}</code></pre>
      </div>

      <h3>Sample Execution Session</h3>
      <div class="output-box">=== Welcome to Employee Manager ===
1. Add Employee
2. List All Employees
3. Search by ID
4. Sort Employees (by Salary)
5. Show Analytics (Payroll)
6. Exit
Enter choice: 1
Enter ID: 101
Enter Name: Alice Smith
Enter Department: Engineering
Enter Salary: 85000
Employee added successfully!

=== Welcome to Employee Manager ===
...
Enter choice: 1
Enter ID: 102
Enter Name: Bob Jones
Enter Department: HR
Enter Salary: -500
Error: Salary cannot be negative.</div>

      <h3>Design Decisions Explained</h3>
      <table class="compare-table">
        <tr>
          <th>Decision</th>
          <th>Reasoning</th>
        </tr>
        <tr>
          <td>Using <code>HashMap</code> for storage</td>
          <td>O(1) time complexity for finding employees by ID, preventing duplicate IDs easily.</td>
        </tr>
        <tr>
          <td>Helper input methods (<code>getIntInput</code>)</td>
          <td>Prevents <code>InputMismatchException</code> from crashing the program if a user types "abc" instead of a number.</td>
        </tr>
        <tr>
          <td><code>List&lt;Employee&gt;</code> for sorting</td>
          <td>Maps don't maintain a strict order by default (unless using TreeMap). Copying values to a List allows flexible sorting via <code>Comparator</code>.</td>
        </tr>
      </table>
    
      <div class="mistake-box">
        <h4>Common Mistakes</h4>
        <ul>
          <li><strong>Forgetting hashCode() and equals()</strong>: If you use custom objects as keys in a HashMap or store them in a HashSet without overriding these, Java won't know how to compare them properly.</li>
          <li><strong>Directly modifying collections while iterating</strong>: Use an Iterator or removeIf() to avoid ConcurrentModificationException.</li>
        </ul>
      </div>
      
      <div class="practice-section">
        <h3>Try This</h3>
        <p>Modify the Employee Management System to include an update feature.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public void updateEmployeeSalary(int id, double newSalary) throws InvalidEmployeeException {
    Employee emp = employeeMap.get(id);
    if (emp != null) {
        emp.setSalary(newSalary);
        System.out.println("Salary updated successfully.");
    } else {
        System.out.println("Employee not found.");
    }
}</code></pre>
          </div>
        </details>
      </div>
      
      <div class="practice-section">
        <h3>Try This</h3>
        <p>Add a feature to filter employees by department using Streams.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public void filterByDepartment(String dept) {
    employeeMap.values().stream()
        .filter(e -&gt; e.getDepartment().equalsIgnoreCase(dept))
        .forEach(System.out::println);
}</code></pre>
          </div>
        </details>
      </div>
      
      <div class="callout">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Custom exceptions make error handling more domain-specific.</li>
          <li>HashMaps provide efficient lookups for primary keys.</li>
          <li>Implementing Comparable allows for natural ordering, while Comparators provide flexible sorting.</li>
        </ul>
      </div>
  `
  },
  {
    id: 'contact-manager-project',
    phase: 6,
    title: 'Contact Manager Application',
    icon: '📞',
    level: 'Intermediate',
    minutes: 35,
    description: 'Build a Contact Manager to practice data validation, collections, and searching algorithms.',
    objectives: [
      'Implement string pattern matching for validation (Regex)',
      'Manage objects using lists and sets',
      'Implement partial string search',
      'Handle multiple comparators'
    ],
    content: `
      <h2>The Problem: Managing Contacts</h2>
      <p>While the Employee system relied heavily on numeric IDs and money, a Contact Manager relies heavily on <strong>String manipulation and validation</strong>. Phone numbers must look like phone numbers, and emails must look like emails.</p>

      <h3>Core Components</h3>
      <p>A <code>Contact</code> class holds a name, phone, and email. We will use Regular Expressions (Regex) to validate the data inside the constructor.</p>

      <div class="code-block">
        <div class="code-header"><span>Contact.java</span></div>
        <pre><code>public class Contact {
    private String name;
    private String phone;
    private String email;

    public Contact(String name, String phone, String email) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (!phone.matches("\\\\d{10}")) { // Simple regex: exactly 10 digits
            throw new IllegalArgumentException("Phone must be 10 digits");
        }
        if (!email.contains("@") || !email.contains(".")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
    
    // Getters and toString() omitted for brevity
    public String getName() { return name; }
    
    @Override
    public String toString() {
        return String.format("%s - %s - %s", name, phone, email);
    }
}</code></pre>
      </div>

      <h3>Partial Name Search</h3>
      <p>When searching for a contact, users often don't type the exact full name. They might type "Ali" to find "Alice". We can implement a search method using streams or standard loops.</p>

      <div class="code-block">
        <div class="code-header"><span>ContactManager.java</span></div>
        <pre><code>import java.util.*;

public class ContactManager {
    private List&lt;Contact&gt; contacts = new ArrayList&lt;&gt;();

    public void addContact(Contact c) {
        contacts.add(c);
    }

    public List&lt;Contact&gt; searchByName(String keyword) {
        List&lt;Contact&gt; results = new ArrayList&lt;&gt;();
        String lowerKeyword = keyword.toLowerCase();
        
        for (Contact c : contacts) {
            // Case-insensitive partial match
            if (c.getName().toLowerCase().contains(lowerKeyword)) {
                results.add(c);
            }
        }
        return results;
    }
    
    public void sortByName() {
        // Using Java 8 Method References
        contacts.sort(Comparator.comparing(Contact::getName, String.CASE_INSENSITIVE_ORDER));
    }
}</code></pre>
      </div>
      
      <div class="callout">
        <strong>Pro Tip:</strong> <code>String.CASE_INSENSITIVE_ORDER</code> is a built-in comparator that makes sure "Zebra" doesn't get sorted before "apple" (which usually happens due to ASCII values where uppercase letters come before lowercase).
      </div>
    
      <div class="output-box">
        Bob - 9876543210 - bob@email.com
      </div>
      
      <table class="compare-table">
        <tr>
          <th>Collection</th>
          <th>Best Used For</th>
        </tr>
        <tr>
          <td>ArrayList</td>
          <td>Maintaining insertion order and fast iterations/index access.</td>
        </tr>
        <tr>
          <td>HashSet</td>
          <td>Ensuring no duplicate contacts are added automatically.</td>
        </tr>
      </table>

      <div class="mistake-box">
        <h4>Common Mistakes</h4>
        <ul>
          <li><strong>Weak Regex</strong>: Using simple string matching for emails might let invalid formats slip through. Always test regex thoroughly.</li>
        </ul>
      </div>
      
      <div class="practice-section">
        <h3>Try This</h3>
        <p>Add a Set to prevent duplicate phone numbers.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>private Set&lt;String&gt; phoneNumbers = new HashSet&lt;&gt;();
public void addContact(Contact c) {
    if (phoneNumbers.add(c.getPhone())) {
        contacts.add(c);
    } else {
        System.out.println("Duplicate phone number!");
    }
}</code></pre>
          </div>
        </details>
      </div>
      
      <div class="practice-section">
        <h3>Try This</h3>
        <p>Implement a method to sort contacts by email domain.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public void sortByEmailDomain() {
    contacts.sort(Comparator.comparing(c -&gt; c.getEmail().substring(c.getEmail().indexOf('@'))));
}</code></pre>
          </div>
        </details>
      </div>

      <div class="callout">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Regex is powerful for validating strings like phones and emails.</li>
          <li>Case-insensitive sorting requires specific comparators like String.CASE_INSENSITIVE_ORDER.</li>
        </ul>
      </div>
  `
  },
  {
    id: 'billing-calculator',
    phase: 6,
    title: 'Billing Calculator Exercise',
    icon: '🧾',
    level: 'Beginner',
    minutes: 30,
    description: 'Process a list of products to calculate totals, taxes, and discounts.',
    objectives: [
      'Perform mathematical calculations accurately',
      'Format output using printf',
      'Handle edge cases like zero quantities or missing prices',
      'Utilize Streams for aggregation'
    ],
    content: `
      <h2>The Problem: Cart Totals</h2>
      <p>E-commerce systems need robust ways to calculate cart totals. A cart contains multiple <code>Product</code> objects, each with a price and quantity.</p>

      <div class="code-block">
        <div class="code-header"><span>Product.java</span></div>
        <pre><code>public class Product {
    private String name;
    private double price;
    private int quantity;

    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public double getLineTotal() {
        return price * quantity;
    }
    // getters omitted
}</code></pre>
      </div>

      <h3>Calculating the Bill</h3>
      <p>We need to apply an 8% tax rate, and a 10% discount if the subtotal is over $100.</p>

      <div class="code-block">
        <div class="code-header"><span>BillingService.java</span></div>
        <pre><code>import java.util.List;

public class BillingService {
    private static final double TAX_RATE = 0.08;
    private static final double DISCOUNT_RATE = 0.10;
    private static final double DISCOUNT_THRESHOLD = 100.00;

    public void generateInvoice(List&lt;Product&gt; cart) {
        System.out.println("--- INVOICE ---");
        double subtotal = 0;
        
        for (Product p : cart) {
            double lineTotal = p.getLineTotal();
            subtotal += lineTotal;
            System.out.printf("%-15s %3d x $%.2f = $%.2f%n", 
                p.getName(), p.getQuantity(), p.getPrice(), lineTotal);
        }
        
        System.out.println("-----------------");
        System.out.printf("Subtotal: $%.2f%n", subtotal);
        
        double discount = 0;
        if (subtotal > DISCOUNT_THRESHOLD) {
            discount = subtotal * DISCOUNT_RATE;
            System.out.printf("Discount (10%%): -$%.2f%n", discount);
        }
        
        double afterDiscount = subtotal - discount;
        double tax = afterDiscount * TAX_RATE;
        System.out.printf("Tax (8%%): $%.2f%n", tax);
        
        double finalTotal = afterDiscount + tax;
        System.out.println("-----------------");
        System.out.printf("TOTAL: $%.2f%n", finalTotal);
    }
}</code></pre>
      </div>
      
      <div class="execution-trace">
        <strong>Execution Trace for 2 Books ($20 ea) and 1 Chair ($80):</strong>
        <ol>
          <li>Book line total: $40.00</li>
          <li>Chair line total: $80.00</li>
          <li>Subtotal: $120.00</li>
          <li>Subtotal > $100, so Discount = $12.00</li>
          <li>After discount: $108.00</li>
          <li>Tax (8% of 108): $8.64</li>
          <li>Final Total: $116.64</li>
        </ol>
      </div>
    
      <div class="output-box">
        --- INVOICE ---
        Book              2 x $20.00 = $40.00
        Chair             1 x $80.00 = $80.00
        -----------------
        Subtotal: $120.00
        Discount (10%): -$12.00
        Tax (8%): $8.64
        -----------------
        TOTAL: $116.64
      </div>

      <table class="compare-table">
        <tr>
          <th>Data Type</th>
          <th>Usage in Finance</th>
        </tr>
        <tr>
          <td>double / float</td>
          <td>Fast, but prone to rounding errors in exact calculations.</td>
        </tr>
        <tr>
          <td>BigDecimal</td>
          <td>Best for precise currency calculations to avoid float inaccuracies.</td>
        </tr>
      </table>

      <div class="mistake-box">
        <h4>Common Mistakes</h4>
        <ul>
          <li><strong>Using == for float/double comparisons</strong>: Due to precision issues, always check if the difference is within a small threshold.</li>
        </ul>
      </div>
      
      <div class="practice-section">
        <h3>Try This</h3>
        <p>Modify the billing service to apply a buy-one-get-one-free offer on specific items.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public double getLineTotalBOGO() {
    int paidQuantity = quantity / 2 + quantity % 2;
    return price * paidQuantity;
}</code></pre>
          </div>
        </details>
      </div>

      <div class="practice-section">
        <h3>Try This</h3>
        <p>Refactor the sum calculation to use Java Streams.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>double subtotal = cart.stream().mapToDouble(Product::getLineTotal).sum();</code></pre>
          </div>
        </details>
      </div>

      <div class="callout">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>printf is essential for nicely formatted financial outputs.</li>
          <li>Always validate inputs (e.g., negative prices/quantities).</li>
        </ul>
      </div>
  `
  },
  {
    id: 'sorting-exercises',
    phase: 6,
    title: 'Sorting and Searching Exercises',
    icon: '🔍',
    level: 'Intermediate',
    minutes: 35,
    description: 'Deep dive into Comparable, Comparator, binary search, and multi-field sorting.',
    objectives: [
      'Chain multiple Comparators together',
      'Use Collections.binarySearch() for efficiency',
      'Practice lambda expressions for custom sorting',
      'Filter data using Stream API'
    ],
    content: `
      <h2>The Problem: Complex Sorting Rules</h2>
      <p>Sometimes you need to sort data by more than one field. For example, sorting Employees by Department, and then by Salary within that Department.</p>

      <h3>Comparator Chaining</h3>
      <p>Java 8 makes this elegant using the <code>Comparator.comparing()</code> and <code>thenComparing()</code> methods.</p>

      <div class="code-block">
        <div class="code-header"><span>MultiSortExample.java</span></div>
        <pre><code>import java.util.*;

public class MultiSortExample {
    public static void main(String[] args) {
        List&lt;Employee&gt; staff = Arrays.asList(
            new Employee(1, "Alice", "IT", 75000),
            new Employee(2, "Bob", "HR", 60000),
            new Employee(3, "Charlie", "IT", 82000),
            new Employee(4, "Dave", "HR", 55000)
        );

        // Sort by Department (A-Z), then by Salary (High to Low)
        Comparator&lt;Employee&gt; byDeptThenSalary = Comparator
            .comparing(Employee::getDepartment)
            .thenComparing(Employee::getSalary, Comparator.reverseOrder());

        staff.sort(byDeptThenSalary);
        
        for(Employee e : staff) {
            System.out.println(e.getDepartment() + " - " + e.getName() + " - $" + e.getSalary());
        }
    }
}</code></pre>
      </div>
      <div class="output-box">HR - Bob - $60000.0
HR - Dave - $55000.0
IT - Charlie - $82000.0
IT - Alice - $75000.0</div>

      <h3>Binary Search</h3>
      <p>If a list is ALREADY sorted, you can find an item in O(log N) time instead of O(N) using Binary Search.</p>
      
      <div class="code-block">
        <pre><code>// Assuming 'staff' is sorted by ID:
int index = Collections.binarySearch(staff, new Employee(3, "", "", 0));
if (index >= 0) {
    System.out.println("Found at index: " + index);
}</code></pre>
      </div>
      <div class="callout">
        <strong>Important:</strong> <code>Collections.binarySearch()</code> relies on the <code>compareTo</code> method (natural ordering) by default. If you sorted the list with a custom Comparator, you MUST pass that same Comparator to the binarySearch method!
      </div>
    
      <table class="compare-table">
        <tr>
          <th>Interface</th>
          <th>Method</th>
          <th>Usage</th>
        </tr>
        <tr>
          <td>Comparable</td>
          <td>compareTo(T o)</td>
          <td>Defines the default, natural sorting order within the class itself.</td>
        </tr>
        <tr>
          <td>Comparator</td>
          <td>compare(T o1, T o2)</td>
          <td>External class/lambda for custom, multiple sorting strategies.</td>
        </tr>
      </table>

      <div class="mistake-box">
        <h4>Common Mistakes</h4>
        <ul>
          <li><strong>Binary Search on Unsorted List</strong>: binarySearch yields unpredictable results if the list is not sorted properly first.</li>
        </ul>
      </div>

      <div class="practice-section">
        <h3>Try This</h3>
        <p>Sort a list of strings by length, then alphabetically.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>List&lt;String&gt; words = Arrays.asList("apple", "pie", "banana", "kiwi");
words.sort(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));</code></pre>
          </div>
        </details>
      </div>

      <div class="practice-section">
        <h3>Try This</h3>
        <p>Use Streams to filter out employees with salary &lt; 60000 and collect to a new List.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>List&lt;Employee&gt; filtered = staff.stream()
    .filter(e -&gt; e.getSalary() &gt;= 60000)
    .collect(Collectors.toList());</code></pre>
          </div>
        </details>
      </div>
      
      <div class="callout">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Comparator chaining simplifies complex sorting logic.</li>
          <li>Binary search provides fast lookups for sorted collections.</li>
        </ul>
      </div>
  `
  },
  {
    id: 'oop-collection-exercises',
    phase: 6,
    title: 'OOP and Collection Combined Exercises',
    icon: '🧩',
    level: 'Advanced',
    minutes: 40,
    description: 'Scenarios that require combining inheritance, polymorphism, collections, and exceptions.',
    objectives: [
      'Model complex domains using interfaces and abstract classes',
      'Manage multiple related collections',
      'Implement robust error handling across object hierarchies'
    ],
    content: `
      <h2>The Problem: Real-World Complexity</h2>
      <p>Let's look at how OOP principles (Inheritance, Polymorphism) merge with Data Structures (Collections).</p>

      <h3>Scenario: The Library System</h3>
      <p>Design a system where a <code>Library</code> holds <code>LibraryItem</code> objects (Books, DVDs, Magazines). Users can check them out.</p>

      <div class="code-block">
        <div class="code-header"><span>LibraryModel.java</span></div>
        <pre><code>// Abstract base class
public abstract class LibraryItem {
    private String id;
    private String title;
    private boolean isCheckedOut;

    public LibraryItem(String id, String title) {
        this.id = id;
        this.title = title;
        this.isCheckedOut = false;
    }

    public void checkOut() {
        if (isCheckedOut) throw new IllegalStateException("Item already checked out");
        isCheckedOut = true;
    }

    public void returnItem() {
        isCheckedOut = false;
    }
    
    // Abstract method forcing children to define their loan period
    public abstract int getLoanPeriodDays();
    
    public String getTitle() { return title; }
}

// Concrete Class
public class Book extends LibraryItem {
    private String author;

    public Book(String id, String title, String author) {
        super(id, title);
        this.author = author;
    }

    @Override
    public int getLoanPeriodDays() { return 21; } // Books get 3 weeks
}

// Concrete Class
public class DVD extends LibraryItem {
    public DVD(String id, String title) { super(id, title); }

    @Override
    public int getLoanPeriodDays() { return 7; } // DVDs get 1 week
}</code></pre>
      </div>

      <p>In our manager class, we rely on Polymorphism. We keep a single list of <code>LibraryItem</code>s, regardless of whether they are Books or DVDs.</p>

      <div class="code-block">
        <pre><code>public class Library {
    private Map&lt;String, LibraryItem&gt; inventory = new HashMap&lt;&gt;();

    public void addItem(LibraryItem item) {
        inventory.put(item.getId(), item);
    }

    public void checkoutProcess(String id) {
        LibraryItem item = inventory.get(id);
        if (item == null) {
            System.out.println("Item not found");
            return;
        }
        
        try {
            item.checkOut(); // Polymorphic call!
            System.out.println("Checked out: " + item.getTitle());
            System.out.println("Due in " + item.getLoanPeriodDays() + " days.");
        } catch (IllegalStateException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}</code></pre>
      </div>
    
      <div class="output-box">
        Checked out: Effective Java
        Due in 21 days.
      </div>

      <table class="compare-table">
        <tr>
          <th>Concept</th>
          <th>Benefit in Collections</th>
        </tr>
        <tr>
          <td>Polymorphism</td>
          <td>Store different subclasses in a single Collection of the supertype.</td>
        </tr>
        <tr>
          <td>Abstract Classes</td>
          <td>Provide common state (id, title) while forcing specific behaviors (loan periods).</td>
        </tr>
      </table>

      <div class="mistake-box">
        <h4>Common Mistakes</h4>
        <ul>
          <li><strong>Casting without instanceof</strong>: When retrieving items from a polymorphic collection, blindly casting can lead to ClassCastException.</li>
        </ul>
      </div>

      <div class="practice-section">
        <h3>Try This</h3>
        <p>Add a return process that calculates late fees ($1/day).</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public void returnItem(int daysLate) {
    isCheckedOut = false;
    if (daysLate &gt; 0) {
        System.out.println("Late fee: $" + daysLate);
    }
}</code></pre>
          </div>
        </details>
      </div>

      <div class="practice-section">
        <h3>Try This</h3>
        <p>Implement an interface <code>Reservable</code> and make Books reservable.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public interface Reservable { void reserve(); }
public class Book extends LibraryItem implements Reservable {
    public void reserve() { System.out.println("Reserved."); }
}</code></pre>
          </div>
        </details>
      </div>

      <div class="callout">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Interfaces and abstract classes allow flexible collection handling.</li>
          <li>Exceptions help enforce business rules across object hierarchies.</li>
        </ul>
      </div>
  `
  },
  {
    id: 'debugging-skills',
    phase: 7,
    title: 'Debugging and Problem Solving',
    icon: '🐛',
    level: 'Beginner',
    minutes: 30,
    description: 'Learn how to read stack traces, isolate bugs, and fix logical errors methodically.',
    objectives: [
      'Identify compile-time, runtime, and logical errors',
      'Read and trace a Java Exception Stack Trace',
      'Apply System.out.println debugging effectively',
      'Follow a reproduce-isolate-fix methodology'
    ],
    content: `
      <h2>The Problem: The Code Doesn't Work</h2>
      <p>Writing code is only half the job. The other half is figuring out why the code isn't doing what you expect. A <strong>bug</strong> is simply a discrepancy between the program's intended behavior and its actual behavior.</p>

      <h3>Types of Bugs</h3>
      <table class="compare-table">
        <tr>
          <th>Type</th>
          <th>When it happens</th>
          <th>Example</th>
        </tr>
        <tr>
          <td><strong>Compile-time</strong></td>
          <td>Before the program runs. The compiler stops you.</td>
          <td>Missing semicolon, misspelled variable name, type mismatch.</td>
        </tr>
        <tr>
          <td><strong>Runtime</strong></td>
          <td>While the program is running. It crashes and throws an Exception.</td>
          <td><code>NullPointerException</code>, <code>ArrayIndexOutOfBoundsException</code>.</td>
        </tr>
        <tr>
          <td><strong>Logical</strong></td>
          <td>The program runs perfectly without crashing, but gives the wrong output.</td>
          <td>Using <code>+</code> instead of <code>-</code> in a math formula.</td>
        </tr>
      </table>

      <h3>Reading a Stack Trace</h3>
      <p>When a runtime exception occurs, Java prints a Stack Trace. Don't panic! It tells you exactly where the error occurred.</p>
      
      <div class="output-box">Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "name" is null
    at Employee.printNameLength(Employee.java:15)
    at Main.testEmployee(Main.java:8)
    at Main.main(Main.java:4)</div>
      
      <div class="callout">
        <strong>How to read it (Bottom to Top / Top to Bottom):</strong>
        <ul>
          <li><strong>The Error:</strong> <code>NullPointerException</code>. We tried to call a method on a <code>null</code> object.</li>
          <li><strong>The Details:</strong> Cannot invoke <code>String.length()</code> because <code>name</code> is null. (Java 14+ gives excellent detail here!)</li>
          <li><strong>The Location:</strong> It happened in <code>Employee.java</code> on line 15.</li>
          <li><strong>The Path (Trace):</strong> <code>main</code> called <code>testEmployee</code>, which called <code>printNameLength</code>.</li>
        </ul>
      </div>

      <h3>The "Print" Debugging Method</h3>
      <p>Before you learn complex IDE debuggers, you must master print debugging. If you have a logical error, print out variable states before and after the problematic logic.</p>

      <div class="mistake-box">
        <h4>Logical Bug Example</h4>
        <div class="code-block">
          <pre><code>public double calculateAverage(int sum, int count) {
    // BUG: Integer division truncates decimals!
    return sum / count; 
}</code></pre>
        </div>
        <p><strong>Debugging step:</strong> Print the types or cast them.</p>
        <div class="code-block">
          <pre><code>public double calculateAverage(int sum, int count) {
    System.out.println("Sum: " + sum + ", Count: " + count);
    double result = (double) sum / count;
    System.out.println("Result: " + result);
    return result;
}</code></pre>
        </div>
      </div>
      
      <h3>The Debugging Methodology</h3>
      <ol>
        <li><strong>Reproduce:</strong> Find exactly what inputs cause the bug. If you can't reproduce it, you can't fix it.</li>
        <li><strong>Isolate:</strong> Narrow down where the bug lives. (Which class? Which method? Which line?)</li>
        <li><strong>Fix:</strong> Apply a fix based on an understanding of the root cause, not just a random guess.</li>
        <li><strong>Verify:</strong> Run the reproduction steps again to ensure it is fixed and nothing else broke.</li>
      </ol>
    
      <h2>Debugging Challenges</h2>
      <div class="practice-section">
        <h3>Try This: Find the Bug</h3>
        <p>Why does this loop never terminate?</p>
        <div class="code-block">
            <pre><code>int count = 0;
while (count &lt; 10) {
    System.out.println("Count is: " + count);
    if (count == 5) {
        continue;
    }
    count++;
}</code></pre>
        </div>
        <details>
          <summary>Show Solution</summary>
          <p>When count reaches 5, the <code>continue</code> statement skips <code>count++</code>, causing an infinite loop.</p>
        </details>
      </div>

      <div class="practice-section">
        <h3>Try This: Array Out Of Bounds</h3>
        <p>Spot the error in this iteration.</p>
        <div class="code-block">
            <pre><code>int[] arr = {1, 2, 3};
for (int i = 0; i &lt;= arr.length; i++) {
    System.out.println(arr[i]);
}</code></pre>
        </div>
        <details>
          <summary>Show Solution</summary>
          <p>The condition should be <code>i &lt; arr.length</code>. The array size is 3, so valid indices are 0, 1, 2. Index 3 causes an exception.</p>
        </details>
      </div>
      
      <div class="callout">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Stack traces show the exact line and method call sequence of a crash.</li>
          <li>Print debugging is a solid first step for logical errors.</li>
        </ul>
      </div>
      
      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What is the difference between an Error and an Exception in Java?</summary>
        <p>Errors (like OutOfMemoryError) indicate serious problems the application shouldn't try to catch. Exceptions (like IOException) are conditions that a reasonable application might want to catch.</p>
      </details>
      <details>
        <summary>Q: Explain the reproduce-isolate-fix methodology.</summary>
        <p>First, reliably recreate the bug. Second, narrow down the exact line or block causing it. Finally, apply a targeted fix based on understanding the root cause.</p>
      </details>
  `
  },
  {
    id: 'clean-code',
    phase: 7,
    title: 'Writing Clean Java Code',
    icon: '✨',
    level: 'Intermediate',
    minutes: 40,
    description: 'Learn industry standards for writing code that is readable, maintainable, and professional.',
    objectives: [
      'Apply meaningful naming conventions',
      'Follow the Single Responsibility Principle for methods',
      'Eliminate magic numbers and hardcoded values',
      'Understand when and how to write comments'
    ],
    content: `
      <h2>The Problem: Code is Read More Than Written</h2>
      <p>Any fool can write code that a computer can understand. Good programmers write code that <em>humans</em> can understand. (Martin Fowler)</p>
      
      <h3>1. Naming Conventions</h3>
      <p>Names should reveal intent. Avoid single-letter variables (except in standard loops like <code>for (int i=0;)</code>).</p>
      
      <div class="mistake-box">
        <h4>Bad Naming</h4>
        <pre><code>int d; // elapsed time in days
List&lt;Employee&gt; list1 = new ArrayList&lt;&gt;();
public void process(Employee e) { ... }</code></pre>
        <h4>Clean Naming</h4>
        <pre><code>int elapsedTimeInDays;
List&lt;Employee&gt; activeEmployees = new ArrayList&lt;&gt;();
public void calculatePayroll(Employee employee) { ... }</code></pre>
      </div>

      <h3>2. Method Size & Single Responsibility</h3>
      <p>A method should do one thing, do it well, and do it only. If your method has the word "And" in its description (e.g., "This method calculates taxes AND saves to database"), split it up.</p>

      <table class="compare-table">
        <tr>
          <th>Dirty Code</th>
          <th>Clean Code</th>
        </tr>
        <tr>
          <td>
<pre><code>public void processUser(User u) {
  // 10 lines of validating user
  // 15 lines of calculating score
  // 10 lines of saving to DB
}</code></pre>
          </td>
          <td>
<pre><code>public void processUser(User u) {
  validateUser(u);
  calculateScore(u);
  saveToDatabase(u);
}</code></pre>
          </td>
        </tr>
      </table>

      <h3>3. Avoid Magic Numbers</h3>
      <p>A "magic number" is a hard-coded number in your logic with unexplained meaning. Extract them to <code>static final</code> constants.</p>
      
      <div class="mistake-box">
        <h4>Magic Numbers (Bad)</h4>
        <pre><code>if (employee.getStatus() == 1) {
    salary = salary * 1.05;
}</code></pre>
        <h4>Using Constants (Clean)</h4>
        <pre><code>private static final int STATUS_ACTIVE = 1;
private static final double ANNUAL_RAISE_MULTIPLIER = 1.05;

if (employee.getStatus() == STATUS_ACTIVE) {
    salary = salary * ANNUAL_RAISE_MULTIPLIER;
}</code></pre>
      </div>

      <h3>4. Meaningful Comments</h3>
      <p>Do not comment <em>what</em> the code is doing—the code itself should explain that. Comment <em>why</em> you did something unusual.</p>
      
      <div class="mistake-box">
        <h4>Bad Comments (Redundant)</h4>
        <pre><code>// Check if age is greater than 18
if (age > 18) {
    // set eligible to true
    isEligible = true;
}</code></pre>
        <h4>Good Comments (Contextual)</h4>
        <pre><code>// We use an external library here because the standard 
// Java Date API has a known bug with leap years before 1900.
return ThirdPartyDateEngine.calculate(date);</code></pre>
      </div>
    
      <h2>Refactoring Examples</h2>
      <div class="code-block">
        <div class="code-header"><span>Before Refactoring (Messy)</span></div>
        <pre><code>public void p(String n, int a) {
    if(a&gt;18) {
        System.out.println(n + " is adult");
    } else {
        System.out.println(n + " is minor");
    }
}</code></pre>
      </div>
      
      <div class="code-block">
        <div class="code-header"><span>After Refactoring (Clean)</span></div>
        <pre><code>private static final int ADULT_AGE_THRESHOLD = 18;

public void printAgeCategory(String name, int age) {
    if (age &gt;= ADULT_AGE_THRESHOLD) {
        System.out.println(name + " is adult");
    } else {
        System.out.println(name + " is minor");
    }
}</code></pre>
      </div>
      
      <div class="output-box">
        John is adult
      </div>
      
      <div class="practice-section">
        <h3>Try This</h3>
        <p>Refactor this hardcoded snippet to use constants: <code>double t = p * 0.08;</code></p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>private static final double TAX_RATE = 0.08;
double tax = price * TAX_RATE;</code></pre>
          </div>
        </details>
      </div>
      
      <div class="practice-section">
        <h3>Try This</h3>
        <p>Split a method that reads a file AND calculates stats into two distinct methods following SRP.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public String readFile(String path) { ... }
public void calculateStats(String content) { ... }</code></pre>
          </div>
        </details>
      </div>
      
      <div class="callout">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Readable code is easier to maintain and debug.</li>
          <li>Naming and structure matter just as much as logic.</li>
        </ul>
      </div>
      
      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What is the Single Responsibility Principle (SRP)?</summary>
        <p>A class or method should have one, and only one, reason to change, meaning it should perform only one distinct task.</p>
      </details>
      <details>
        <summary>Q: Why should we avoid magic numbers?</summary>
        <p>Hardcoded numbers hide meaning and make updates difficult. Named constants clarify intent and provide a single place for updates.</p>
      </details>
  `
  },
  {
    id: 'testing-basics',
    phase: 7,
    title: 'Testing Your Code',
    icon: '🧪',
    level: 'Advanced',
    minutes: 40,
    description: 'Introduction to software testing, test cases, and assertions.',
    objectives: [
      'Understand the purpose of automated testing',
      'Design Happy Path, Edge Case, and Error Case tests',
      'Use the assert keyword',
      'Understand the concepts behind JUnit'
    ],
    content: `
      <h2>The Problem: "It works on my machine"</h2>
      <p>How do you know your Employee management calculation works? You probably ran the main method, typed in some numbers, and checked the output. But what happens when you modify the code next month? Will you remember to test every possible scenario manually? No. We need <strong>Automated Testing</strong>.</p>

      <h3>What to Test?</h3>
      <p>When testing a method, you should design test inputs for three categories:</p>
      <ul>
        <li><strong>Happy Path:</strong> Standard, expected input. (e.g., Salary = 50000).</li>
        <li><strong>Edge Cases:</strong> Boundaries of acceptable inputs. (e.g., Salary = 0).</li>
        <li><strong>Error/Failure Cases:</strong> Invalid inputs that should trigger exceptions. (e.g., Salary = -500).</li>
      </ul>

      <h3>Manual Automated Testing (The primitive way)</h3>
      <p>Before using a testing framework, we can write a test method that verifies expected outcomes programmatically.</p>

      <div class="code-block">
        <div class="code-header"><span>EmployeeTest.java</span></div>
        <pre><code>public class EmployeeTest {
    
    public static void main(String[] args) {
        testHappyPath();
        testNegativeSalaryThrowsException();
        System.out.println("All tests finished.");
    }
    
    public static void testHappyPath() {
        try {
            Employee e = new Employee(1, "John", "IT", 50000);
            if (e.getSalary() == 50000) {
                System.out.println("testHappyPath: PASSED");
            } else {
                System.out.println("testHappyPath: FAILED");
            }
        } catch (Exception ex) {
            System.out.println("testHappyPath: FAILED with exception");
        }
    }
    
    public static void testNegativeSalaryThrowsException() {
        try {
            new Employee(2, "Jane", "HR", -100);
            System.out.println("testNegativeSalary: FAILED (No exception thrown!)");
        } catch (InvalidEmployeeException ex) {
            System.out.println("testNegativeSalary: PASSED (Exception caught)");
        } catch (Exception ex) {
            System.out.println("testNegativeSalary: FAILED (Wrong exception type)");
        }
    }
}</code></pre>
      </div>

      <h3>Introduction to JUnit (Conceptual)</h3>
      <p>Writing <code>if/else</code> statements and <code>System.out.println</code> for every test is tedious. In professional Java development, we use <strong>JUnit</strong>. It uses annotations like <code>@Test</code> and assertion methods like <code>assertEquals()</code>.</p>
      
      <div class="code-block">
        <div class="code-header"><span>JUnit Example (Preview)</span></div>
        <pre><code>import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EmployeeJUnitTest {

    @Test
    public void testValidEmployeeCreation() throws Exception {
        Employee e = new Employee(1, "John", "IT", 50000);
        assertEquals(50000, e.getSalary());
        assertEquals("John", e.getName());
    }

    @Test
    public void testNegativeSalaryThrowsException() {
        assertThrows(InvalidEmployeeException.class, () -> {
            new Employee(2, "Jane", "HR", -100);
        });
    }
}</code></pre>
      </div>
      
      <div class="callout">
        <strong>Summary:</strong> A test suite is a safety net. It allows you to confidently refactor and add new features, knowing that if you break something old, a test will immediately tell you.
      </div>
    
      <div class="output-box">
        testHappyPath: PASSED
        testNegativeSalary: PASSED (Exception caught)
        All tests finished.
      </div>

      <table class="compare-table">
        <tr>
          <th>Test Type</th>
          <th>Purpose</th>
        </tr>
        <tr>
          <td>Happy Path</td>
          <td>Verifies the component works with expected, normal inputs.</td>
        </tr>
        <tr>
          <td>Edge Case</td>
          <td>Tests boundaries (like 0, null, or max values).</td>
        </tr>
      </table>

      <div class="mistake-box">
        <h4>Common Mistakes</h4>
        <ul>
          <li><strong>Not testing failures</strong>: Ensure you test that exceptions are thrown when invalid input is provided.</li>
        </ul>
      </div>

      <div class="practice-section">
        <h3>Try This</h3>
        <p>Write a JUnit test for a method that reverses a string.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>@Test
public void testStringReverse() {
    assertEquals("cba", StringUtils.reverse("abc"));
    assertEquals("", StringUtils.reverse(""));
}</code></pre>
          </div>
        </details>
      </div>
      
      <div class="practice-section">
        <h3>Try This</h3>
        <p>Write an edge case test for calculating an average with an empty list.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>@Test
public void testAverageEmptyList() {
    List&lt;Integer&gt; nums = new ArrayList&lt;&gt;();
    assertThrows(IllegalArgumentException.class, () -&gt; {
        Calculator.average(nums);
    });
}</code></pre>
          </div>
        </details>
      </div>
  `
  }
];
