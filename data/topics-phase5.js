window.JAVAPATH_PHASE5_TOPICS = [
  {
    id: "functional-interfaces",
    phase: 5,
    title: "Functional Interfaces & Lambdas",
    icon: "λ",
    level: "Intermediate",
    minutes: 45,
    description: "Learn how to treat code as data using Lambdas, Functional Interfaces, and Method References.",
    objectives: [
      "Understand the Single Abstract Method (SAM) concept and @FunctionalInterface.",
      "Master the syntax and behavior of lambda expressions.",
      "Use built-in functional interfaces: Predicate, Function, Consumer, Supplier.",
      "Apply Method References to simplify lambda expressions.",
      "Avoid common pitfalls like variable capture mutations."
    ],
    content: `
      <h2>The Problem: Verbose Anonymous Classes</h2>
      <p>Before Java 8, if we wanted to pass behavior (code) into a method, we had to create a class that implemented an interface, instantiate it, and pass it along. This was often done using <strong>Anonymous Inner Classes</strong>, which resulted in a lot of boilerplate code for just a single line of logic.</p>

      <p>For example, filtering a list of Employees requires a condition. Passing that condition meant writing a lot of ceremony around it.</p>

      <h2>Introducing Functional Interfaces</h2>
      <p>A <strong>Functional Interface</strong> is an interface that has <strong>exactly one abstract method</strong> (often called a SAM - Single Abstract Method). Java uses these interfaces as the target type for lambda expressions.</p>

      <div class="code-block">
        <div class="code-header"><span>EmployeeFilter.java</span></div>
        <pre><code>@FunctionalInterface
public interface EmployeeFilter {
    boolean test(Employee e); // Single abstract method
    
    // Can have default or static methods
    default void printInfo() {
        System.out.println("Filtering employee");
    }
}</code></pre>
      </div>

      <p>The <code>@FunctionalInterface</code> annotation is optional but recommended. It tells the compiler to produce an error if the interface accidentally has more than one abstract method.</p>

      <h2>Lambda Expressions</h2>
      <p>A <strong>Lambda Expression</strong> is a concise way to implement a functional interface. It allows you to write the method body directly without the class boilerplate.</p>

      <h3>Syntax Overview</h3>
      <p><code>(parameters) -&gt; expression</code> or <code>(parameters) -&gt; { statements; }</code></p>

      <div class="code-block">
        <div class="code-header"><span>LambdaSyntax.java</span></div>
        <pre><code>// 1. Without lambda (Anonymous Class)
EmployeeFilter oldWay = new EmployeeFilter() {
    @Override
    public boolean test(Employee e) {
        return e.getSalary() > 50000;
    }
};

// 2. Full lambda syntax
EmployeeFilter lambda1 = (Employee e) -> {
    return e.getSalary() > 50000;
};

// 3. Omitting parameter type (Type Inference)
EmployeeFilter lambda2 = (e) -> { return e.getSalary() > 50000; };

// 4. Omitting parentheses (only if exactly one parameter)
EmployeeFilter lambda3 = e -> { return e.getSalary() > 50000; };

// 5. Omitting braces and return keyword (Expression body)
EmployeeFilter lambda4 = e -> e.getSalary() > 50000;</code></pre>
      </div>

      <h3>How it Works: Target Typing</h3>
      <p>When you assign a lambda to an <code>EmployeeFilter</code> variable, the Java compiler looks at the single abstract method in <code>EmployeeFilter</code> (which is <code>boolean test(Employee e)</code>). It ensures that your lambda parameters and return type match this method signature. This process is called <strong>Target Typing</strong>.</p>

      <h2>Built-in Functional Interfaces</h2>
      <p>Java provides a robust set of functional interfaces in the <code>java.util.function</code> package so you rarely need to create your own.</p>

      <table class="compare-table">
        <tr>
            <th>Interface</th>
            <th>Signature</th>
            <th>Purpose</th>
            <th>Example Use Case</th>
        </tr>
        <tr>
            <td><code>Predicate&lt;T&gt;</code></td>
            <td><code>boolean test(T t)</code></td>
            <td>Tests a condition on an object.</td>
            <td><code>e -&gt; e.getDepartment().equals("IT")</code></td>
        </tr>
        <tr>
            <td><code>Function&lt;T, R&gt;</code></td>
            <td><code>R apply(T t)</code></td>
            <td>Transforms an object of type T into type R.</td>
            <td><code>e -&gt; e.getName()</code></td>
        </tr>
        <tr>
            <td><code>Consumer&lt;T&gt;</code></td>
            <td><code>void accept(T t)</code></td>
            <td>Consumes an object (performs an action on it).</td>
            <td><code>e -&gt; System.out.println(e)</code></td>
        </tr>
        <tr>
            <td><code>Supplier&lt;T&gt;</code></td>
            <td><code>T get()</code></td>
            <td>Supplies (creates/generates) an object.</td>
            <td><code>() -&gt; new Employee()</code></td>
        </tr>
        <tr>
            <td><code>UnaryOperator&lt;T&gt;</code></td>
            <td><code>T apply(T t)</code></td>
            <td>A <code>Function</code> where T and R are the same type.</td>
            <td><code>name -&gt; name.toUpperCase()</code></td>
        </tr>
        <tr>
            <td><code>BinaryOperator&lt;T&gt;</code></td>
            <td><code>T apply(T t1, T t2)</code></td>
            <td>Takes two T objects, returns one T object.</td>
            <td><code>(e1, e2) -&gt; e1.getSalary() &gt; e2.getSalary() ? e1 : e2</code></td>
        </tr>
      </table>

      <h3>Real-World Employee Example</h3>
      <div class="code-block">
        <div class="code-header"><span>EmployeeAction.java</span></div>
        <pre><code>public class EmployeeAction {
    public static void processEmployees(List&lt;Employee&gt; list, 
                                        Predicate&lt;Employee&gt; filter, 
                                        Consumer&lt;Employee&gt; action) {
        for (Employee e : list) {
            if (filter.test(e)) {
                action.accept(e);
            }
        }
    }

    public static void main(String[] args) {
        List&lt;Employee&gt; employees = getEmployees();
        
        // Predicate: Is salary > 60k?
        // Consumer: Print the employee
        processEmployees(
            employees, 
            e -> e.getSalary() > 60000, 
            e -> System.out.println(e.getName())
        );
    }
}</code></pre>
      </div>
      <div class="output-box">
Alice
Bob
</div>

      <h2>Variable Capture (Effectively Final)</h2>
      <p>Lambdas can access variables defined <em>outside</em> the lambda block. However, local variables captured by a lambda must be <strong>final</strong> or <strong>effectively final</strong> (meaning their value is never changed after initialization).</p>

      <div class="mistake-box">
        <h3>Mistake: Modifying Captured Variables</h3>
        <p><strong>Incorrect:</strong></p>
        <pre><code>int minSalary = 50000;
Predicate&lt;Employee&gt; filter = e -> e.getSalary() > minSalary;
minSalary = 60000; // Error: Variable used in lambda should be final or effectively final</code></pre>
        <p><strong>Fix:</strong> Do not reassign the variable. If you need dynamic state, use an instance variable or pass it as an argument.</p>
      </div>

      <h2>Method References</h2>
      <p>Sometimes a lambda expression just calls an existing method. <strong>Method References</strong> (<code>::</code>) provide a shorter, more readable syntax for this.</p>

      <ul>
        <li><strong>Static Method:</strong> <code>ClassName::methodName</code> (e.g., <code>Math::max</code> is <code>(a, b) -&gt; Math.max(a, b)</code>)</li>
        <li><strong>Instance Method of a particular object:</strong> <code>instance::methodName</code> (e.g., <code>System.out::println</code> is <code>x -&gt; System.out.println(x)</code>)</li>
        <li><strong>Instance Method of an arbitrary object of a particular type:</strong> <code>ClassName::methodName</code> (e.g., <code>String::length</code> is <code>s -&gt; s.length()</code> or <code>Employee::getName</code> is <code>e -&gt; e.getName()</code>)</li>
        <li><strong>Constructor Reference:</strong> <code>ClassName::new</code> (e.g., <code>ArrayList::new</code> is <code>() -&gt; new ArrayList&lt;&gt;()</code>)</li>
      </ul>

      <h2>Chaining Built-in Interfaces</h2>
      <p>Many functional interfaces provide default methods for composing complex logic.</p>

      <div class="code-block">
        <div class="code-header"><span>Chaining.java</span></div>
        <pre><code>Predicate&lt;Employee&gt; isIT = e -> "IT".equals(e.getDepartment());
Predicate&lt;Employee&gt; isHighlyPaid = e -> e.getSalary() > 80000;

// Combine predicates using and(), or(), negate()
Predicate&lt;Employee&gt; target = isIT.and(isHighlyPaid).negate();

Function&lt;Employee, String&gt; getName = Employee::getName;
Function&lt;String, String&gt; toUpper = String::toUpperCase;

// Combine functions using andThen()
Function&lt;Employee, String&gt; upperName = getName.andThen(toUpper);</code></pre>
      </div>

      <div class="practice-section">
        <h3>Practice: Functional Interfaces</h3>
        <p>Write a <code>Function</code> that takes an <code>Employee</code> and returns a formatted String: <code>"Name: [name], Dept: [department]"</code>. Then write a <code>Predicate</code> that returns true if the employee's name starts with "A".</p>
        <details>
          <summary>Show Solution</summary>
          <pre><code>Function&lt;Employee, String&gt; formatter = 
    e -> "Name: " + e.getName() + ", Dept: " + e.getDepartment();

Predicate&lt;Employee&gt; startsWithA = 
    e -> e.getName().startsWith("A");</code></pre>
        </details>
      </div>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: What is a functional interface?</summary>
        <p>A functional interface is an interface with exactly one abstract method. It can have multiple default or static methods, but only one abstract method. They act as the target types for lambda expressions.</p>
      </details>
      <details>
        <summary>Q: What is the difference between Predicate and Function?</summary>
        <p>A <code>Predicate&lt;T&gt;</code> takes an input of type T and returns a boolean, typically used for filtering. A <code>Function&lt;T, R&gt;</code> takes an input of type T and returns a result of type R, used for mapping or transformation.</p>
      </details>
      <details>
        <summary>Q: Can a functional interface have default methods?</summary>
        <p>Yes. A functional interface must have exactly one abstract method, but it is free to have any number of default or static methods.</p>
      </details>

      <div class="execution-trace">
        <h4>Execution Trace: Filtering with Predicate</h4>
        <ol>
          <li><code>processEmployees</code> is called with a list of employees.</li>
          <li>For each employee, the <code>Predicate.test()</code> method is invoked.</li>
          <li>If it evaluates to <code>true</code>, the <code>Consumer.accept()</code> method is called, printing the employee's name.</li>
        </ol>
      </div>

      <div class="mistake-box">
        <h3>Debugging Exercise: Local Variable Capture</h3>
        <p><strong>Problem:</strong> You try to modify a counter variable inside a lambda, but the compiler complains that variables used in lambda should be final or effectively final.</p>
        <p><strong>Solution:</strong> Lambdas can only read local variables from their enclosing scope if they are not reassigned. You can bypass this by using a single-element array (<code>int[] count = {0}</code>) or an <code>AtomicInteger</code>, but typically you should redesign the logic to use streams and collectors instead of side-effects.</p>
      </div>

    `
  },
  {
    id: "streams-basics",
    phase: 5,
    title: "Stream API Fundamentals",
    icon: "🌊",
    level: "Intermediate",
    minutes: 60,
    description: "Process collections of data declaratively with pipelines, lazily evaluated operations, and parallel execution.",
    objectives: [
      "Distinguish between Collections (data storage) and Streams (data processing).",
      "Construct stream pipelines using source, intermediate, and terminal operations.",
      "Understand lazy evaluation and how it optimizes processing.",
      "Use common intermediate operations: filter, map, sorted, flatMap.",
      "Use common terminal operations: forEach, collect, reduce, matchers."
    ],
    content: `
      <h2>The Problem: Imperative Data Processing</h2>
      <p>Consider the task: "Find the names of all IT employees earning more than $70,000, sorted alphabetically."</p>

      <div class="code-block">
        <div class="code-header"><span>ImperativeWay.java</span></div>
        <pre><code>// Without Streams
List&lt;String&gt; itHighEarners = new ArrayList&lt;&gt;();
for (Employee e : employees) {
    if ("IT".equals(e.getDepartment()) && e.getSalary() > 70000) {
        itHighEarners.add(e.getName());
    }
}
Collections.sort(itHighEarners);
// This is verbose, mixes 'what to do' with 'how to do it', and is hard to parallelize.</code></pre>
      </div>

      <h2>Introducing Streams</h2>
      <p>A <strong>Stream</strong> in Java is a sequence of elements supporting sequential and parallel aggregate operations. 
      <strong>Important:</strong> A Stream is NOT a data structure. It does not store data. It pulls data from a source (like a Collection), pushes it through a pipeline of operations, and produces a result.</p>

      <div class="code-block">
        <div class="code-header"><span>DeclarativeWay.java</span></div>
        <pre><code>// With Streams
List&lt;String&gt; itHighEarners = employees.stream()
    .filter(e -> "IT".equals(e.getDepartment()))
    .filter(e -> e.getSalary() > 70000)
    .map(Employee::getName)
    .sorted()
    .collect(Collectors.toList());</code></pre>
      </div>

      <h2>The Stream Pipeline Concept</h2>
      <p>A Stream pipeline consists of three parts:</p>
      <ol>
        <li><strong>Source:</strong> Where the stream comes from (e.g., <code>collection.stream()</code>, <code>Arrays.stream(array)</code>, <code>Stream.of(1, 2, 3)</code>).</li>
        <li><strong>Intermediate Operations:</strong> Transform the stream into another stream (e.g., <code>filter</code>, <code>map</code>). They are <em>lazy</em>.</li>
        <li><strong>Terminal Operation:</strong> Produces a result or side-effect and triggers the execution of the pipeline (e.g., <code>collect</code>, <code>forEach</code>, <code>count</code>).</li>
      </ol>

      <div class="callout">
        <strong>Lazy Evaluation:</strong> Intermediate operations are not executed until a terminal operation is invoked. If you create a stream, add 5 filters, and never call a terminal operation, nothing happens! The elements flow through the pipeline one by one.
      </div>

      <h2>Intermediate Operations</h2>
      <p>These operations return a new Stream and are always lazy.</p>
      <table class="compare-table">
        <tr>
            <th>Operation</th>
            <th>Type signature (simplified)</th>
            <th>What it does</th>
        </tr>
        <tr>
            <td><code>filter(Predicate)</code></td>
            <td><code>Stream&lt;T&gt; -&gt; Stream&lt;T&gt;</code></td>
            <td>Keeps only elements that match the predicate.</td>
        </tr>
        <tr>
            <td><code>map(Function)</code></td>
            <td><code>Stream&lt;T&gt; -&gt; Stream&lt;R&gt;</code></td>
            <td>Transforms each element into another object. Changes stream type.</td>
        </tr>
        <tr>
            <td><code>flatMap(Function)</code></td>
            <td><code>Stream&lt;T&gt; -&gt; Stream&lt;R&gt;</code></td>
            <td>Like map, but the function returns a Stream. "Flattens" streams of streams into a single stream.</td>
        </tr>
        <tr>
            <td><code>sorted()</code> / <code>sorted(Comparator)</code></td>
            <td><code>Stream&lt;T&gt; -&gt; Stream&lt;T&gt;</code></td>
            <td>Sorts elements. (Stateful: must buffer all elements before emitting).</td>
        </tr>
        <tr>
            <td><code>distinct()</code></td>
            <td><code>Stream&lt;T&gt; -&gt; Stream&lt;T&gt;</code></td>
            <td>Removes duplicates (based on <code>equals()</code>). (Stateful).</td>
        </tr>
        <tr>
            <td><code>limit(long n)</code></td>
            <td><code>Stream&lt;T&gt; -&gt; Stream&lt;T&gt;</code></td>
            <td>Truncates stream to at most n elements. (Short-circuiting).</td>
        </tr>
        <tr>
            <td><code>peek(Consumer)</code></td>
            <td><code>Stream&lt;T&gt; -&gt; Stream&lt;T&gt;</code></td>
            <td>Performs an action (like logging) without changing the stream.</td>
        </tr>
      </table>

      <h2>Terminal Operations</h2>
      <p>These operations return a non-Stream result (or void) and close the stream.</p>
      <table class="compare-table">
        <tr>
            <th>Operation</th>
            <th>Return Type</th>
            <th>What it does</th>
        </tr>
        <tr>
            <td><code>collect(Collector)</code></td>
            <td>Depends (e.g., <code>List</code>)</td>
            <td>Accumulates elements into a collection or other data structure.</td>
        </tr>
        <tr>
            <td><code>forEach(Consumer)</code></td>
            <td><code>void</code></td>
            <td>Performs an action on each element.</td>
        </tr>
        <tr>
            <td><code>count()</code></td>
            <td><code>long</code></td>
            <td>Returns the number of elements.</td>
        </tr>
        <tr>
            <td><code>anyMatch / allMatch / noneMatch</code></td>
            <td><code>boolean</code></td>
            <td>Checks if elements match a Predicate. (Short-circuiting: stops evaluating once the result is determined).</td>
        </tr>
        <tr>
            <td><code>findFirst / findAny</code></td>
            <td><code>Optional&lt;T&gt;</code></td>
            <td>Returns an element if present. (Short-circuiting).</td>
        </tr>
        <tr>
            <td><code>reduce(...)</code></td>
            <td><code>T</code> or <code>Optional&lt;T&gt;</code></td>
            <td>Combines elements to a single value (e.g., sum, max).</td>
        </tr>
      </table>

      <h2>Execution Trace: How Elements Flow</h2>
      <div class="execution-trace">
        <p>Consider this stream:</p>
        <pre><code>Stream.of("A", "B", "C", "D")
      .filter(s -> { System.out.print("Filter:" + s + " "); return s.compareTo("B") > 0; })
      .map(s -> { System.out.print("Map:" + s + " "); return s.toLowerCase(); })
      .limit(1)
      .forEach(s -> System.out.print("End:" + s + " "));</code></pre>
        <p><strong>Trace:</strong></p>
        <ol>
            <li>"A" passes to filter. condition fails (A is not > B).</li>
            <li>"B" passes to filter. condition fails.</li>
            <li>"C" passes to filter. condition succeeds.</li>
            <li>"C" passes to map. Transforms to "c".</li>
            <li>"c" passes to limit. Limit allows 1 element, records that 1 is met.</li>
            <li>"c" passes to forEach. Prints "End:c ".</li>
            <li>Limit tells the stream to stop processing (short-circuit). "D" is never touched!</li>
        </ol>
        <p><strong>Output:</strong> <code>Filter:A Filter:B Filter:C Map:C End:c </code></p>
      </div>

      <div class="mistake-box">
        <h3>Mistake: Reusing a Stream</h3>
        <p><strong>Incorrect:</strong></p>
        <pre><code>Stream&lt;Employee&gt; s = employees.stream();
long count = s.count();
List&lt;Employee&gt; list = s.collect(Collectors.toList()); // IllegalStateException: stream has already been operated upon or closed</code></pre>
        <p><strong>Fix:</strong> Streams are single-use. You must create a new stream from the source for each pipeline.</p>
      </div>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: Stream vs Collection?</summary>
        <p>A Collection is an in-memory data structure that holds elements. A Stream is a pipeline of operations that processes elements from a source (like a Collection) without modifying the source or storing data itself.</p>
      </details>
      <details>
        <summary>Q: Can a stream be reused?</summary>
        <p>No. Once a terminal operation is invoked on a Stream, it is consumed and closed. You must create a new Stream from the source if you want to process it again.</p>
      </details>
      <details>
        <summary>Q: What is lazy evaluation?</summary>
        <p>Lazy evaluation means that intermediate operations (like <code>filter</code> or <code>map</code>) are not executed until a terminal operation is called. This allows for optimizations like short-circuiting.</p>
      </details>
      <details>
        <summary>Q: Intermediate vs terminal operations?</summary>
        <p>Intermediate operations return a new Stream (e.g., <code>filter</code>) and are lazy. Terminal operations produce a non-stream result (e.g., <code>count</code>, <code>collect</code>) or side-effect and trigger the processing.</p>
      </details>

      <div class="practice-section">
        <h3>Practice</h3>
        <p>Given a list of strings, write a stream pipeline to find the first string that starts with "A" and convert it to uppercase.</p>
        <details>
          <summary>Show Solution</summary>
          <pre><code>Optional&lt;String&gt; result = list.stream()
    .filter(s -&gt; s.startsWith("A"))
    .map(String::toUpperCase)
    .findFirst();</code></pre>
        </details>
      </div>

      <div class="callout">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Streams separate the "what" from the "how".</li>
          <li>Pipelines consist of a source, zero or more intermediate operations, and one terminal operation.</li>
          <li>Always remember that streams are single-use!</li>
        </ul>
      </div>

      <div class="callout">
        <strong>Real-World Use:</strong> Streams are heavily used in backend development to process database results, transform DTOs (Data Transfer Objects), and aggregate data for reporting dashboards efficiently.
      </div>

      <div class="mistake-box">
        <h3>Debugging Exercise: Reusing a Consumed Stream</h3>
        <p><strong>Problem:</strong> You get an <code>IllegalStateException: stream has already been operated upon or closed</code>.</p>
        <p><strong>Solution:</strong> You likely saved a stream to a variable and called two terminal operations on it (like <code>count()</code> then <code>collect()</code>). Always chain operations directly or recreate the stream from the collection.</p>
      </div>

    `
  },
  {
    id: "collectors-grouping",
    phase: 5,
    title: "Collectors, Grouping, & Partitioning",
    icon: "🗂️",
    level: "Advanced",
    minutes: 50,
    description: "Master the art of summarizing, grouping, and partitioning data using advanced Collectors.",
    objectives: [
      "Use basic collectors like toList(), toSet(), and toMap().",
      "Perform aggregations like summing, averaging, and joining.",
      "Group data using groupingBy() for complex classifications.",
      "Partition data into true/false buckets using partitioningBy().",
      "Chain downstream collectors for multi-level data reduction."
    ],
    content: `
      <h2>The Problem: Complex Aggregations</h2>
      <p>Terminal operations like <code>count()</code> or <code>forEach()</code> are simple, but what if you need to build a complex report? For example, "Group all employees by department, and for each department, find the average salary." Doing this manually requires maps, loops, and accumulating variables.</p>

      <h2>Basic Collectors</h2>
      <p>The <code>Collectors</code> utility class provides factory methods for many common reduction operations.</p>
      
      <div class="code-block">
        <div class="code-header"><span>BasicCollectors.java</span></div>
        <pre><code>// 1. toList() / toSet()
List&lt;String&gt; names = employees.stream().map(Employee::getName).collect(Collectors.toList());
Set&lt;String&gt; depts = employees.stream().map(Employee::getDepartment).collect(Collectors.toSet());

// 2. toMap() - Needs keyMapper and valueMapper
// Be careful: if duplicate keys exist, it throws IllegalStateException!
Map&lt;Integer, String&gt; idToName = employees.stream()
    .collect(Collectors.toMap(Employee::getId, Employee::getName));

// 3. joining() - For Strings
String allNames = employees.stream()
    .map(Employee::getName)
    .collect(Collectors.joining(", ", "Names: [", "]")); 
    // Output: Names: [Alice, Bob, Charlie]</code></pre>
      </div>

      <h2>Math and Summarization Collectors</h2>
      <p>You can easily calculate sums and averages on object fields.</p>
      <div class="code-block">
        <pre><code>// Summing
Double totalSalary = employees.stream()
    .collect(Collectors.summingDouble(Employee::getSalary));

// Summarizing (gets min, max, average, sum, count all at once!)
DoubleSummaryStatistics stats = employees.stream()
    .collect(Collectors.summarizingDouble(Employee::getSalary));
System.out.println("Max salary: " + stats.getMax());
System.out.println("Average: " + stats.getAverage());</code></pre>
      </div>
      <div class="output-box">Max salary: 120000.0
Average: 75000.0</div>

      <h2>Grouping Data: groupingBy()</h2>
      <p><code>Collectors.groupingBy(Function classifier)</code> classifies elements by some property and returns a <code>Map&lt;K, List&lt;T&gt;&gt;</code>.</p>

      <div class="code-block">
        <div class="code-header"><span>Grouping.java</span></div>
        <pre><code>// Group employees by department
Map&lt;String, List&lt;Employee&gt;&gt; byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));

// Output logic:
// { "IT" = [Alice, Bob], "HR" = [Charlie] }</code></pre>
      </div>

      <h2>Partitioning Data: partitioningBy()</h2>
      <p><code>Collectors.partitioningBy(Predicate)</code> is a special case of grouping where there are only two groups: <code>true</code> and <code>false</code>. It returns a <code>Map&lt;Boolean, List&lt;T&gt;&gt;</code>.</p>

      <div class="code-block">
        <div class="code-header"><span>Partitioning.java</span></div>
        <pre><code>// Partition into: Salary > 80k (true) and <= 80k (false)
Map&lt;Boolean, List&lt;Employee&gt;&gt; partitioned = employees.stream()
    .collect(Collectors.partitioningBy(e -> e.getSalary() > 80000));</code></pre>
      </div>

      <h2>Downstream Collectors (Nested Operations)</h2>
      <p>Both <code>groupingBy</code> and <code>partitioningBy</code> take an optional second parameter: a <strong>downstream collector</strong>. This dictates how to collect the elements <em>within</em> each bucket. If omitted, it defaults to <code>toList()</code>.</p>

      <div class="code-block">
        <div class="code-header"><span>Downstream.java</span></div>
        <pre><code>// 1. Group by Dept, but count the employees instead of listing them
Map&lt;String, Long&gt; headcountByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment, 
        Collectors.counting()
    ));

// 2. Group by Dept, but get average salary per dept
Map&lt;String, Double&gt; avgSalaryByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment, 
        Collectors.averagingDouble(Employee::getSalary)
    ));

// 3. Multi-level grouping: Group by Dept, THEN group by Role
Map&lt;String, Map&lt;String, List&lt;Employee&gt;&gt;&gt; deptThenRole = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.groupingBy(Employee::getRole)
    ));</code></pre>
      </div>

      <h2>The reduce() Operation: Deep Dive</h2>
      <p>While <code>collect()</code> accumulates elements into a container, <code>reduce()</code> combines all elements into a single value. It is a terminal operation.</p>

      <h3>reduce() with Identity and Accumulator</h3>
      <div class="code-block">
        <div class="code-header"><span>ReduceExamples.java</span></div>
        <pre><code>// Sum all salaries using reduce
double totalSalary = employees.stream()
    .map(Employee::getSalary)
    .reduce(0.0, Double::sum);
// Identity = 0.0 (starting value)
// Accumulator = Double::sum (adds each element to running total)

// Without identity — returns Optional (stream might be empty)
Optional&lt;Double&gt; maxSalary = employees.stream()
    .map(Employee::getSalary)
    .reduce(Double::max);

// Concatenate all employee names
String allNames = employees.stream()
    .map(Employee::getName)
    .reduce("", (a, b) -&gt; a.isEmpty() ? b : a + ", " + b);</code></pre>
      </div>

      <h3>reduce() vs collect()</h3>
      <table class="compare-table">
        <tr><th>Feature</th><th>reduce()</th><th>collect()</th></tr>
        <tr><td><strong>Purpose</strong></td><td>Combine into single immutable value</td><td>Accumulate into a mutable container</td></tr>
        <tr><td><strong>Result</strong></td><td>Single value (int, double, String)</td><td>Collection, Map, or complex structure</td></tr>
        <tr><td><strong>Example</strong></td><td>Sum, max, min, concatenation</td><td>toList(), groupingBy(), toMap()</td></tr>
      </table>

      <div class="callout"><strong>Rule of thumb:</strong> Use <code>reduce()</code> when you want a single combined value. Use <code>collect()</code> when you want a collection, map, or complex structure.</div>

      <div class="mistake-box">
        <h3>Mistake: toMap with Duplicate Keys</h3>
        <p><strong>Incorrect:</strong></p>
        <pre><code>// Fails if two employees are in the same department!
Map&lt;String, Employee&gt; deptMap = employees.stream()
    .collect(Collectors.toMap(Employee::getDepartment, e -&gt; e));</code></pre>
        <p><strong>Fix:</strong> Use a merge function to decide what to do on collision, or use <code>groupingBy</code> if you want a List of employees per key.</p>
        <pre><code>// Keep the first one found
Map&lt;String, Employee&gt; deptMap = employees.stream()
    .collect(Collectors.toMap(
        Employee::getDepartment, 
        e -&gt; e, 
        (existing, replacement) -&gt; existing
    ));</code></pre>
      </div>

      <h2>Interview Questions</h2>
      <details>
        <summary>Q: groupingBy vs partitioningBy?</summary>
        <p><code>groupingBy</code> classifies elements into a Map using any object as a key (e.g., Department). <code>partitioningBy</code> is a special case that strictly uses a Predicate, returning a Map with exactly two boolean keys: <code>true</code> and <code>false</code>.</p>
      </details>
      <details>
        <summary>Q: What does reduce() do?</summary>
        <p><code>reduce()</code> repeatedly combines elements of a stream into a single summary result (like a sum, max, or concatenated string) using an accumulator function.</p>
      </details>
      <details>
        <summary>Q: How does toMap handle duplicates?</summary>
        <p>By default, <code>Collectors.toMap</code> throws an <code>IllegalStateException</code> if multiple elements map to the same key. You must provide a merge function to resolve collisions.</p>
      </details>

      <div class="practice-section">
        <h3>Practice</h3>
        <p>Write a collector pipeline to group employees by department and find the highest-paid employee in each department.</p>
        <details>
          <summary>Show Solution</summary>
          <pre><code>Map&lt;String, Optional&lt;Employee&gt;&gt; topEarners = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary))
    ));</code></pre>
        </details>
      </div>

      <div class="execution-trace">
        <h4>Execution Trace: groupingBy with downstream collector</h4>
        <ol>
          <li>The stream starts processing elements.</li>
          <li>For each element, the <code>groupingBy</code> classifier function computes the key (Department).</li>
          <li>The element is passed to the downstream collector (e.g., <code>counting()</code>) associated with that key.</li>
          <li>After all elements are processed, a map of keys to collected results is returned.</li>
        </ol>
      </div>

      <div class="callout">
        <strong>Real-World Use:</strong> Grouping is widely used to generate analytical reports, such as breaking down total sales by region, or finding the average response time grouped by API endpoint.
      </div>

      <div class="mistake-box">
        <h3>Debugging Exercise: Forgetting Terminal Operation</h3>
        <p><strong>Problem:</strong> You write a long stream pipeline, but nothing happens and no data is printed.</p>
        <p><strong>Solution:</strong> Check the end of your pipeline. Intermediate operations are lazy! You must add a terminal operation like <code>collect()</code>, <code>reduce()</code>, or <code>forEach()</code> to execute the pipeline.</p>
      </div>

    `
  },
  {
    id: "optional-advanced",
    phase: 5,
    title: "Optional Best Practices",
    icon: "📦",
    level: "Advanced",
    minutes: 40,
    description: "Eliminate NullPointerExceptions using java.util.Optional to safely handle presence or absence of values.",
    objectives: [
      "Understand the motivation behind Optional and the 'Billion Dollar Mistake'.",
      "Create Optional objects correctly (of, ofNullable, empty).",
      "Safely extract values using orElse, orElseGet, and orElseThrow.",
      "Transform Optionals using map and flatMap.",
      "Apply Optional best practices (where to use it, where NOT to use it)."
    ],
    content: `
      <h2>The Problem: The Billion Dollar Mistake (Null)</h2>
      <p>Tony Hoare, the inventor of the null reference, called it his "billion-dollar mistake." Returning <code>null</code> to indicate "no result found" forces the caller to do a null-check. If they forget, a <code>NullPointerException (NPE)</code> occurs at runtime.</p>

      <div class="code-block">
        <div class="code-header"><span>OldWay.java</span></div>
        <pre><code>public Employee findEmployee(int id) {
    // ... search DB
    return null; // Might return null if not found
}

// Caller code
Employee e = findEmployee(10);
// DANGER: If we forget if (e != null), NPE!
System.out.println(e.getName()); </code></pre>
      </div>
      <div class="output-box">Exception in thread "main" java.lang.NullPointerException</div>

      <h2>Introducing Optional</h2>
      <p><code>java.util.Optional&lt;T&gt;</code> is a container object that may or may not contain a non-null value. It acts as an explicit, type-safe API contract saying: <em>"Hey caller, I might not have a value for you, deal with it!"</em></p>

      <h3>Creating Optionals</h3>
      <div class="code-block">
        <pre><code>// 1. Empty Optional
Optional&lt;Employee&gt; emptyOpt = Optional.empty();

// 2. Optional containing a known non-null value (throws NPE if null is passed!)
Optional&lt;Employee&gt; opt1 = Optional.of(new Employee());

// 3. Optional that might be null (safest, most common)
Employee fromDb = getFromDb();
Optional&lt;Employee&gt; opt2 = Optional.ofNullable(fromDb);</code></pre>
      </div>

      <h3>Consuming Optionals Safely</h3>
      <p>How do we get the value out? Avoid using <code>.get()</code> directly, as it throws <code>NoSuchElementException</code> if empty.</p>

      <div class="code-block">
        <pre><code>Optional&lt;Employee&gt; opt = findEmployeeOpt(10);

// 1. orElse: Provide a default value
Employee e1 = opt.orElse(new Employee("Default"));

// 2. orElseGet: Lazy default (better for expensive default creations)
Employee e2 = opt.orElseGet(() -> createExpensiveDefaultEmployee());

// 3. orElseThrow: Throw a specific exception if absent
Employee e3 = opt.orElseThrow(() -> new EmployeeNotFoundException(10));

// 4. ifPresent: Do something only if value is there (Consumer)
opt.ifPresent(e -> System.out.println(e.getName()));

// 5. ifPresentOrElse (Java 9+): Do A if present, B if empty
opt.ifPresentOrElse(
    e -> System.out.println(e.getName()),
    () -> System.out.println("Not found!")
);</code></pre>
      </div>
      <div class="output-box">Alice
Not found!</div>

      <h2>Transforming Optionals (map and flatMap)</h2>
      <p>Just like Streams, you can map values inside an Optional without extracting them first. If the Optional is empty, map does nothing and returns an empty Optional.</p>

      <div class="code-block">
        <pre><code>// Goal: Find employee 10, get their manager, get manager's name.
// Without Optional: lots of null checks.

// With Optional:
String managerName = findEmployeeOpt(10)          // Optional&lt;Employee&gt;
    .map(Employee::getManager)                    // Optional&lt;Manager&gt; (assuming getManager returns Manager)
    .map(Manager::getName)                        // Optional&lt;String&gt;
    .map(String::toUpperCase)                     // Optional&lt;String&gt;
    .orElse("NO MANAGER FOUND");                  // String</code></pre>
      </div>

      <div class="callout">
        <strong>map vs flatMap:</strong> If your method returns an object (e.g., <code>String</code>), use <code>map</code>. If your method returns an <code>Optional</code> (e.g., <code>public Optional&lt;Manager&gt; getManager()</code>), use <code>flatMap</code> to prevent getting an <code>Optional&lt;Optional&lt;Manager&gt;&gt;</code>.
      </div>

      <h2>Best Practices and Anti-Patterns</h2>
      <p>Optional was designed primarily as a <strong>return type</strong> for methods. Do not overuse it.</p>

      <div class="mistake-box">
        <h3>Anti-Pattern 1: Optional as a Field</h3>
        <p><strong>Incorrect:</strong> <code>class Employee { Optional&lt;Manager&gt; manager; }</code></p>
        <p><strong>Fix:</strong> Optional is not Serializable. Keep fields as standard nullable references, and return Optional from the getter: <code>public Optional&lt;Manager&gt; getManager() { return Optional.ofNullable(manager); }</code></p>
      </div>

      <div class="mistake-box">
        <h3>Anti-Pattern 2: Optional as a Parameter</h3>
        <p><strong>Incorrect:</strong> <code>public void setName(Optional&lt;String&gt; name)</code></p>
        <p><strong>Fix:</strong> This forces callers to wrap values in Optionals. Just use standard method overloading or standard null checks inside the method.</p>
      </div>
      
      <div class="mistake-box">
        <h3>Anti-Pattern 3: Optional in Collections</h3>
        <p><strong>Incorrect:</strong> <code>List&lt;Optional&lt;Employee&gt;&gt; list = ...</code></p>
        <p><strong>Fix:</strong> A collection should either contain the item or not contain it. Filter out nulls/absences before putting them in the list. Use <code>List&lt;Employee&gt;</code>.</p>
      </div>
    `
  }
];
