window.JAVAPATH_PHASE1_TOPICS = [
  {
    id: 'program-structure',
    phase: 1,
    title: 'Java Program Structure',
    icon: '☕',
    level: 'Beginner',
    minutes: 25,
    description: 'Understand the anatomy of a Java program, compilation process, and JDK/JRE/JVM.',
    objectives: [
      'Explain the roles of JDK, JRE, and JVM.',
      'Understand the compilation and execution flow in Java.',
      'Write and explain every part of a basic Java program.',
      'Identify file naming rules and entry points.',
      'Run Java programs using command line tools.'
    ],
    content: `
      <h2>The Foundation of Java</h2>
      <p>Before writing code to manage employees in our company, we need to understand how Java operates. Java is designed around the principle of <strong>"Write Once, Run Anywhere" (WORA)</strong>.</p>
      
      <h3>JDK, JRE, and JVM</h3>
      <p>Java relies on three main components to write and run code:</p>
      <ul>
        <li><strong>JDK (Java Development Kit)</strong>: The full toolbox for developers. Contains tools to compile (<code>javac</code>), document, and package Java programs, plus the JRE.</li>
        <li><strong>JRE (Java Runtime Environment)</strong>: The environment needed to run Java programs. Contains the JVM and standard libraries. It cannot compile code.</li>
        <li><strong>JVM (Java Virtual Machine)</strong>: The engine that executes the code. It translates Java instructions into the machine language of your specific operating system (Windows, Mac, Linux).</li>
      </ul>
      
      <div class="callout">
        <strong>Analogy:</strong> Think of the JDK as a fully equipped kitchen, the JRE as the dining room where the meal is served, and the JVM as the waiter who speaks the language of the specific customer at the table.
      </div>
      
      <h3>How Java Code Runs</h3>
      <p>Java is a two-step language (Compiled AND Interpreted):</p>
      <div class="execution-trace">
        <ol>
          <li><strong>Source Code</strong>: You write code in a <code>.java</code> file. (e.g., <code>Employee.java</code>)</li>
          <li><strong>Compilation</strong>: The compiler (<code>javac</code>) checks your code for errors and translates it into <strong>Bytecode</strong> (a <code>.class</code> file). Bytecode is platform-independent.</li>
          <li><strong>Execution</strong>: The JVM reads the bytecode and translates it line-by-line into machine code that your computer's CPU can execute.</li>
        </ol>
      </div>
      
      <h3>Anatomy of a Java Program</h3>
      <p>Let's look at the absolute simplest Java program.</p>
      <div class="code-block">
        <div class="code-header"><span>EmployeeApp.java</span></div>
        <pre><code>public class EmployeeApp {
    public static void main(String[] args) {
        System.out.println("Employee Management System Started!");
    }
}</code></pre>
      </div>
      
      <div class="output-box">
        Employee Management System Started!
      </div>
      
      <h3>Line-by-Line Breakdown</h3>
      <ul>
        <li><code>public class EmployeeApp</code>: This declares a class. A class is a container for your code. <code>public</code> means it's accessible from anywhere. <strong>Rule:</strong> The file name must exactly match the public class name (i.e., <code>EmployeeApp.java</code>).</li>
        <li><code>public static void main(String[] args)</code>: This is the <strong>Entry Point</strong>. The JVM specifically looks for this exact method signature to start running your program.
          <ul>
            <li><code>public</code>: JVM needs access from outside to run it.</li>
            <li><code>static</code>: Means the method belongs to the class itself, so JVM can call it without creating an object first.</li>
            <li><code>void</code>: Means this method does not return any value when it finishes.</li>
            <li><code>main</code>: The special name of the method.</li>
            <li><code>String[] args</code>: Allows the program to accept command-line arguments.</li>
          </ul>
        </li>
        <li><code>System.out.println("...");</code>: Prints text to the console and adds a new line.</li>
      </ul>
      
      <h3>Compilation and Execution Commands</h3>
      <p>To run the program from the terminal:</p>
      <pre><code>// 1. Compile the code (produces EmployeeApp.class)
javac EmployeeApp.java

// 2. Run the compiled bytecode
java EmployeeApp</code></pre>

      <h3>Common Mistakes</h3>
      <div class="mistake-box">
        <p><strong>Mistake:</strong> File name doesn't match the public class name.</p>
        <pre><code>// File: app.java
public class EmployeeApp { ... }</code></pre>
        <p><strong>Error:</strong> <code>class EmployeeApp is public, should be declared in a file named EmployeeApp.java</code></p>
        <p><strong>Fix:</strong> Rename file to <code>EmployeeApp.java</code>.</p>
      </div>
      <div class="mistake-box">
        <p><strong>Mistake:</strong> Missing semicolon at the end of a statement.</p>
        <pre><code>System.out.println("Hello") // Error!</code></pre>
      </div>

      <div class="practice-section">
        <h3>Practice Exercise</h3>
        <p>Write a program named <code>CompanyIntro.java</code> that prints out your company's name and its year of establishment on two separate lines.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <div class="code-header"><span>CompanyIntro.java</span></div>
            <pre><code>public class CompanyIntro {
    public static void main(String[] args) {
        System.out.println("MouriTech");
        System.out.println("Established: 2005");
    }
}</code></pre>
          </div>
          <div class="output-box">
MouriTech
Established: 2005
          </div>
        </details>
      </div>

      <h3>Comparison: JDK vs JRE vs JVM</h3>
      <table class="compare-table">
        <tr><th>Component</th><th>Full Form</th><th>Role</th><th>Contains</th></tr>
        <tr><td><strong>JDK</strong></td><td>Java Development Kit</td><td>Development environment for building apps.</td><td>JRE + Development tools (javac, debugger)</td></tr>
        <tr><td><strong>JRE</strong></td><td>Java Runtime Environment</td><td>Runtime environment for executing apps.</td><td>JVM + Core libraries</td></tr>
        <tr><td><strong>JVM</strong></td><td>Java Virtual Machine</td><td>Execution engine that interprets bytecode.</td><td>Just the execution engine</td></tr>
      </table>

      <h3>Real-World Application</h3>
      <p>The "Write Once, Run Anywhere" principle allows enterprise companies to develop their Employee Management System on a Windows PC and deploy it seamlessly to a secure Linux server without rewriting or recompiling the code. This makes Java ideal for large-scale corporate applications.</p>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: Explain the difference between JDK, JRE, and JVM.</summary>
        <p>JDK is for developing Java applications and contains the JRE and tools like the compiler. JRE provides the libraries and JVM needed to run Java programs. JVM is the engine that executes the bytecode.</p>
      </details>
      <details>
        <summary>Q: Why is Java called platform-independent?</summary>
        <p>Java code is compiled into intermediate bytecode rather than machine code. This bytecode can run on any device that has a compatible JVM installed.</p>
      </details>
      <details>
        <summary>Q: What is the entry point of a Java program?</summary>
        <p>The <code>public static void main(String[] args)</code> method is the entry point where the JVM begins execution.</p>
      </details>
    `
  },
  {
    id: 'variables-types',
    phase: 1,
    title: 'Variables and Data Types',
    icon: '📦',
    level: 'Beginner',
    minutes: 30,
    description: 'Learn how to store and categorize data using variables and Java primitive types.',
    objectives: [
      'Understand variables as named memory locations.',
      'Differentiate between primitive and reference data types.',
      'Memorize the 8 primitive data types and their capacities.',
      'Declare, initialize, and use variables correctly.',
      'Understand variable scope (local, instance, static).'
    ],
    content: `
      <h2>Variables: Containers for Data</h2>
      <p>In our Employee Management System, we need to store data: an employee's ID, their name, their salary, and whether they are active. In programming, we store data in <strong>variables</strong>.</p>
      <p>A variable is like a named locker in the computer's memory. When you create a variable, you must tell Java what <em>type</em> of data it will hold.</p>

      <h3>Primitive Data Types</h3>
      <p>Java is a <strong>strongly-typed</strong> language, meaning every variable must have a declared type. Java has 8 built-in "primitive" types representing simple values.</p>

      <table class="compare-table">
        <tr><th>Category</th><th>Type</th><th>Size</th><th>Example / Use Case</th></tr>
        <tr><td rowspan="4">Whole Numbers</td><td><code>byte</code></td><td>1 byte</td><td>Age (e.g., <code>25</code>)</td></tr>
        <tr><td><code>short</code></td><td>2 bytes</td><td>Year (e.g., <code>2024</code>)</td></tr>
        <tr><td><code>int</code></td><td>4 bytes</td><td><strong>Default choice.</strong> Employee ID (e.g., <code>100543</code>)</td></tr>
        <tr><td><code>long</code></td><td>8 bytes</td><td>Huge numbers. Phone numbers. (Append 'L': <code>9876543210L</code>)</td></tr>
        <tr><td rowspan="2">Decimals</td><td><code>float</code></td><td>4 bytes</td><td>Tax rate. (Append 'f': <code>15.5f</code>)</td></tr>
        <tr><td><code>double</code></td><td>8 bytes</td><td><strong>Default choice.</strong> Salary (e.g., <code>85000.50</code>)</td></tr>
        <tr><td>Characters</td><td><code>char</code></td><td>2 bytes</td><td>Single letter. Grade (e.g., <code>'A'</code>) - Use single quotes!</td></tr>
        <tr><td>Boolean</td><td><code>boolean</code></td><td>1 bit</td><td>True/False. isActive (e.g., <code>true</code>)</td></tr>
      </table>

      <h3>Reference Types (Introduction)</h3>
      <p>Besides primitives, Java has <strong>Reference Types</strong>. These don't hold the value directly; they hold the <em>memory address</em> pointing to a complex object. The most common is <code>String</code>.</p>
      <ul>
        <li><code>String name = "Alice";</code> (Note the capital 'S' and double quotes!)</li>
      </ul>

      <h3>Declaring and Initializing Variables</h3>
      <div class="code-block">
        <div class="code-header"><span>EmployeeData.java</span></div>
        <pre><code>public class EmployeeData {
    public static void main(String[] args) {
        // Declaration and Initialization
        int employeeId = 101;
        String employeeName = "John Doe";
        double monthlySalary = 5500.75;
        char departmentCode = 'I'; // 'I' for IT
        boolean isActive = true;

        // Displaying data
        System.out.println("Name: " + employeeName);
        System.out.println("ID: " + employeeId);
        System.out.println("Salary: $" + monthlySalary);
    }
}</code></pre>
      </div>
      <div class="output-box">
Name: John Doe
ID: 101
Salary: $5500.75
      </div>
      
      <div class="callout">
        <strong>Naming Convention:</strong> Variable names should use <code>camelCase</code>. Start with a lowercase letter, and capitalize subsequent words (e.g., <code>monthlySalary</code>).
      </div>

      <h3>Variable Scope</h3>
      <p>Where you declare a variable determines where it can be used:</p>
      <ul>
        <li><strong>Local Variables</strong>: Declared inside a method (like <code>main</code>). They only exist inside that method and MUST be initialized before use.</li>
        <li><strong>Instance Variables</strong>: Declared inside a class but outside methods. Belong to an object. Have default values (0, 0.0, false, null).</li>
        <li><strong>Static Variables</strong>: Belong to the class itself. Shared across all objects.</li>
      </ul>

      <h3>Common Mistakes</h3>
      <div class="mistake-box">
        <p><strong>Mistake:</strong> Using double quotes for a char.</p>
        <pre><code>char grade = "A"; // ERROR: incompatible types: String cannot be converted to char</code></pre>
        <p><strong>Fix:</strong> Use single quotes: <code>char grade = 'A';</code></p>
      </div>
      <div class="mistake-box">
        <p><strong>Mistake:</strong> Forgetting the 'L' suffix for a long.</p>
        <pre><code>long phone = 9876543210; // ERROR: integer number too large</code></pre>
        <p><strong>Fix:</strong> <code>long phone = 9876543210L;</code></p>
      </div>

      <div class="practice-section">
        <h3>Practice Exercise</h3>
        <p>Declare variables for an employee's first name, last name, age, hourly rate, and full-time status. Print out a summary sentence using these variables.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public class EmployeeSummary {
    public static void main(String[] args) {
        String firstName = "Jane";
        String lastName = "Smith";
        int age = 28;
        double hourlyRate = 35.50;
        boolean isFullTime = true;
        
        System.out.println(firstName + " " + lastName + " is " + age + " years old.");
        System.out.println("Full-time: " + isFullTime + ", Rate: $" + hourlyRate + "/hr");
    }
}</code></pre>
          </div>
          <div class="output-box">
Jane Smith is 28 years old.
Full-time: true, Rate: $35.5/hr
          </div>
        </details>
      </div>

      <div class="execution-trace">
        <h4>Execution Trace: Memory Allocation</h4>
        <ol>
          <li><code>int employeeId = 101;</code> - Reserves 4 bytes of memory, stores 101.</li>
          <li><code>String employeeName = "John Doe";</code> - Reserves memory for a reference, points it to the string object "John Doe".</li>
          <li><code>double monthlySalary = 5500.75;</code> - Reserves 8 bytes, stores 5500.75.</li>
        </ol>
      </div>

      <h3>Real-World Application</h3>
      <p>Choosing the correct data type is critical for performance and data integrity in large systems. For example, assigning <code>byte</code> instead of <code>int</code> for employee age saves memory, while using <code>long</code> is essential for global phone numbers to prevent data overflow errors.</p>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What is the difference between primitive and reference data types?</summary>
        <p>Primitive types store the actual values directly in memory (e.g., int, double). Reference types store the memory address of an object (e.g., String, custom objects).</p>
      </details>
      <details>
        <summary>Q: Why can't we use <code>int</code> for a phone number?</summary>
        <p>The maximum value an <code>int</code> can hold is roughly 2.14 billion. Most phone numbers exceed this value, so a <code>long</code> (or <code>String</code>) must be used instead.</p>
      </details>
      <details>
        <summary>Q: What are the default values for instance variables?</summary>
        <p>Numbers default to 0 (or 0.0), booleans default to false, and reference types (like String) default to null.</p>
      </details>
    `
  },
  {
    id: 'operators-casting',
    phase: 1,
    title: 'Operators and Type Casting',
    icon: '🧮',
    level: 'Beginner',
    minutes: 30,
    description: 'Perform calculations, evaluate conditions, and convert between data types.',
    objectives: [
      'Use arithmetic, assignment, relational, and logical operators.',
      'Understand the integer division trap and operator precedence.',
      'Differentiate between widening and narrowing type conversions.',
      'Apply explicit type casting correctly.'
    ],
    content: `
      <h2>Performing Operations</h2>
      <p>Data by itself isn't very useful until we manipulate it. In our Employee system, we might need to calculate a 10% bonus, deduct taxes, or check if an employee is eligible for promotion. We use <strong>Operators</strong> for this.</p>

      <h3>Operator Categories</h3>
      
      <h4>1. Arithmetic Operators</h4>
      <p><code>+</code> (add), <code>-</code> (subtract), <code>*</code> (multiply), <code>/</code> (divide), <code>%</code> (modulo - remainder).</p>
      
      <h4>2. Assignment Operators</h4>
      <p><code>=</code> (assign value), <code>+=</code> (add and assign), <code>-=</code>, <code>*=</code>, <code>/=</code></p>
      <pre><code>int salary = 5000;
salary += 500; // Same as: salary = salary + 500. Salary is now 5500.</code></pre>

      <h4>3. Relational (Comparison) Operators</h4>
      <p>Return a boolean (true/false). Used for conditions.<br>
      <code>==</code> (equal to), <code>!=</code> (not equal), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></p>

      <h4>4. Logical Operators</h4>
      <p>Combine multiple conditions.<br>
      <code>&&</code> (Logical AND: true if BOTH are true)<br>
      <code>||</code> (Logical OR: true if AT LEAST ONE is true)<br>
      <code>!</code> (Logical NOT: reverses the boolean value)</p>

      <h3>The Integer Division Trap</h3>
      <p>In Java, dividing an <code>int</code> by an <code>int</code> always results in an <code>int</code>. The decimal part is thrown away (truncated), not rounded.</p>
      <div class="mistake-box">
        <pre><code>int totalScore = 5;
int exams = 2;
double average = totalScore / exams; 
// 5 / 2 is 2. So average becomes 2.0. The 0.5 is lost!</code></pre>
        <p><strong>Fix:</strong> Make at least one operand a double.</p>
        <pre><code>double average = (double) totalScore / exams; // 2.5</code></pre>
      </div>

      <h3>Type Casting</h3>
      <p>Sometimes you need to convert a value from one type to another.</p>
      
      <h4>Widening (Implicit) Casting</h4>
      <p>Converting a smaller type to a larger type size. Java does this automatically because there's no risk of losing data.</p>
      <pre><code>int employeeId = 100;
long bigId = employeeId; // Automatic conversion (int to long)</code></pre>

      <h4>Narrowing (Explicit) Casting</h4>
      <p>Converting a larger type to a smaller type size. You must do this manually because you might lose data (e.g., losing decimals when converting double to int).</p>
      <pre><code>double exactBonus = 540.75;
// int roundedBonus = exactBonus; // ERROR: incompatible types
int roundedBonus = (int) exactBonus; // roundedBonus is 540. The .75 is lost.</code></pre>

      <div class="code-block">
        <div class="code-header"><span>SalaryCalculator.java</span></div>
        <pre><code>public class SalaryCalculator {
    public static void main(String[] args) {
        int baseSalary = 60000;
        double bonusPercentage = 0.15;
        
        // Calculate total
        double totalSalary = baseSalary + (baseSalary * bonusPercentage);
        
        // Cast to int for tax calculation system that only takes whole numbers
        int taxableIncome = (int) totalSalary;
        
        System.out.println("Total Salary: " + totalSalary);
        System.out.println("Taxable Income: " + taxableIncome);
        
        // Logical check
        boolean highlyPaid = taxableIncome > 65000 && taxableIncome < 100000;
        System.out.println("Is in medium-high tax bracket? " + highlyPaid);
    }
}</code></pre>
      </div>
      <div class="output-box">
Total Salary: 69000.0
Taxable Income: 69000
Is in medium-high tax bracket? true
      </div>
      
      <div class="practice-section">
        <h3>Practice Exercise</h3>
        <p>Write a program that takes a total number of days (e.g., 400) and calculates how many years and remaining days it is. (Assume 1 year = 365 days). Use the modulo <code>%</code> operator.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public class DateCalculator {
    public static void main(String[] args) {
        int totalDays = 400;
        int years = totalDays / 365;
        int remainingDays = totalDays % 365;
        
        System.out.println(totalDays + " days is " + years + " year(s) and " + remainingDays + " days.");
    }
}</code></pre>
          </div>
          <div class="output-box">
400 days is 1 year(s) and 35 days.
          </div>
        </details>
      </div>

      <h3>Comparison: Widening vs Narrowing Casting</h3>
      <table class="compare-table">
        <tr><th>Feature</th><th>Widening Casting</th><th>Narrowing Casting</th></tr>
        <tr><td><strong>Direction</strong></td><td>Small to Large (e.g., int &rarr; double)</td><td>Large to Small (e.g., double &rarr; int)</td></tr>
        <tr><td><strong>Execution</strong></td><td>Automatic / Implicit</td><td>Manual / Explicit (requires parenthesis)</td></tr>
        <tr><td><strong>Data Loss Risk</strong></td><td>No</td><td>Yes (truncation of decimals or overflow)</td></tr>
      </table>

      <div class="execution-trace">
        <h4>Execution Trace: Casting</h4>
        <ol>
          <li><code>double total = 69000.75;</code> - Evaluated and stored as double.</li>
          <li><code>int taxable = (int) total;</code> - The JVM explicitly truncates the <code>.75</code>.</li>
          <li><code>taxable</code> now holds the value <code>69000</code>.</li>
        </ol>
      </div>

      <div class="callout">
        <strong>Important:</strong> Modulo (<code>%</code>) is highly useful in real-world scenarios to determine if a number is even/odd (<code>num % 2 == 0</code>).
      </div>

      <h3>Real-World Application</h3>
      <p>Type casting is frequently used in financial applications where you might calculate compound interest with extreme precision (using doubles) but ultimately need to display or process the rounded whole currency amount for a transaction.</p>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What happens if you divide 5 by 2 in Java?</summary>
        <p>Because both operands are integers, Java performs integer division. The result is <code>2</code>, and the decimal part is truncated.</p>
      </details>
      <details>
        <summary>Q: What is the difference between <code>=</code> and <code>==</code>?</summary>
        <p><code>=</code> is the assignment operator used to assign a value to a variable. <code>==</code> is a relational operator used to compare two values for equality.</p>
      </details>
      <details>
        <summary>Q: Why do we need explicit casting for narrowing conversions?</summary>
        <p>Narrowing conversions can result in data loss (like losing decimal precision). Java requires explicit casting so the programmer acknowledges and accepts this potential loss of data.</p>
      </details>
    `
  },
  {
    id: 'input-output',
    phase: 1,
    title: 'Input and Output',
    icon: '⌨️',
    level: 'Beginner',
    minutes: 25,
    description: 'Learn to read user input from the console and format output output neatly.',
    objectives: [
      'Import and utilize the Scanner class for user input.',
      'Read different data types (Strings, ints, doubles).',
      'Identify and fix the common Scanner newline trap.',
      'Format output strings using printf.'
    ],
    content: `
      <h2>Interacting with the User</h2>
      <p>Hardcoding employee data into our programs isn't very useful. We need our HR admins to type in employee details while the program is running. In Java, console output is done via <code>System.out</code>, and console input is handled via <code>System.in</code> wrapped in a <code>Scanner</code>.</p>

      <h3>Using the Scanner Class</h3>
      <p>The <code>Scanner</code> class is part of the <code>java.util</code> package. To use it, you must <strong>import</strong> it at the top of your file.</p>

      <div class="code-block">
        <div class="code-header"><span>EmployeeRegistration.java</span></div>
        <pre><code>import java.util.Scanner; // Step 1: Import Scanner

public class EmployeeRegistration {
    public static void main(String[] args) {
        // Step 2: Create a Scanner object pointing to System.in
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter Employee Name: ");
        String name = scanner.nextLine(); // Reads the whole line
        
        System.out.print("Enter Employee ID: ");
        int id = scanner.nextInt(); // Reads an integer
        
        System.out.print("Enter Salary: ");
        double salary = scanner.nextDouble(); // Reads a double
        
        System.out.println("\n--- Registration Complete ---");
        System.out.println(name + " (ID: " + id + ") registered with salary $" + salary);
        
        // Step 3: Close the scanner to prevent memory leaks
        scanner.close();
    }
}</code></pre>
      </div>

      <h3>The next() vs nextLine() Trap</h3>
      <p>A very common bug happens when you read a number, then try to read a string using <code>nextLine()</code>.</p>
      <div class="mistake-box">
        <p><strong>The Problem:</strong> When you type "101" and press Enter, you are sending <code>"101\n"</code> (where \n is the enter key). <code>nextInt()</code> reads "101" but leaves the <code>\n</code> in the input buffer. The next time you call <code>nextLine()</code>, it sees the leftover <code>\n</code>, thinks "Oh, the user pressed Enter!", and immediately returns an empty string without letting the user type anything.</p>
        <p><strong>The Fix:</strong> Add an extra <code>scanner.nextLine();</code> after reading numbers to consume the leftover newline.</p>
        <pre><code>int age = scanner.nextInt();
scanner.nextLine(); // Consume the leftover newline
String department = scanner.nextLine(); // Now this works correctly</code></pre>
      </div>

      <h3>Formatted Output with printf</h3>
      <p>Instead of messy string concatenation (<code>"Name: " + name + ", Salary: $" + salary</code>), we can use <code>System.out.printf()</code> to format text.</p>
      <ul>
        <li><code>%s</code> : String</li>
        <li><code>%d</code> : Integer (decimal integer)</li>
        <li><code>%f</code> : Floating point (double) -> <code>%.2f</code> limits to 2 decimal places</li>
        <li><code>%n</code> : New line</li>
      </ul>
      <pre><code>String name = "Alice";
double salary = 4500.1234;
// Prints: Employee Alice has a salary of $4500.12
System.out.printf("Employee %s has a salary of $%.2f%n", name, salary);</code></pre>

      <div class="practice-section">
        <h3>Practice Exercise</h3>
        <p>Write a program that asks for an employee's name, their hourly wage, and hours worked. Calculate their total weekly pay and print a formatted payslip showing exactly 2 decimal places for the money.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>import java.util.Scanner;

public class PayslipGenerator {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        System.out.print("Name: ");
        String name = scan.nextLine();
        
        System.out.print("Hourly wage: ");
        double wage = scan.nextDouble();
        
        System.out.print("Hours worked: ");
        int hours = scan.nextInt();
        
        double totalPay = wage * hours;
        
        System.out.println("=== PAYSLIP ===");
        System.out.printf("Employee: %s%n", name);
        System.out.printf("Total Pay: $%.2f%n", totalPay);
        
        scan.close();
    }
}</code></pre>
          </div>
          <div class="output-box">
=== PAYSLIP ===
Employee: John Doe
Total Pay: $700.00
          </div>
        </details>
      </div>

      <h3>Comparison: Scanner Methods</h3>
      <table class="compare-table">
        <tr><th>Method</th><th>Reads</th><th>Consumes Newline?</th><th>Use Case</th></tr>
        <tr><td><code>next()</code></td><td>Single word (stops at space)</td><td>No</td><td>Reading a single token (e.g., first name)</td></tr>
        <tr><td><code>nextLine()</code></td><td>Entire line of text</td><td>Yes</td><td>Reading full sentences (e.g., full name)</td></tr>
        <tr><td><code>nextInt()</code></td><td>Integer value</td><td>No</td><td>Reading whole numbers (e.g., age, ID)</td></tr>
        <tr><td><code>nextDouble()</code></td><td>Decimal value</td><td>No</td><td>Reading exact numeric amounts (e.g., salary)</td></tr>
      </table>

      <div class="execution-trace">
        <h4>Execution Trace: Scanner Newline Trap</h4>
        <ol>
          <li>User types <code>42</code> and hits Enter. Buffer: <code>"42
"</code></li>
          <li><code>nextInt()</code> reads <code>42</code>. Buffer: <code>"
"</code></li>
          <li><code>nextLine()</code> is called. It immediately sees <code>"
"</code> and returns an empty string without waiting for user input.</li>
        </ol>
      </div>

      <div class="callout">
        <strong>Tip:</strong> Always close your <code>Scanner</code> with <code>scanner.close()</code> to free up OS resources when you're done taking input.
      </div>

      <h3>Real-World Application</h3>
      <p>Formatted output using <code>printf</code> is used to generate structured console reports, like daily transaction logs or tabular data for administrators debugging an issue in a terminal.</p>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What causes the Scanner newline trap, and how do you fix it?</summary>
        <p>It occurs when a method like <code>nextInt()</code> leaves the Enter key's newline character (<code>\n</code>) in the input buffer, and a subsequent <code>nextLine()</code> immediately consumes it. Fix it by adding a standalone <code>scanner.nextLine()</code> after reading numbers.</p>
      </details>
      <details>
        <summary>Q: What is the purpose of the <code>java.util.Scanner</code> class?</summary>
        <p>It is used to parse primitive types and strings using regular expressions, commonly used to read input from the console (<code>System.in</code>).</p>
      </details>
      <details>
        <summary>Q: How would you format a double variable to display exactly two decimal places?</summary>
        <p>You can use <code>System.out.printf("%.2f", variable);</code> to format the number to two decimal places.</p>
      </details>
    `
  },
  {
    id: 'conditions-loops',
    phase: 1,
    title: 'Conditions and Loops',
    icon: '🔀',
    level: 'Intermediate',
    minutes: 40,
    description: 'Control the flow of your program making decisions and repeating code.',
    objectives: [
      'Write if/else and else-if statements for conditional logic.',
      'Use switch statements to handle multiple specific cases.',
      'Implement for, while, and do-while loops.',
      'Control loop flow using break and continue.'
    ],
    content: `
      <h2>Control Flow</h2>
      <p>Programs execute top-to-bottom by default. But business rules are rarely that simple. "IF the employee is a manager, grant dashboard access." "WHILE there are unread emails, process them." Control flow statements let us skip code or repeat code based on conditions.</p>

      <h3>Conditional Statements: if, else if, else</h3>
      <p>The <code>if</code> statement evaluates a boolean expression. If true, the block executes.</p>
      <div class="code-block">
        <pre><code>double salary = 85000;
String grade = "";

if (salary >= 100000) {
    grade = "Executive";
} else if (salary >= 70000) {
    grade = "Senior";
} else if (salary >= 40000) {
    grade = "Mid-Level";
} else {
    grade = "Junior";
}
System.out.println("Employee Level: " + grade);</code></pre>
      </div>

      <h3>Switch Statements</h3>
      <p>When you are checking a single variable against many specific, exact values (like a menu choice or a department code), a <code>switch</code> is cleaner than many <code>else if</code>s.</p>
      <div class="code-block">
        <pre><code>char deptCode = 'H';
switch (deptCode) {
    case 'H':
        System.out.println("Human Resources");
        break; // Crucial! Without break, it "falls through" to the next case
    case 'I':
        System.out.println("Information Technology");
        break;
    case 'S':
        System.out.println("Sales");
        break;
    default:
        System.out.println("Unknown Department");
}</code></pre>
      </div>

      <h3>Loops: Repeating Code</h3>
      <p>Loops allow you to run the same block of code multiple times.</p>
      
      <h4>1. The 'while' Loop</h4>
      <p>Use when you don't know exactly how many times the loop will run in advance. It runs <em>as long as</em> the condition is true.</p>
      <pre><code>int unreadMessages = 3;
while (unreadMessages > 0) {
    System.out.println("Processing message...");
    unreadMessages--; // Decrement, or you get an infinite loop!
}</code></pre>

      <h4>2. The 'do-while' Loop</h4>
      <p>Similar to <code>while</code>, but the condition is checked at the <em>end</em>. This guarantees the loop runs <strong>at least once</strong>.</p>
      <pre><code>Scanner sc = new Scanner(System.in);
int option;
do {
    System.out.println("1. Add Employee | 0. Exit");
    option = sc.nextInt();
} while (option != 0);</code></pre>

      <h4>3. The 'for' Loop</h4>
      <p>Use when you know exactly how many times you want to iterate. It packs initialization, condition, and update into one line.</p>
      <div class="code-block">
        <pre><code>// Print 5 ID badges
for (int i = 1; i <= 5; i++) {
    System.out.println("Printing badge for Employee #" + i);
}</code></pre>
      </div>

      <h3>Break and Continue</h3>
      <ul>
        <li><code>break;</code> immediately exits the entire loop.</li>
        <li><code>continue;</code> skips the rest of the <em>current iteration</em> and jumps to the next loop cycle.</li>
      </ul>
      <pre><code>for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue; // Skips employee 3
    }
    System.out.println("Processing ID: " + i);
} // Output: 1, 2, 4, 5</code></pre>

      <div class="practice-section">
        <h3>Practice Exercise</h3>
        <p>Write a program that uses a <code>while</code> loop to print all even numbers between 1 and 20.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public class EvenNumbers {
    public static void main(String[] args) {
        int i = 1;
        while (i <= 20) {
            if (i % 2 == 0) {
                System.out.println(i);
            }
            i++;
        }
    }
}</code></pre>
          </div>
          <div class="output-box">
2
4
6
...
20
          </div>
        </details>
      </div>

      <h3>Comparison: Loop Types</h3>
      <table class="compare-table">
        <tr><th>Loop Type</th><th>When to Use</th><th>Condition Check</th><th>Minimum Iterations</th></tr>
        <tr><td><strong>for</strong></td><td>When you know the exact number of iterations in advance.</td><td>Start of loop</td><td>0</td></tr>
        <tr><td><strong>while</strong></td><td>When iterations depend on a condition that might change dynamically.</td><td>Start of loop</td><td>0</td></tr>
        <tr><td><strong>do-while</strong></td><td>When you need the loop block to execute at least once (e.g., menus).</td><td>End of loop</td><td>1</td></tr>
      </table>

      <div class="execution-trace">
        <h4>Execution Trace: For Loop</h4>
        <ol>
          <li><code>int i = 1;</code> - Initialization (runs once).</li>
          <li><code>i <= 5;</code> - Condition checked. If true, execute the loop body.</li>
          <li><code>System.out.println(...)</code> - Loop body executes.</li>
          <li><code>i++</code> - Update expression increments <code>i</code>. Repeat from step 2 until condition is false.</li>
        </ol>
      </div>

      <div class="callout">
        <strong>Warning:</strong> Always ensure your <code>while</code> loops have an update statement (like <code>i++</code>) inside the body. Otherwise, you will create an infinite loop that crashes your program!
      </div>

      <h3>Real-World Application</h3>
      <p>Loops and conditions are the backbone of automated processing. For instance, a payroll system uses a <code>for</code> loop to iterate through thousands of employees, applying <code>if/else</code> statements to calculate distinct tax deductions based on varying salary brackets.</p>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What is the difference between <code>while</code> and <code>do-while</code> loops?</summary>
        <p>A <code>while</code> loop checks the condition before executing the block, so it might not run at all. A <code>do-while</code> loop checks the condition after executing the block, guaranteeing it runs at least once.</p>
      </details>
      <details>
        <summary>Q: What does the <code>break</code> statement do?</summary>
        <p>The <code>break</code> statement immediately terminates the loop or switch statement it is inside, and control flows to the statement immediately following the loop/switch.</p>
      </details>
      <details>
        <summary>Q: Can a <code>switch</code> statement be used with Strings in Java?</summary>
        <p>Yes, starting from Java 7, <code>switch</code> statements support <code>String</code> objects alongside primitives like <code>int</code> and <code>char</code>.</p>
      </details>
    `
  },
  {
    id: 'arrays-methods',
    phase: 1,
    title: 'Arrays and Methods',
    icon: '📚',
    level: 'Intermediate',
    minutes: 40,
    description: 'Group data into arrays and organize code into reusable methods.',
    objectives: [
      'Create, initialize, and traverse arrays.',
      'Avoid ArrayIndexOutOfBoundsException.',
      'Define methods with parameters and return types.',
      'Understand method overloading and pass-by-value semantics.'
    ],
    content: `
      <h2>Working with Collections and Reusable Code</h2>

      <h3>Arrays</h3>
      <p>Variables hold a single value. But what if a manager needs to store the performance ratings of 10 team members? Creating <code>rating1</code>, <code>rating2</code>... <code>rating10</code> is terrible. <strong>Arrays</strong> solve this.</p>
      <p>An array is a fixed-size container that holds multiple values of the <em>same data type</em>.</p>

      <h4>Creating and Accessing Arrays</h4>
      <p>Arrays are zero-indexed. The first element is at index 0.</p>
      <div class="code-block">
        <pre><code>// 1. Declare and instantiate (size 5)
int[] ratings = new int[5]; // Elements default to 0

// 2. Assign values via index
ratings[0] = 8;
ratings[1] = 9;
ratings[4] = 7; // Last element is at size - 1

// Shortcut: Create and initialize in one step
String[] departments = {"IT", "HR", "Sales", "Marketing"};

System.out.println("First department is: " + departments[0]); // "IT"</code></pre>
      </div>

      <div class="mistake-box">
        <p><strong>Mistake:</strong> Accessing an invalid index.</p>
        <pre><code>int[] scores = new int[3]; // valid indices: 0, 1, 2
scores[3] = 95; // ERROR!</code></pre>
        <p><strong>Error:</strong> <code>java.lang.ArrayIndexOutOfBoundsException</code></p>
      </div>

      <h4>Looping through Arrays</h4>
      <p>The Enhanced For-Loop (or "for-each" loop) is the cleanest way to read all elements in an array.</p>
      <pre><code>double[] salaries = {45000, 55000, 60000};
for (double salary : salaries) {
    System.out.println("Salary: $" + salary);
}</code></pre>

      <h3>Methods</h3>
      <p>A method is a named block of code designed to perform a specific task. Methods prevent code duplication and make your programs modular.</p>

      <h4>Method Syntax</h4>
      <div class="code-block">
        <pre><code>public class TaxCalculator {
    
    // Method Definition
    // public static [Return_Type] [Method_Name]([Parameters...])
    public static double calculateTax(double salary) {
        double taxRate = 0.20;
        return salary * taxRate; // Ends method and sends value back
    }

    public static void main(String[] args) {
        // Method Call
        double myTax = calculateTax(50000); 
        System.out.println("Tax to pay: $" + myTax); // $10000.0
    }
}</code></pre>
      </div>

      <h4>Method Overloading</h4>
      <p>Java allows you to have multiple methods with the <strong>same name</strong>, as long as their parameter lists are different (different types or different number of parameters).</p>
      <pre><code>public static void printDetails(String name) { ... }
public static void printDetails(String name, int age) { ... } // Valid overload</code></pre>

      <h3>Pass-by-Value</h3>
      <p>When you pass primitive variables to a method, Java passes a <strong>copy</strong> of the value. Changes inside the method do not affect the original variable.</p>

      <div class="practice-section">
        <h3>Practice Exercise</h3>
        <p>Write a method called <code>findHighestSalary</code> that takes an array of <code>double</code> values and returns the highest value. Test it in main.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>public class ArrayUtils {
    public static double findHighestSalary(double[] salaries) {
        if (salaries.length == 0) return 0;
        
        double max = salaries[0];
        for (double salary : salaries) {
            if (salary > max) {
                max = salary;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        double[] companySalaries = {45000.5, 82000.0, 31000.0, 95000.0};
        double highest = findHighestSalary(companySalaries);
        System.out.println("Highest Salary: $" + highest);
    }
}</code></pre>
          </div>
          <div class="output-box">
Highest Salary: $95000.0
          </div>
        </details>
      </div>

      <h3>Comparison: Array vs Concept of ArrayList (Preview)</h3>
      <table class="compare-table">
        <tr><th>Feature</th><th>Array</th><th>ArrayList (Next Phase)</th></tr>
        <tr><td><strong>Size</strong></td><td>Fixed upon creation</td><td>Dynamic (can grow/shrink)</td></tr>
        <tr><td><strong>Data Types</strong></td><td>Can hold primitives and objects</td><td>Can only hold objects (Wrapper classes)</td></tr>
        <tr><td><strong>Syntax</strong></td><td><code>arr[0] = 5;</code></td><td><code>list.add(5);</code></td></tr>
      </table>

      <div class="execution-trace">
        <h4>Execution Trace: Method Call</h4>
        <ol>
          <li><code>main</code> calls <code>findHighestSalary(companySalaries)</code>.</li>
          <li>A reference to the <code>companySalaries</code> array is passed to the method.</li>
          <li>The method executes, finds the maximum value (95000.0), and <code>return</code>s it.</li>
          <li>Execution resumes in <code>main</code>, storing the returned value in the <code>highest</code> variable.</li>
        </ol>
      </div>

      <div class="callout">
        <strong>Tip:</strong> Always check if an array is empty (e.g., <code>arr.length == 0</code>) before trying to access <code>arr[0]</code> to avoid exceptions.
      </div>

      <h3>Real-World Application</h3>
      <p>Arrays are used when we have a fixed dataset, such as processing the 12 months of a financial year. Methods allow us to package complex business logic (like tax calculation algorithms) into reusable blocks, keeping our codebase clean and maintainable.</p>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What causes an <code>ArrayIndexOutOfBoundsException</code>?</summary>
        <p>This occurs when you try to access an index that is negative or greater than/equal to the size of the array (e.g., accessing <code>arr[5]</code> on an array of size 5).</p>
      </details>
      <details>
        <summary>Q: What is Method Overloading?</summary>
        <p>Method overloading is when a class has multiple methods with the same name but different parameters (different type or number of parameters).</p>
      </details>
      <details>
        <summary>Q: Is Java Pass-by-Value or Pass-by-Reference?</summary>
        <p>Java is strictly Pass-by-Value. When passing primitive types, the actual value is copied. When passing objects or arrays, the value of the reference (memory address) is copied.</p>
      </details>
    `
  },
  {
    id: 'classes-objects',
    phase: 1,
    title: 'Classes and Objects',
    icon: '🏗️',
    level: 'Intermediate',
    minutes: 45,
    description: 'Welcome to Object-Oriented Programming: build blueprints and create dynamic objects.',
    objectives: [
      'Understand the difference between a class and an object.',
      'Define instance variables and instance methods.',
      'Use the "new" keyword to instantiate objects.',
      'Understand the "this" keyword and object references.'
    ],
    content: `
      <h2>The Paradigm Shift: Object-Oriented Programming (OOP)</h2>
      <p>So far, we've written procedural code. But Java is fundamentally an <strong>Object-Oriented</strong> language. OOP lets us model real-world entities in our code.</p>

      <h3>Class vs. Object</h3>
      <ul>
        <li><strong>Class</strong>: The blueprint or template. It defines the structure (what data it holds) and behaviors (what it can do). Example: <em>The concept of an Employee.</em></li>
        <li><strong>Object</strong>: A specific, physical instance built from that blueprint. Example: <em>John Doe, HR Dept, ID 104.</em></li>
      </ul>

      <h3>Defining a Class</h3>
      <p>Let's create an <code>Employee</code> class. Notice this class does NOT have a <code>main</code> method. It's just a blueprint.</p>
      
      <div class="code-block">
        <div class="code-header"><span>Employee.java</span></div>
        <pre><code>public class Employee {
    // 1. Fields (State / Instance Variables)
    int id;
    String name;
    double salary;
    
    // 2. Methods (Behavior)
    // Notice no 'static' keyword. These belong to the specific object.
    public void displayDetails() {
        System.out.println("ID: " + id + " | Name: " + name + " | Salary: $" + salary);
    }
    
    public void giveRaise(double amount) {
        salary += amount; // Increases this specific object's salary
    }
}</code></pre>
      </div>

      <h3>Instantiating Objects with 'new'</h3>
      <p>To actually use the blueprint, we need a "Runner" class with a <code>main</code> method to create objects using the <code>new</code> keyword.</p>

      <div class="code-block">
        <div class="code-header"><span>CompanyRunner.java</span></div>
        <pre><code>public class CompanyRunner {
    public static void main(String[] args) {
        // Create an Object. 'emp1' is a reference variable.
        Employee emp1 = new Employee();
        
        // Assign state using the dot (.) operator
        emp1.id = 101;
        emp1.name = "Alice Smith";
        emp1.salary = 60000;
        
        // Create a SECOND distinct object
        Employee emp2 = new Employee();
        emp2.id = 102;
        emp2.name = "Bob Jones";
        emp2.salary = 55000;
        
        // Trigger behaviors
        emp1.giveRaise(5000);
        
        emp1.displayDetails(); // Shows Alice's data ($65000)
        emp2.displayDetails(); // Shows Bob's data ($55000)
    }
}</code></pre>
      </div>

      <h3>Memory: References vs Objects</h3>
      <p>When you write <code>Employee emp1 = new Employee();</code>:</p>
      <ul>
        <li><code>new Employee()</code> creates the actual object data block in a part of memory called the <strong>Heap</strong>.</li>
        <li><code>Employee emp1</code> is just a variable (reference) that stores the <strong>memory address</strong> pointing to that data block.</li>
      </ul>

      <h3>The 'this' Keyword</h3>
      <p>Inside an instance method, <code>this</code> is a reference to the <em>current object</em> calling the method. It's often used to distinguish between instance variables and local parameters with the same name.</p>
      <pre><code>public class Employee {
    String name;
    
    public void setName(String name) {
        // 'this.name' means the instance variable.
        // 'name' means the parameter passed in.
        this.name = name; 
    }
}</code></pre>

      <div class="practice-section">
        <h3>Practice Exercise</h3>
        <p>Create a class called <code>Department</code> with fields <code>deptName</code> and <code>budget</code>. Add a method <code>spend(double amount)</code> that subtracts from the budget. In a main method, create a Department, spend some money, and print the remaining budget.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>class Department {
    String deptName;
    double budget;
    
    public void spend(double amount) {
        budget -= amount;
    }
}

public class MainApp {
    public static void main(String[] args) {
        Department itDept = new Department();
        itDept.deptName = "IT Infrastructure";
        itDept.budget = 100000;
        
        itDept.spend(15000);
        System.out.println(itDept.deptName + " budget: $" + itDept.budget); // $85000.0
    }
}</code></pre>
          </div>
          <div class="output-box">
IT Infrastructure budget: $85000.0
          </div>
        </details>
      </div>

      <h3>Real-World Application</h3>
      <p>Object-Oriented Programming models actual business entities. In an HR system, an <code>Employee</code> class represents the blueprint, and every time a new hire is onboarded, a new <code>Employee</code> object is instantiated in memory with their unique state (name, salary, department).</p>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What is the difference between a class and an object?</summary>
        <p>A class is a logical blueprint or template that defines properties and behaviors. An object is a physical instance of that class allocated in memory.</p>
      </details>
      <details>
        <summary>Q: What does the <code>new</code> keyword do in Java?</summary>
        <p>The <code>new</code> keyword dynamically allocates memory on the Heap for a new object and returns a reference to that memory location.</p>
      </details>
      <details>
        <summary>Q: What is the purpose of the <code>this</code> keyword?</summary>
        <p>The <code>this</code> keyword is a reference to the current object whose method or constructor is being invoked. It is commonly used to distinguish between instance variables and local parameters with the same name.</p>
      </details>
    `
  }
];
