window.JAVAPATH_PHASE2_TOPICS = [
  {
    id: 'constructors',
    phase: 2,
    title: 'Constructors and Chaining',
    icon: '🏗️',
    level: 'Beginner',
    minutes: 25,
    description: 'Learn how to initialize objects, overload constructors, and chain them effectively.',
    objectives: [
      'Understand the role and syntax of constructors.',
      'Differentiate between default, no-arg, and parameterized constructors.',
      'Overload constructors for flexible object creation.',
      'Use this() for constructor chaining.',
      'Implement copy constructors and validation in constructors.'
    ],
    content: `
      <h2>The Problem: Uninitialized Objects</h2>
      <p>Imagine creating a new employee in an HR system. If you just create the object without setting its name, ID, and salary, you end up with an employee that has invalid data (null or 0). You would have to manually call setters for every single field immediately after creation. This is error-prone and tedious. Constructors solve this problem by ensuring an object is fully initialized the moment it is created.</p>

      <h2>What are Constructors?</h2>
      <p>A constructor is a special block of code that runs when you use the <code>new</code> keyword to create an object. Its primary job is to initialize the newly created object's state.</p>
      <div class="callout">
        <strong>Constructors vs Methods:</strong>
        <ul>
          <li>Constructors MUST have the exact same name as the class.</li>
          <li>Constructors DO NOT have a return type (not even <code>void</code>).</li>
          <li>Constructors cannot be called directly; they are invoked only via the <code>new</code> keyword.</li>
        </ul>
      </div>

      <h3>The Default Constructor</h3>
      <p>If you don't write any constructor in your class, the Java compiler automatically provides a hidden one called the <strong>default constructor</strong>. It takes no arguments and has an empty body.</p>

      <h3>No-Arg and Parameterized Constructors</h3>
      <p>You can define a constructor that takes no arguments (no-arg constructor) to set default values, or one that takes arguments (parameterized constructor) to set specific values during creation.</p>

      <div class="code-block">
        <div class="code-header"><span>Employee.java</span></div>
        <pre><code>public class Employee {
    private String name;
    private int id;
    private double salary;

    // No-arg constructor
    public Employee() {
        this.name = "Unknown";
        this.id = -1;
        this.salary = 0.0;
    }

    // Parameterized constructor
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
}</code></pre>
      </div>

      <h2>Constructor Overloading</h2>
      <p>Just like methods, you can have multiple constructors in the same class, as long as their parameter lists are different (different number, types, or order of parameters). This is called constructor overloading.</p>

      <h2>Constructor Chaining using <code>this()</code></h2>
      <p>When you have multiple constructors, they often share initialization logic. To avoid code duplication, one constructor can call another using <code>this()</code>.</p>
      <div class="callout">
        <strong>Rules for <code>this()</code>:</strong>
        <ul>
          <li>The <code>this()</code> call MUST be the very first statement in the constructor.</li>
          <li>You cannot call two other constructors from one constructor.</li>
          <li>Recursive constructor calls (A calls B, B calls A) will cause a compiler error.</li>
        </ul>
      </div>

      <div class="code-block">
        <div class="code-header"><span>Employee.java</span></div>
        <pre><code>public class Employee {
    private String name;
    private String department;
    private double salary;

    // Primary constructor with validation
    public Employee(String name, String department, double salary) {
        if (salary &lt; 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    // Overloaded constructor chaining to the primary one
    public Employee(String name) {
        // Calls the constructor above
        this(name, "Unassigned", 50000.0);
    }
}</code></pre>
      </div>

      <h2>The Copy Constructor Pattern</h2>
      <p>A copy constructor takes another instance of the same class and copies its values. This is useful for duplicating objects without modifying the original.</p>
      <div class="code-block">
        <div class="code-header"><span>Employee.java</span></div>
        <pre><code>public Employee(Employee other) {
    this.name = other.name;
    this.department = other.department;
    this.salary = other.salary;
}</code></pre>
      </div>

      <h2>Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake 1: Adding a return type to a constructor</h4>
        <code>public void Employee() { ... } // This is now a method, NOT a constructor!</code>
        <p><strong>Fix:</strong> Remove the <code>void</code>. <code>public Employee() { ... }</code></p>
      </div>
      <div class="mistake-box">
        <h4>Mistake 2: Forgetting that a custom constructor removes the default constructor</h4>
        <p>If you define <code>public Employee(String name)</code>, you can no longer do <code>new Employee()</code> unless you explicitly define a no-arg constructor.</p>
      </div>

      <h2>Practice Section</h2>
      <div class="practice-section">
        <p><strong>Q1:</strong> Create a <code>Project</code> class with a name, budget, and deadline. Provide a constructor that initializes all three, and another that takes only the name and chains to the main constructor using a default budget of 10000 and deadline of "TBD".</p>
        <details>
          <summary>Show Solution</summary>
          <pre><code>public class Project {
    private String name;
    private double budget;
    private String deadline;

    public Project(String name, double budget, String deadline) {
        this.name = name;
        this.budget = budget;
        this.deadline = deadline;
    }

    public Project(String name) {
        this(name, 10000.0, "TBD");
    }
}</code></pre>
        </details>
      </div>
    `
  },
  {
    id: 'static-members',
    phase: 2,
    title: 'Static Members and Initialization',
    icon: '⚡',
    level: 'Intermediate',
    minutes: 30,
    description: 'Learn how to share data across instances and manage class-level state.',
    objectives: [
      'Understand the difference between instance and static members.',
      'Use static fields to share data across all objects of a class.',
      'Create and use static methods appropriately.',
      'Explain static initialization blocks.',
      'Understand why static methods cannot access instance members.'
    ],
    content: `
      <h2>The Problem: Redundant Data</h2>
      <p>Imagine your company has 10,000 employees. If you store the <code>companyName</code> ("MouriTech") as a regular instance variable in every <code>Employee</code> object, you are wasting memory storing the exact same string 10,000 times. Even worse, if the company changes its name, you have to update 10,000 objects. We need a way to store data at the <em>class level</em>, shared by all instances.</p>

      <h2>The <code>static</code> Keyword</h2>
      <p>When you declare a variable or method as <code>static</code>, it belongs to the class itself, rather than to any specific instance of the class.</p>

      <h3>Static Fields (Class Variables)</h3>
      <p>A static field is shared across all instances. There is only one copy of it in memory, regardless of how many objects you create (even if you create zero objects!).</p>
      
      <div class="code-block">
        <div class="code-header"><span>Employee.java</span></div>
        <pre><code>public class Employee {
    // Instance variables (unique to each object)
    private String name;
    
    // Static variable (shared by all objects)
    public static String companyName = "MouriTech";
    
    // Static counter to track total employees
    public static int totalEmployees = 0;

    public Employee(String name) {
        this.name = name;
        totalEmployees++; // Increment the shared counter
    }
}</code></pre>
      </div>

      <h3>Static Methods</h3>
      <p>Static methods can be called without creating an instance of the class. You call them using the class name, like <code>Employee.getTotalEmployees()</code>.</p>
      
      <div class="callout">
        <strong>The Golden Rule of Static:</strong>
        <p>A static method CANNOT access non-static (instance) variables or methods directly, and it CANNOT use the <code>this</code> keyword. Why? Because the static method might be called before any objects even exist!</p>
      </div>

      <h3>Static Initialization Blocks</h3>
      <p>Sometimes initializing a static variable requires complex logic (like reading from a file or database). You can use a static block, which runs exactly once when the class is loaded into memory by the JVM.</p>

      <div class="code-block">
        <div class="code-header"><span>Config.java</span></div>
        <pre><code>public class Config {
    public static String dbUrl;
    
    static {
        // This block runs once when Config class is loaded
        System.out.println("Initializing static data...");
        dbUrl = "jdbc:mysql://localhost:3306/db";
    }
}</code></pre>
      </div>

      <h2>Static Final Constants</h2>
      <p>It is very common to combine <code>static</code> and <code>final</code> to create constants. Constants are typically named in ALL_CAPS.</p>
      <pre><code>public static final double MAX_SALARY = 1000000.0;</code></pre>

      <h2>When to use Static vs Instance</h2>
      <table class="compare-table">
        <tr>
          <th>Concept</th>
          <th>Instance (Non-Static)</th>
          <th>Class (Static)</th>
        </tr>
        <tr>
          <td><strong>Meaning</strong></td>
          <td>Belongs to the specific object</td>
          <td>Belongs to the class itself</td>
        </tr>
        <tr>
          <td><strong>Usage</strong></td>
          <td>Data that is unique per object (e.g., employee name, salary)</td>
          <td>Data shared by all objects (e.g., company name, counters)</td>
        </tr>
        <tr>
          <td><strong>Memory</strong></td>
          <td>Allocated per object</td>
          <td>Allocated once when class is loaded</td>
        </tr>
      </table>

      <h2>Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake: Accessing instance variable from static method</h4>
        <code>public static void printName() { System.out.println(this.name); } // ERROR</code>
        <p><strong>Fix:</strong> Pass the object as a parameter, or make the method non-static.</p>
      </div>
    `
  },
  {
    id: 'encapsulation',
    phase: 2,
    title: 'Encapsulation and Access Modifiers',
    icon: '🛡️',
    level: 'Beginner',
    minutes: 30,
    description: 'Protect object state and build robust classes through data hiding.',
    objectives: [
      'Understand the concept of Encapsulation.',
      'Use private fields and public getters/setters.',
      'Implement data validation in setters.',
      'Differentiate between public, protected, default, and private access modifiers.'
    ],
    content: `
      <h2>The Problem: Unrestricted Access</h2>
      <p>If you make an Employee's salary <code>public</code>, anyone can change it to a negative number or zero, breaking your system's rules.</p>
      <pre><code>Employee emp = new Employee();
emp.salary = -50000; // Invalid, but allowed because salary is public!</code></pre>

      <h2>Encapsulation: Data Hiding</h2>
      <p>Encapsulation is the mechanism of wrapping the data (variables) and code acting on the data (methods) together as a single unit. In encapsulation, the variables of a class will be hidden from other classes, and can be accessed only through the methods of their current class. Therefore, it is also known as <strong>data hiding</strong>.</p>
      
      <p>To achieve encapsulation:</p>
      <ol>
        <li>Declare the variables of a class as <code>private</code>.</li>
        <li>Provide <code>public</code> setter and getter methods to modify and view the variables values.</li>
      </ol>

      <div class="code-block">
        <div class="code-header"><span>Employee.java</span></div>
        <pre><code>public class Employee {
    // 1. Private fields
    private String name;
    private double salary;

    // 2. Public Getter
    public double getSalary() {
        return salary;
    }

    // 3. Public Setter with Validation
    public void setSalary(double salary) {
        if (salary &lt; 0) {
            throw new IllegalArgumentException("Salary cannot be negative!");
        }
        this.salary = salary;
    }
}</code></pre>
      </div>

      <h2>Access Modifiers in Java</h2>
      <p>Java provides four access modifiers to control visibility:</p>
      <table class="compare-table">
        <tr>
          <th>Modifier</th>
          <th>Same Class</th>
          <th>Same Package</th>
          <th>Subclass (Diff Pkg)</th>
          <th>Everywhere Else</th>
        </tr>
        <tr>
          <td><code>public</code></td>
          <td>✅ Yes</td>
          <td>✅ Yes</td>
          <td>✅ Yes</td>
          <td>✅ Yes</td>
        </tr>
        <tr>
          <td><code>protected</code></td>
          <td>✅ Yes</td>
          <td>✅ Yes</td>
          <td>✅ Yes</td>
          <td>❌ No</td>
        </tr>
        <tr>
          <td><em>default (no keyword)</em></td>
          <td>✅ Yes</td>
          <td>✅ Yes</td>
          <td>❌ No</td>
          <td>❌ No</td>
        </tr>
        <tr>
          <td><code>private</code></td>
          <td>✅ Yes</td>
          <td>❌ No</td>
          <td>❌ No</td>
          <td>❌ No</td>
        </tr>
      </table>

      <h2>Read-Only and Immutable Objects</h2>
      <p>By providing only getters and no setters (and marking fields as <code>final</code>), you can create immutable objects. Once created via the constructor, their state cannot change, making them incredibly safe to use in multi-threaded environments.</p>

      <h2>Practice Section</h2>
      <div class="practice-section">
        <p><strong>Q1:</strong> Create a <code>BankAccount</code> class with a private <code>balance</code>. Provide a method to deposit money (amount must be positive) and withdraw money (amount must be positive and less than or equal to balance).</p>
      </div>
    `
  },
  {
    id: 'inheritance',
    phase: 2,
    title: 'Inheritance Deep Dive',
    icon: '🧬',
    level: 'Intermediate',
    minutes: 60,
    description: 'Master code reuse, class hierarchies, and constructor chaining in inheritance.',
    objectives: [
      'Understand the extends keyword and the IS-A relationship.',
      'Explain what is inherited and what is not.',
      'Master the super keyword and constructor execution order.',
      'Perform method overriding.',
      'Differentiate Inheritance from Composition.'
    ],
    content: `
      <h2>The Problem: Code Duplication</h2>
      <p>Imagine you are building an HR system. First, you create a <code>Person</code> class.</p>
      <div class="code-block">
        <div class="code-header"><span>Step 1: Person.java</span></div>
        <pre><code>public class Person {
    private String name;
    private int age;
    
    public void sleep() { System.out.println("Sleeping..."); }
    // getters, setters...
}</code></pre>
      </div>

      <p>Now, you need an <code>Employee</code> class. An Employee IS A Person, but also has a salary and an employee ID. Without inheritance, you would duplicate code:</p>
      <div class="code-block">
        <div class="code-header"><span>Step 2: Employee.java (The Bad Way)</span></div>
        <pre><code>public class Employee {
    // DUPLICATED FROM PERSON!
    private String name;
    private int age;
    public void sleep() { System.out.println("Sleeping..."); }
    
    // New fields
    private double salary;
    private String employeeId;
}</code></pre>
      </div>
      <p>If you add an <code>eat()</code> method to Person, you have to remember to add it to Employee too. This is a maintenance nightmare.</p>

      <h2>Inheritance to the Rescue</h2>
      <p>Inheritance establishes an <strong>IS-A</strong> relationship. By using the <code>extends</code> keyword, the <code>Employee</code> class (subclass/child) inherits all accessible members (fields and methods) from the <code>Person</code> class (superclass/parent).</p>

      <div class="code-block">
        <div class="code-header"><span>Step 3: Employee.java (The Good Way)</span></div>
        <pre><code>public class Employee extends Person {
    private double salary;
    private String employeeId;
    
    public void work() {
        System.out.println(getName() + " is working.");
    }
}</code></pre>
      </div>

      <h3>What is Inherited?</h3>
      <ul>
        <li><code>public</code> and <code>protected</code> fields and methods are inherited.</li>
        <li>Package-private (default) members are inherited ONLY if the subclass is in the same package.</li>
        <li><code>private</code> members are <strong>NOT</strong> inherited directly. The subclass objects contain the private fields of the superclass, but subclass code cannot access them directly; it must use inherited public/protected getters/setters.</li>
        <li><strong>Constructors are NOT inherited!</strong></li>
      </ul>

      <h2>Constructors and the <code>super()</code> Keyword</h2>
      <p>Because constructors are not inherited, how does the <code>Person</code> part of the <code>Employee</code> get initialized? The subclass constructor MUST call the superclass constructor using the <code>super()</code> keyword.</p>
      
      <div class="callout">
        <strong>The Constructor Chain Rule:</strong>
        <p>The very first line of any constructor must be either a call to <code>this()</code> or a call to <code>super()</code>. If you do not write it, the compiler automatically inserts <code>super();</code> (a call to the parent's no-arg constructor).</p>
      </div>

      <div class="code-block">
        <div class="code-header"><span>Step 4: Constructors in Inheritance</span></div>
        <pre><code>public class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
        System.out.println("Person constructor called");
    }
}

public class Employee extends Person {
    private double salary;
    
    public Employee(String name, double salary) {
        super(name); // MUST BE FIRST LINE! Calls Person(String name)
        this.salary = salary;
        System.out.println("Employee constructor called");
    }
}</code></pre>
      </div>

      <div class="execution-trace">
        <h4>Execution Trace: <code>new Employee("Ravi", 50000)</code></h4>
        <ol>
          <li><code>Employee</code> constructor is invoked.</li>
          <li>First line is <code>super("Ravi")</code>, so JVM jumps to <code>Person</code> constructor.</li>
          <li><code>Person</code> constructor executes (implicitly calls <code>super()</code> to Object, sets name, prints message).</li>
          <li>JVM returns to <code>Employee</code> constructor.</li>
          <li><code>Employee</code> constructor resumes, sets salary, prints message.</li>
        </ol>
      </div>

      <h2>Method Overriding</h2>
      <p>Sometimes a subclass needs to change the behavior of an inherited method. This is called overriding. You should always use the <code>@Override</code> annotation to let the compiler check that you are actually overriding a method correctly.</p>

      <div class="code-block">
        <div class="code-header"><span>Step 5: Overriding Methods</span></div>
        <pre><code>public class Manager extends Employee {
    public Manager(String name, double salary) {
        super(name, salary);
    }
    
    @Override
    public void work() {
        System.out.println(getName() + " is holding a meeting.");
    }
}</code></pre>
      </div>

      <h2>The <code>super</code> Keyword for Member Access</h2>
      <p>If you override a method but still want to call the parent's version, you use <code>super.methodName()</code>.</p>
      <pre><code>@Override
public void work() {
    super.work(); // Calls Employee's work method
    System.out.println("And also reviewing reports.");
}</code></pre>

      <h2>Types of Inheritance</h2>
      <ul>
        <li><strong>Single Inheritance:</strong> A class extends one class. (Java supports this).</li>
        <li><strong>Multilevel Inheritance:</strong> Class C extends Class B, which extends Class A. (Java supports this).</li>
        <li><strong>Hierarchical Inheritance:</strong> Multiple classes extend the same parent class. (Java supports this).</li>
        <li><strong>Multiple Class Inheritance:</strong> A class extending multiple classes (e.g., <code>class C extends A, B</code>). <strong>Java DOES NOT support this</strong> to prevent the "Diamond Problem" (ambiguity if both parents have the same method).</li>
      </ul>

      <h2>The <code>Object</code> Superclass</h2>
      <p>Every class in Java implicitly extends <code>java.lang.Object</code>. It provides methods like <code>toString()</code>, <code>equals()</code>, and <code>hashCode()</code> that you often override.</p>

      <h2>Inheritance vs Composition</h2>
      <p>Just because you <em>can</em> inherit, doesn't mean you <em>should</em>. Favor composition over inheritance if the relationship is "HAS-A" rather than "IS-A".</p>
      <table class="compare-table">
        <tr>
          <th>Inheritance (IS-A)</th>
          <th>Composition (HAS-A)</th>
        </tr>
        <tr>
          <td>Manager IS AN Employee</td>
          <td>Employee HAS A BankAccount</td>
        </tr>
        <tr>
          <td>Tightly coupled</td>
          <td>Loosely coupled</td>
        </tr>
        <tr>
          <td>Cannot change at runtime</td>
          <td>Can swap objects at runtime</td>
        </tr>
      </table>

      <h2>Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake 1: Forgetting super() with missing default constructor</h4>
        <p>If parent has a parameterized constructor but no default constructor, the child constructor will fail to compile unless you explicitly call <code>super(...)</code>.</p>
      </div>
      <div class="mistake-box">
        <h4>Mistake 2: Placing super() anywhere except the first line</h4>
        <code>public Child() { int x = 5; super(); } // ERROR</code>
      </div>
    `
  },
  {
    id: 'polymorphism',
    phase: 2,
    title: 'Polymorphism DEEP DIVE',
    icon: '🎭',
    level: 'Advanced',
    minutes: 75,
    description: 'Understand compile-time vs runtime polymorphism, dynamic dispatch, casting, and types.',
    objectives: [
      'Differentiate Overloading (Compile-time) from Overriding (Runtime).',
      'Understand Reference Type vs Object Type.',
      'Trace exact JVM behavior during Dynamic Method Dispatch.',
      'Master Upcasting, Downcasting, and instanceof.',
      'Leverage polymorphism in collections and loops.'
    ],
    content: `
      <h2>What is Polymorphism?</h2>
      <p>Polymorphism means "many forms". In Java, it allows us to perform a single action in different ways. It is divided into Compile-time (Overloading) and Runtime (Overriding).</p>

      <h2>A. Compile-time Polymorphism (Method Overloading)</h2>
      <p>Overloading occurs when two or more methods in the same class have the <strong>same name but different parameter lists</strong>. The compiler determines which method to call based on the arguments passed at compile time.</p>
      <div class="code-block">
        <div class="code-header"><span>Printer.java</span></div>
        <pre><code>public class Printer {
    public void print(String s) { System.out.println("String: " + s); }
    public void print(int i) { System.out.println("Int: " + i); }
    // Changing return type alone is NOT enough to overload!
    // public int print(int i) { return i; } // ERROR!
}</code></pre>
      </div>

      <h2>B. Runtime Polymorphism (Method Overriding)</h2>
      <p>Overriding occurs when a subclass provides a specific implementation for a method already defined in its superclass. This is resolved at runtime.</p>
      <div class="callout">
        <strong>Overriding Rules:</strong>
        <ul>
          <li>Must have the same name and exact same parameter list.</li>
          <li>Return type must be the same or a subtype (Covariant return type).</li>
          <li>Access modifier cannot be more restrictive than the parent.</li>
          <li><code>private</code>, <code>static</code>, and <code>final</code> methods CANNOT be overridden.</li>
        </ul>
      </div>

      <h2>C. Runtime Polymorphism DEEP DIVE</h2>
      <p>This is the most crucial concept in Object-Oriented Java. Let's trace this EXACT code:</p>
      <div class="code-block">
        <pre><code>class Employee {
    private String name;
    public Employee(String name) { this.name = name; }
    public void work() { System.out.println("Employee is working"); }
}
class Developer extends Employee {
    public Developer(String name) { super(name); }
    @Override
    public void work() { System.out.println("Developer is writing code"); }
    public void debug() { System.out.println("Debugging..."); }
}
class Manager extends Employee {
    public Manager(String name) { super(name); }
    @Override
    public void work() { System.out.println("Manager is planning"); }
}

public class Main {
    public static void main(String[] args) {
        Employee first = new Developer("Ravi");
        first.work();
    }
}</code></pre>
      </div>

      <h3>Step-by-Step Breakdown</h3>
      <ol>
        <li><strong>What <code>new Developer("Ravi")</code> creates:</strong> It allocates memory on the Heap for a <code>Developer</code> object. It initializes the Developer part AND the inherited Employee part.</li>
        <li><strong>Reference type of <code>first</code>:</strong> The reference variable <code>first</code> is of type <code>Employee</code>. It lives on the Stack.</li>
        <li><strong>Actual runtime object:</strong> The object in the Heap is a <code>Developer</code>.</li>
        <li><strong>Why upcasting works:</strong> An Employee reference can point to a Developer object because a Developer IS-A Employee. This is safe and automatic (Upcasting).</li>
        <li><strong>Reference Type vs Object Type:</strong> The Reference Type (Employee) determines <em>what methods you are allowed to call</em>. The Object Type (Developer) determines <em>which version of the overridden method executes</em>.</li>
        <li><strong>What happens when <code>first.work()</code> is called:</strong> 
           <ul>
             <li>Compile time: Compiler checks if <code>work()</code> exists in the <code>Employee</code> class. It does. Compilation succeeds.</li>
             <li>Runtime: JVM looks at the actual object in memory (Developer). It sees Developer has overridden <code>work()</code>. It executes the Developer's version.</li>
           </ul>
        </li>
        <li><strong>Dynamic Method Dispatch:</strong> This process of resolving the overridden method at runtime rather than compile time is Dynamic Dispatch.</li>
        <li><strong>Why superclass version doesn't run:</strong> Because the most specific version (lowest in the hierarchy) belonging to the runtime object is always chosen.</li>
        <li><strong>What if Developer doesn't override <code>work()</code>:</strong> The JVM would search up the inheritance chain and execute the <code>Employee</code> class's <code>work()</code> method.</li>
        <li><strong>Accessing subclass-only methods:</strong> If you try <code>first.debug()</code>, you get a COMPILE ERROR. Why? Because <code>first</code> is an Employee reference, and Employees don't necessarily have a <code>debug()</code> method!</li>
        <li><strong>Why casting may be needed (Downcasting):</strong> To call <code>debug()</code>, you must tell the compiler "Trust me, this Employee is actually a Developer."
            <br><code>((Developer) first).debug();</code>
        </li>
        <li><strong>ClassCastException:</strong> If you try to cast incorrectly: <code>Manager m = (Manager) first;</code> The compiler allows it (Manager and Employee are related), but at runtime, the JVM sees a Developer object and throws a <code>ClassCastException</code>.</li>
        <li><strong>Changing references:</strong> <code>first = new Manager("Alice");</code> is perfectly legal. <code>first</code> now points to a Manager object.</li>
        <li><strong>List of Subtypes:</strong> <code>List&lt;Employee&gt; list = new ArrayList&lt;&gt;();</code> can hold Developers, Managers, etc.</li>
        <li><strong>Reducing Conditional Logic:</strong> Without polymorphism, you'd need massive <code>if/else</code> chains:
            <br><code>if(emp instanceof Developer) ... else if(emp instanceof Manager) ...</code>
            <br>With polymorphism, you just call <code>emp.work()</code> and the object handles its own behavior!
        </li>
      </ol>

      <pre>
[Stack]                           [Heap]
Employee first  ----------------&gt; { Developer Object }
                                    - Employee fields
                                    - Developer fields
                                    - Overridden work() implementation
      </pre>

      <h2>D. Collection Example</h2>
      <div class="code-block">
        <pre><code>List&lt;Employee&gt; staff = new ArrayList&lt;&gt;();
staff.add(new Developer("Ravi"));
staff.add(new Manager("Alice"));

for(Employee e : staff) {
    e.work(); // Output: Developer is writing code... \n Manager is planning...
}</code></pre>
      </div>

      <h2>E. Comprehensive Comparisons</h2>
      <table class="compare-table">
        <tr>
          <th>Feature</th>
          <th>Overloading (Compile-time)</th>
          <th>Overriding (Runtime)</th>
        </tr>
        <tr>
          <td>Location</td>
          <td>Same class</td>
          <td>Subclass</td>
        </tr>
        <tr>
          <td>Method Signature</td>
          <td>Must be different (params)</td>
          <td>Must be exactly the same</td>
        </tr>
        <tr>
          <td>Resolution</td>
          <td>By Compiler</td>
          <td>By JVM at Runtime</td>
        </tr>
        <tr>
          <td>Polymorphism Type</td>
          <td>Static Binding</td>
          <td>Dynamic Binding</td>
        </tr>
      </table>
    `
  },
  {
    id: 'abstraction-interfaces',
    phase: 2,
    title: 'Abstract Classes and Interfaces',
    icon: 'blueprint',
    level: 'Advanced',
    minutes: 40,
    description: 'Design robust application contracts using abstraction and interfaces.',
    objectives: [
      'Understand the purpose of abstract classes.',
      'Define and implement interfaces as contracts.',
      'Differentiate between Abstract Classes and Interfaces.',
      'Use modern Interface features (default, static, private methods).'
    ],
    content: `
      <h2>The Problem: Incomplete Blueprints</h2>
      <p>Imagine a company where every employee type — Developer, Manager, HR — calculates pay differently. You want to guarantee that every employee class has a <code>calculatePay()</code> method, but you cannot write a single universal implementation. You need a way to say: "Every subclass MUST provide this method, but each one does it differently."</p>
      <p>This is the purpose of <strong>abstraction</strong>: hiding implementation details and exposing only the essential behavior that subclasses must implement.</p>

      <h2>Abstract Classes</h2>
      <p>An abstract class is declared with the <code>abstract</code> keyword. It <strong>cannot be instantiated</strong> (you cannot write <code>new Employee()</code> if Employee is abstract). It can contain both abstract methods (no body — subclasses must implement) and concrete methods (with a body — inherited as-is).</p>

      <div class="callout"><strong>Key rule:</strong> If a class has even one <code>abstract</code> method, the class itself MUST be declared <code>abstract</code>.</div>

      <div class="code-block">
        <div class="code-header"><span>Employee.java (Abstract)</span></div>
        <pre><code>public abstract class Employee {
    private String name;
    private int id;

    // Abstract classes CAN have constructors
    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    // Abstract method: NO body, subclasses MUST implement
    public abstract double calculatePay();

    // Concrete method: inherited by all subclasses
    public void displayDetails() {
        System.out.println(id + " - " + name);
    }

    public String getName() { return name; }
}</code></pre>
      </div>

      <div class="code-block">
        <div class="code-header"><span>Developer.java</span></div>
        <pre><code>public class Developer extends Employee {
    private double monthlySalary;

    public Developer(String name, int id, double salary) {
        super(name, id);  // Calls abstract class constructor
        this.monthlySalary = salary;
    }

    @Override
    public double calculatePay() {
        return monthlySalary;  // Each subclass provides its own implementation
    }
}

public class Contractor extends Employee {
    private double hoursWorked;
    private double hourlyRate;

    public Contractor(String name, int id, double hours, double rate) {
        super(name, id);
        this.hoursWorked = hours;
        this.hourlyRate = rate;
    }

    @Override
    public double calculatePay() {
        return hoursWorked * hourlyRate;  // Different calculation
    }
}</code></pre>
      </div>

      <div class="code-block">
        <div class="code-header"><span>PayrollSystem.java</span></div>
        <pre><code>public class PayrollSystem {
    public static void main(String[] args) {
        // Employee emp = new Employee("X", 0);  // COMPILE ERROR: cannot instantiate abstract
        
        Employee dev = new Developer("Ravi", 101, 45000);
        Employee con = new Contractor("Priya", 102, 160, 250);
        
        // Polymorphism works with abstract classes!
        System.out.println(dev.getName() + " pay: " + dev.calculatePay());
        System.out.println(con.getName() + " pay: " + con.calculatePay());
    }
}</code></pre>
      </div>
      <div class="output-box">Ravi pay: 45000.0
Priya pay: 40000.0</div>

      <h2>Interfaces: Contracts for Behavior</h2>
      <p>An interface defines a contract — a set of methods that any implementing class must provide. It represents a "CAN-DO" relationship. A class uses the <code>implements</code> keyword for interfaces.</p>

      <div class="code-block">
        <div class="code-header"><span>Payable.java (Interface)</span></div>
        <pre><code>public interface Payable {
    // All fields are implicitly: public static final
    double MIN_WAGE = 15.0;

    // All abstract methods are implicitly: public abstract
    void processPayment();

    // Default method (Java 8+): provides a default implementation
    default void printReceipt() {
        System.out.println("Receipt generated.");
    }

    // Static method: belongs to the interface, not implementors
    static boolean isValidAmount(double amount) {
        return amount > 0;
    }
}

public interface Reportable {
    void generateReport();
}</code></pre>
      </div>

      <h3>Multiple Interface Implementation</h3>
      <p>While Java does not allow multiple class inheritance, a class CAN implement multiple interfaces. This is how Java achieves a form of multiple inheritance.</p>
      <div class="code-block">
        <pre><code>public class FullTimeEmployee extends Employee implements Payable, Reportable {
    public FullTimeEmployee(String name, int id) { super(name, id); }

    @Override public double calculatePay() { return 50000; }
    @Override public void processPayment() { System.out.println("Paid via bank"); }
    @Override public void generateReport() { System.out.println("Report for " + getName()); }
}</code></pre>
      </div>

      <h3>Functional Interfaces (Java 8+)</h3>
      <p>An interface with <strong>exactly one abstract method</strong> is called a functional interface. It can be implemented using a lambda expression. The <code>@FunctionalInterface</code> annotation verifies this at compile time.</p>
      <div class="code-block">
        <pre><code>@FunctionalInterface
public interface SalaryCalculator {
    double calculate(Employee emp);
}

// Using lambda:
SalaryCalculator bonus = emp -&gt; emp.calculatePay() * 1.1;</code></pre>
      </div>

      <h2>When to Use Which?</h2>
      <table class="compare-table">
        <tr><th>Feature</th><th>Abstract Class</th><th>Interface</th></tr>
        <tr><td><strong>Instance variables</strong></td><td>Yes (any type)</td><td>Only <code>public static final</code></td></tr>
        <tr><td><strong>Constructors</strong></td><td>Yes</td><td>No</td></tr>
        <tr><td><strong>Method types</strong></td><td>Abstract + concrete</td><td>Abstract + default + static + private (Java 9)</td></tr>
        <tr><td><strong>Inheritance</strong></td><td>extends ONE only</td><td>implements MULTIPLE</td></tr>
        <tr><td><strong>Relationship</strong></td><td>"IS-A" hierarchy</td><td>"CAN-DO" behavior contract</td></tr>
        <tr><td><strong>Use when</strong></td><td>Classes share state and behavior</td><td>Unrelated classes need the same capability</td></tr>
      </table>

      <div class="callout"><strong>Guideline:</strong> If you need shared state (fields, constructors) — use an abstract class. If you need a behavior contract that unrelated classes can implement — use an interface. Often you use both together: an abstract class for the core hierarchy, and interfaces for cross-cutting capabilities.</div>

      <h2>Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake: Trying to instantiate an abstract class</h4>
        <pre><code>Employee emp = new Employee("Test", 1);  // COMPILE ERROR</code></pre>
        <p><strong>Fix:</strong> Create instances of concrete subclasses: <code>Employee emp = new Developer("Test", 1, 50000);</code></p>
      </div>
      <div class="mistake-box">
        <h4>Mistake: Forgetting to implement all abstract methods</h4>
        <pre><code>class Intern extends Employee {
    // Missing calculatePay() implementation
    // COMPILE ERROR: Intern must implement calculatePay() or be abstract
}</code></pre>
        <p><strong>Fix:</strong> Either implement all abstract methods, or declare Intern as <code>abstract</code> too.</p>
      </div>

      <div class="practice-section">
        <h3>Practice</h3>
        <p>Create an interface <code>Taxable</code> with a method <code>double calculateTax()</code>. Make your <code>Developer</code> class implement it. The tax should be 30% of pay for salaries above 40000, and 20% otherwise.</p>
        <details>
          <summary>Show Solution</summary>
          <div class="code-block">
            <pre><code>interface Taxable {
    double calculateTax();
}

class Developer extends Employee implements Taxable {
    private double salary;
    Developer(String name, int id, double salary) {
        super(name, id);
        this.salary = salary;
    }
    @Override public double calculatePay() { return salary; }
    @Override public double calculateTax() {
        return salary &gt; 40000 ? salary * 0.30 : salary * 0.20;
    }
}</code></pre>
          </div>
        </details>
      </div>
    `
  },
  {
    id: 'final-keyword',
    phase: 2,
    title: 'The final Keyword',
    icon: '🛑',
    level: 'Intermediate',
    minutes: 20,
    description: 'Learn how to restrict modification of variables, methods, and classes.',
    objectives: [
      'Use final with variables to create constants.',
      'Use final with methods to prevent overriding.',
      'Use final with classes to prevent inheritance.',
      'Understand final reference behavior.'
    ],
    content: `
      <h2>What is the <code>final</code> Keyword?</h2>
      <p>The <code>final</code> keyword in Java is a non-access modifier that means <strong>"this cannot be changed."</strong> It can be applied to variables, methods, and classes — and its meaning changes slightly depending on where you use it.</p>
      
      <div class="callout"><strong>Analogy:</strong> Think of <code>final</code> like writing with permanent ink instead of pencil. Once you write it, you cannot erase or change it.</div>

      <h2>1. Final Variables (Constants)</h2>
      <p>When a variable is declared <code>final</code>, its value cannot be changed after initialization. This is Java's way of creating constants.</p>

      <div class="code-block">
        <div class="code-header"><span>FinalVariables.java</span></div>
        <pre><code>public class Employee {
    // static final = class-level constant (convention: ALL_CAPS)
    public static final String COMPANY_NAME = "MouriTech";
    public static final double MAX_SALARY = 500000.0;

    // final instance variable — must be set in constructor
    private final int employeeId;
    private String name;

    public Employee(int id, String name) {
        this.employeeId = id;   // OK: first and only assignment
        this.name = name;
    }

    public void changeId(int newId) {
        // this.employeeId = newId;  // COMPILE ERROR: cannot assign to final variable
    }

    public void changeName(String newName) {
        this.name = newName;  // OK: name is not final
    }
}</code></pre>
      </div>

      <h3>Blank Final Variables</h3>
      <p>A <code>final</code> variable that is not initialized at declaration is called a <strong>blank final</strong>. It MUST be initialized exactly once — in the constructor for instance variables, or in a static block for static finals.</p>
      <div class="code-block">
        <pre><code>class Config {
    static final String ENV;
    static {
        ENV = System.getenv("APP_ENV") != null ? System.getenv("APP_ENV") : "dev";
    }
}</code></pre>
      </div>

      <h3>Final with Reference Types — Critical Distinction</h3>
      <p>When a <strong>reference variable</strong> is <code>final</code>, you cannot reassign the reference to point to a different object. But the object itself CAN still be modified internally (if it is mutable).</p>

      <div class="code-block">
        <div class="code-header"><span>FinalReference.java</span></div>
        <pre><code>final List&lt;String&gt; names = new ArrayList&lt;&gt;();
names.add("Alice");        // ALLOWED — modifying the object's contents
names.add("Bob");          // ALLOWED — the list itself is mutable
// names = new ArrayList&lt;&gt;(); // COMPILE ERROR — cannot reassign the reference

final Employee emp = new Employee(101, "Ravi");
emp.changeName("Ravi Kumar"); // ALLOWED — object's internal state changes
// emp = new Employee(102, "Priya"); // COMPILE ERROR — cannot reassign</code></pre>
      </div>
      <div class="callout"><strong>Remember:</strong> <code>final</code> makes the <em>reference</em> constant, not the <em>object</em>. To make the object itself immutable, you must design the class that way (private fields, no setters, return copies).</div>

      <h2>2. Final Methods (Cannot Override)</h2>
      <p>A <code>final</code> method cannot be overridden by subclasses. Use this when a method's behavior must remain exactly as defined.</p>

      <div class="code-block">
        <div class="code-header"><span>FinalMethod.java</span></div>
        <pre><code>class Employee {
    private final int id;
    private String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // This method CANNOT be overridden
    public final int getId() {
        return id;
    }

    // This method CAN be overridden
    public String getDisplayName() {
        return name;
    }
}

class Developer extends Employee {
    private String language;

    Developer(int id, String name, String lang) {
        super(id, name);
        this.language = lang;
    }

    // @Override
    // public int getId() { return -1; }  // COMPILE ERROR: getId() is final

    @Override
    public String getDisplayName() {
        return super.getDisplayName() + " [" + language + "]";  // OK
    }
}</code></pre>
      </div>

      <h2>3. Final Classes (Cannot Extend)</h2>
      <p>A <code>final</code> class cannot be extended by any other class. The <code>String</code> class in Java is a famous example — you cannot create a subclass of String.</p>

      <div class="code-block">
        <pre><code>public final class SecurityModule {
    public void authenticate() { /* ... */ }
}

// class HackedSecurity extends SecurityModule { }  // COMPILE ERROR</code></pre>
      </div>
      <p><strong>When to use:</strong> Mark a class <code>final</code> when its internal design is not safe for inheritance, or when its security guarantees would break if subclassed.</p>

      <h2>Final Parameters</h2>
      <p>Method parameters can also be marked <code>final</code>. This prevents the parameter from being reassigned within the method body.</p>
      <div class="code-block">
        <pre><code>public void processSalary(final double salary) {
    // salary = salary * 1.1;  // COMPILE ERROR: parameter is final
    double bonus = salary * 0.1;  // OK: using the value, not reassigning
    System.out.println("Bonus: " + bonus);
}</code></pre>
      </div>

      <h2>Summary Table</h2>
      <table class="compare-table">
        <tr><th>Applied To</th><th>Meaning</th><th>Example</th></tr>
        <tr><td><strong>Variable</strong></td><td>Value cannot be changed after assignment</td><td><code>final int MAX = 100;</code></td></tr>
        <tr><td><strong>Reference</strong></td><td>Reference cannot point to a new object (object internals CAN change)</td><td><code>final List list = new ArrayList();</code></td></tr>
        <tr><td><strong>Method</strong></td><td>Method cannot be overridden in subclasses</td><td><code>public final void doWork() {}</code></td></tr>
        <tr><td><strong>Class</strong></td><td>Class cannot be extended</td><td><code>public final class Utils {}</code></td></tr>
        <tr><td><strong>Parameter</strong></td><td>Parameter cannot be reassigned inside the method</td><td><code>void calc(final int x) {}</code></td></tr>
      </table>

      <h2>Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake 1: Thinking final makes objects immutable</h4>
        <pre><code>final Employee emp = new Employee(1, "Test");
emp.changeName("New Name"); // This WORKS — only the reference is final</code></pre>
        <p><strong>Fix:</strong> Understand that <code>final</code> freezes the reference, not the object. For true immutability, design the class with no setters.</p>
      </div>
      <div class="mistake-box">
        <h4>Mistake 2: Forgetting to initialize a blank final</h4>
        <pre><code>class Broken {
    final int value; // Blank final
    // No constructor that sets value
    // COMPILE ERROR: variable value might not have been initialized
}</code></pre>
        <p><strong>Fix:</strong> Always initialize blank finals in every constructor path.</p>
      </div>

      <div class="practice-section">
        <h3>Practice</h3>
        <p>What will happen when you compile and run this code?</p>
        <pre><code>final StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
System.out.println(sb);</code></pre>
        <details>
          <summary>Show Answer</summary>
          <p>It prints <strong>Hello World</strong>. The reference <code>sb</code> is final (cannot point to a different StringBuilder), but the StringBuilder object itself is mutable, so <code>append()</code> works fine.</p>
        </details>
      </div>
    `
  }
];
