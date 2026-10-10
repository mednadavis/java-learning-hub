window.JAVAPATH_PHASE3_TOPICS = [
  {
    id: 'strings',
    phase: 3,
    title: 'Strings in Java',
    icon: 'S',
    level: 'Beginner',
    minutes: 45,
    description: 'Learn how to create, manipulate, and compare text in Java efficiently.',
    objectives: [
      'Understand String creation and the String Pool',
      'Learn why Strings are immutable',
      'Master the difference between == and .equals()',
      'Use common String methods for text manipulation',
      'Process Employee names using String methods'
    ],
    content: `
      <h2>1. What is a String?</h2>
      <p>In Java, a <code>String</code> is an object that represents a sequence of characters. It is not a primitive data type like <code>int</code> or <code>char</code>, although it is often used as if it were. Think of a String as a word or a sentence, basically any text you want to process in your program.</p>
      
      <h2>2. Why do we need it?</h2>
      <p>Without Strings, you would have to manage text as arrays of characters (<code>char[] name = {'J', 'o', 'h', 'n'};</code>). Strings provide a clean way to store text and offer a rich set of built-in methods to manipulate that text, like finding the length, searching for substrings, or changing case.</p> 
      <div class="callout"><strong>Performance Tip:</strong> Always use StringBuilder when concatenating strings in a loop!</div>
      
      <h2>3. Syntax and Rules</h2>
      <div class="callout"><strong>Best Practice:</strong> Only catch exceptions you can actually handle. Otherwise, throw them up the chain.</div>
      <h3>String Creation: Literal vs. New</h3>
      <div class="code-block">
        <div class="code-header"><span>StringCreation.java</span></div>
        <pre><code>// 1. String Literal (Recommended)
String empName1 = "Alice";
String empName2 = "Alice";

// 2. Using the 'new' keyword
String empName3 = new String("Alice");</code></pre>
      </div>
      <div class="output-box">// Memory allocated, no console output</div>
      
      <h3>The String Pool (Diagram concept)</h3>
      <p>When you create a String using a literal (<code>"Alice"</code>), Java looks in a special memory area called the <strong>String Pool</strong>. If "Alice" already exists, it returns a reference to the existing instance. If not, it creates a new one. This saves memory. When you use <code>new String("Alice")</code>, Java always creates a brand new object in standard heap memory, bypassing the String Pool.</p>
      
      <h3>String Immutability</h3>
      <p>Strings in Java are <strong>immutable</strong>. This means once a String object is created, its value cannot be changed. When you think you are changing a String, you are actually creating a completely new String object.</p>
      <div class="code-block"><pre><code>String dept = "IT";
dept = dept.concat(" Department"); // Creates a new string "IT Department" and updates the reference</code></pre></div>
      <div class="output-box">// "IT Department"</div>
      
      <h3>== vs .equals()</h3>
      <div class="callout"><strong>VERY IMPORTANT:</strong> Always use <code>.equals()</code> to compare the content of Strings.</div>
      <ul>
        <li><code>==</code> compares memory references (are they the exact same object in memory?).</li>
        <li><code>.equals()</code> compares the actual text content.</li>
      </ul>
      
      <h2>4. Complete Runnable Example</h2>
      <div class="code-block">
        <div class="code-header"><span>EmployeeStringOps.java</span></div>
        <pre><code>public class EmployeeStringOps {
    public static void main(String[] args) {
        String empNameLiteral = "John Doe";
        String empNameNew = new String("John Doe");
        
        System.out.println("--- Comparison ---");
        System.out.println("empNameLiteral == empNameNew: " + (empNameLiteral == empNameNew));
        System.out.println("empNameLiteral.equals(empNameNew): " + empNameLiteral.equals(empNameNew));
        
        System.out.println("\\n--- String Methods ---");
        System.out.println("Length: " + empNameLiteral.length());
        System.out.println("Uppercase: " + empNameLiteral.toUpperCase());
        System.out.println("Substring: " + empNameLiteral.substring(0, 4));
        System.out.println("Contains 'Doe': " + empNameLiteral.contains("Doe"));
        System.out.println("Starts with 'J': " + empNameLiteral.startsWith("J"));
        System.out.println("Replaced: " + empNameLiteral.replace("John", "Jane"));
        
        String dirtyInput = "   Alice Smith   ";
        System.out.println("Trimmed: '" + dirtyInput.trim() + "'");
        
        String csvData = "Bob,HR,Manager";
        String[] parts = csvData.split(",");
        System.out.println("Department from CSV: " + parts[1]);
        
        String joined = String.join(" - ", "Alice", "IT", "Developer");
        System.out.println("Joined String: " + joined);
    }
}</code></pre>
      </div>
      <div class="output-box">
--- Comparison ---
empNameLiteral == empNameNew: false
empNameLiteral.equals(empNameNew): true

--- String Methods ---
Length: 8
Uppercase: JOHN DOE
Substring: John
Contains 'Doe': true
Starts with 'J': true
Replaced: Jane Doe
Trimmed: 'Alice Smith'
Department from CSV: HR
Joined String: Alice - IT - Developer
      </div>
      
      <h2>5. Line-by-Line Explanation</h2>
      <ul>
        <li><code>empNameLiteral == empNameNew</code>: Returns false because one is in the pool and the other is a fresh object in the heap. They have different memory addresses.</li>
        <li><code>.equals()</code>: Returns true because the actual sequence of characters is identical.</li>
        <li><code>substring(0, 4)</code>: Takes characters from index 0 up to (but not including) index 4.</li>
        <li><code>split(",")</code>: Breaks the string into an array of strings based on the comma delimiter.</li>
      </ul>
      
      <h2>6. Execution Flow</h2>
      <div class="execution-trace">
        1. <code>empNameLiteral</code> created in String Pool.<br>
        2. <code>empNameNew</code> created in Heap.<br>
        3. <code>==</code> evaluates references, resulting in <code>false</code>.<br>
        4. <code>equals()</code> compares characters step-by-step, resulting in <code>true</code>.<br>
        5. <code>toUpperCase()</code> creates and returns a NEW string "JOHN DOE", original remains unchanged.
      </div>
      
      <h2>7. Different Variations</h2>
      <p><strong>String Concatenation:</strong></p>
      <p>You can use the <code>+</code> operator to combine strings. Behind the scenes, the compiler converts this to use StringBuilder.</p>
      <pre><code>String fullName = firstName + " " + lastName;</code></pre>
      
      <h2>8. What happens without it?</h2>
      <p>Without <code>String</code>, text processing would require manual loops over character arrays for every simple operation like finding a letter or changing case, leading to massive amounts of repetitive, bug-prone code.</p>
      
      <h2>9. Advantages, limitations, trade-offs</h2>
      <p><strong>Advantages:</strong> Secure (immutability prevents accidental changes), Memory efficient (String pool reuses literals), Feature-rich API.</p>
      <p><strong>Limitations:</strong> Frequent modifications (like concatenating in a loop) create many temporary objects, leading to high memory usage and garbage collection overhead.</p>
      
      <h2>10. Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake 1: Using == instead of .equals()</h4>
        <pre><code>// Incorrect
if (name == "Alice") { ... }

// Correct
if ("Alice".equals(name)) { ... } // Yoda condition avoids NullPointerException if name is null</code></pre>
      </div>
      <div class="mistake-box">
        <h4>Mistake 2: Forgetting Strings are immutable</h4>
        <pre><code>// Incorrect
String s = "hello";
s.toUpperCase(); // Result is lost!

// Correct
s = s.toUpperCase();</code></pre>
      </div>
      <div class="mistake-box">
        <h4>Mistake 3: NullPointerException with String operations</h4>
        <pre><code>// Incorrect
String name = null;
if (name.equals("Bob")) { ... } // Throws NullPointerException

// Correct
if ("Bob".equals(name)) { ... }</code></pre>
      </div>
      
      <h2>11. Related Concepts Comparison Table</h2>
      <table class="compare-table">
        <tr><th>Concept</th><th>Memory Area</th><th>Creation Method</th><th>Comparison</th></tr>
        <tr><td>String Literal</td><td>String Pool</td><td><code>"Text"</code></td><td>Memory reused if exists</td></tr>
        <tr><td>new String()</td><td>Heap</td><td><code>new String("Text")</code></td><td>Always creates new object</td></tr>
      </table>
      
      <h2>12. Real-World Applications</h2>
      <p>Processing user inputs, parsing configuration files, extracting data from CSV formats, formatting employee names for reports, searching and filtering records based on text.</p>
      
      <h2>13. Interview Preparation</h2>
      <p><strong>Q: Why are strings immutable in Java?</strong><br>
      A: For security (e.g., database URLs can't be changed), thread safety (can be shared across threads without synchronization), and to enable the String Pool for memory optimization.</p>
      <p><strong>Q: What is the difference between String, StringBuilder, and StringBuffer?</strong><br>
      A: String is immutable. StringBuilder is mutable but not thread-safe (faster). StringBuffer is mutable and thread-safe (slower).</p>
      
      <h2>14. Practice Questions</h2>
      <div class="practice-section">
        <p><strong>Q1:</strong> Write a method to reverse a given String manually without using StringBuilder.</p>
        <details><summary>Show Solution</summary>
        <pre><code>public String reverse(String input) {
    String result = "";
    for (int i = input.length() - 1; i >= 0; i--) {
        result += input.charAt(i);
    }
    return result;
}</code></pre>
        </details>
      </div>
      <div class="practice-section"><h3>Output Prediction Challenge</h3>
<p>What does this code print?</p>
<div class="code-block"><pre><code>String a = "Java";
String b = "Java";
System.out.println(a == b);</code></pre></div>
<details><summary>Show Answer</summary><p>true. Because string literals are pooled.</p></details>
</div>
      <div class="practice-section"><h3>Find the Bug</h3>
<p>This code has a problem. Can you find it?</p>
<div class="code-block"><pre><code>String name;
if(name.equals("John")) {
    System.out.println("Hi");
}</code></pre></div>
<details><summary>Show Answer</summary><p>The bug is a NullPointerException because name is uninitialized (null). The fix is to use "John".equals(name).</p></details>
</div>
    `
  },
  {
    id: 'stringbuilder-buffer',
    phase: 3,
    title: 'StringBuilder and StringBuffer',
    icon: 'B',
    level: 'Beginner',
    minutes: 30,
    description: 'Master mutable strings for efficient text manipulation and high-performance applications.',
    objectives: [
      'Understand the performance impact of String concatenation',
      'Learn how StringBuilder works',
      'Compare StringBuilder and StringBuffer',
      'Use common methods like append, insert, delete'
    ],
    content: `
      <h2>1. What is it?</h2>
      <p><code>StringBuilder</code> and <code>StringBuffer</code> are classes in Java used to create mutable (modifiable) sequences of characters. Unlike <code>String</code>, when you modify a StringBuilder/Buffer, it changes the existing object rather than creating a new one.</p>
      
      <h2>2. Why do we need it?</h2>
      <p>When you concatenate strings in a loop using the <code>+</code> operator, Java creates a new String object for every single iteration. This is highly inefficient in terms of memory and performance. <code>StringBuilder</code> solves this by modifying a single internal array of characters.</p>
      
      <h2>3. Syntax and Rules</h2>
      <div class="code-block">
        <pre><code>StringBuilder sb = new StringBuilder("Employee");
sb.append(" Name"); // Modifies the same object
System.out.println(sb.toString()); // Convert back to String</code></pre>
      </div>
      <div class="output-box">Employee Name</div>
      
      <h2>4. Complete Runnable Example</h2>
      <div class="code-block">
        <div class="code-header"><span>ReportBuilder.java</span></div>
        <pre><code>public class ReportBuilder {
    public static void main(String[] args) {
        String[] employees = {"Alice", "Bob", "Charlie", "David"};
        
        // Using StringBuilder for building a long string
        StringBuilder report = new StringBuilder();
        
        report.append("Employee Report\\n");
        report.append("===============\\n");
        
        for(int i = 0; i < employees.length; i++) {
            report.append((i+1)).append(". ").append(employees[i]).append("\\n");
        }
        
        report.insert(0, "CONFIDENTIAL\\n");
        report.delete(13, 29); // Removes "Employee Report\\n"
        
        System.out.println(report.toString());
        
        // Reversing
        StringBuilder code = new StringBuilder("XYZ-987");
        System.out.println("Reversed Code: " + code.reverse());
    }
}</code></pre>
      </div>
      <div class="output-box">
CONFIDENTIAL
===============
1. Alice
2. Bob
3. Charlie
4. David

Reversed Code: 789-ZYX
      </div>
      
      <h2>5. Line-by-Line Explanation</h2>
      <ul>
        <li><code>StringBuilder report = new StringBuilder();</code>: Creates an empty builder with an initial capacity.</li>
        <li><code>report.append(...)</code>: Adds text to the end of the existing builder. Notice we chain <code>.append()</code> calls.</li>
        <li><code>report.insert(0, "...")</code>: Inserts text at the specified index (0 means the very beginning).</li>
        <li><code>report.toString()</code>: Converts the final modified sequence into a standard, immutable String object.</li>
      </ul>
      
      <h2>6. Execution Flow</h2>
      <div class="execution-trace">
        1. <code>StringBuilder</code> allocates an internal char array (e.g., size 16).<br>
        2. <code>append()</code> adds characters. If the array is full, it automatically creates a larger array and copies the contents.<br>
        3. All modifications happen on this single array, avoiding the creation of intermediate String objects.
      </div>
      
      <h2>7. Different Variations</h2>
      <p><strong>StringBuffer:</strong> Works exactly like StringBuilder, but all its methods are <code>synchronized</code>. This means it is thread-safe (multiple threads can safely use it concurrently), but it is slower due to the synchronization overhead.</p>
      
      <h2>8. What happens without it?</h2>
      <pre><code>// Inefficient loop concatenation
String report = "";
for(int i=0; i&lt;1000; i++) {
    report += i + ", "; // Creates 1000 new String objects!
}</code></pre>
      
      <h2>9. Advantages, limitations, trade-offs</h2>
      <p><strong>Advantages:</strong> Massive performance boost for heavy string manipulation.</p>
      <p><strong>Trade-offs:</strong> <code>StringBuilder</code> is not thread-safe. You must remember to call <code>toString()</code> when you need an actual <code>String</code>.</p>
      
      <h2>10. Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake 1: Comparing StringBuilders with .equals()</h4>
        <pre><code>// Incorrect
StringBuilder sb1 = new StringBuilder("A");
StringBuilder sb2 = new StringBuilder("A");
System.out.println(sb1.equals(sb2)); // false! StringBuilder does not override equals()

// Correct
System.out.println(sb1.toString().equals(sb2.toString())); // true</code></pre>
      </div>
      <div class="mistake-box">
        <h4>Mistake 2: Unnecessary conversion</h4>
        <pre><code>// Incorrect
sb.append(myString.toString()); // myString is already a String

// Correct
sb.append(myString);</code></pre>
      </div>
      
      <h2>11. Related Concepts Comparison Table</h2>
      <table class="compare-table">
        <tr><th>Class</th><th>Mutable?</th><th>Thread-Safe?</th><th>Performance</th></tr>
        <tr><td>String</td><td>No</td><td>Yes (implicit)</td><td>Fast for read, Slow for heavy modify</td></tr>
        <tr><td>StringBuilder</td><td>Yes</td><td>No</td><td>Fastest for modification</td></tr>
        <tr><td>StringBuffer</td><td>Yes</td><td>Yes</td><td>Slower than Builder, faster than String</td></tr>
      </table>
      
      <h2>12. Real-World Applications</h2>
      <p>Generating XML or JSON payloads manually, constructing complex SQL queries dynamically, building large log messages, reading large files line by line into memory.</p>
      
      <h2>13. Interview Preparation</h2>
      <p><strong>Q: When would you use StringBuffer over StringBuilder?</strong><br>
      A: Only when a single string buffer is being updated simultaneously by multiple threads. In almost all normal use cases, StringBuilder is preferred for better performance.</p>
      
      <h2>14. Practice Questions</h2>
      <div class="practice-section">
        <p><strong>Q1:</strong> Use a StringBuilder to take an array of words and create a single comma-separated string.</p>
        <details><summary>Show Solution</summary>
        <pre><code>String[] words = {"Java", "is", "awesome"};
StringBuilder sb = new StringBuilder();
for (int i = 0; i &lt; words.length; i++) {
    sb.append(words[i]);
    if (i &lt; words.length - 1) {
        sb.append(",");
    }
}
System.out.println(sb.toString());</code></pre>
        </details>
      </div>
      <div class="practice-section"><h3>Output Prediction Challenge</h3>
<p>What does this code print?</p>
<div class="code-block"><pre><code>StringBuilder sb = new StringBuilder("Hi");
sb.append(" There");
System.out.println(sb.length());</code></pre></div>
<details><summary>Show Answer</summary><p>8. "Hi There" has 8 characters.</p></details>
</div>
      <div class="practice-section"><h3>Find the Bug</h3>
<p>This code has a problem. Can you find it?</p>
<div class="code-block"><pre><code>StringBuilder sb = "Hello";
sb.append(" World");</code></pre></div>
<details><summary>Show Answer</summary><p>The bug is assigning a String literal to a StringBuilder. The fix is StringBuilder sb = new StringBuilder("Hello");</p></details>
</div>
    `
  },
  {
    id: 'dates-time',
    phase: 3,
    title: 'Dates and Time API',
    icon: 'T',
    level: 'Intermediate',
    minutes: 40,
    description: 'Work with dates and times cleanly using the modern java.time package.',
    objectives: [
      'Understand why the old Date API was replaced',
      'Use LocalDate and LocalDateTime',
      'Format and parse dates using DateTimeFormatter',
      'Perform date arithmetic safely',
      'Understand Period and Duration'
    ],
    content: `
      <h2>1. What is it?</h2>
      <p>The <code>java.time</code> package (introduced in Java 8) provides modern, safe, and intuitive classes for handling dates, times, durations, and timezones. The core classes are <code>LocalDate</code> (just a date: 2023-10-25) and <code>LocalDateTime</code> (date and time: 2023-10-25T14:30:00).</p>
      
      <h2>2. Why do we need it?</h2>
      <p>Before Java 8, we used <code>java.util.Date</code> and <code>java.util.Calendar</code>. They were terrible. They were mutable (causing thread-safety bugs), indexed months from 0 instead of 1 (January was 0), and had confusing APIs. The new API is immutable, thread-safe, and clear.</p>
      
      <h2>3. Syntax and Rules</h2>
      <h3>Creating Dates</h3>
      <div class="code-block">
        <pre><code>LocalDate today = LocalDate.now();
LocalDate hireDate = LocalDate.of(2022, 5, 15); // Year, Month, Day</code></pre>
      </div>
      <div class="output-box">// Dates created, no output</div>
      
      <h3>Formatting and yyyy vs YYYY (CRITICAL)</h3>
      <div class="callout"><strong>CRITICAL:</strong> Always use lowercase <code>yyyy</code> for the year. Uppercase <code>YYYY</code> means "week-based year" and will give you the WRONG year around the end of December/early January!</div>
      <div class="code-block">
        <pre><code>DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");</code></pre>
      </div>
      <div class="output-box">// Formatter created</div>
      
      <h2>4. Complete Runnable Example</h2>
      <div class="code-block">
        <div class="code-header"><span>EmployeeTime.java</span></div>
        <pre><code>import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class EmployeeTime {
    public static void main(String[] args) {
        // 1. Current Date and Time
        LocalDate today = LocalDate.now();
        System.out.println("Today is: " + today);
        
        // 2. Specific Date
        LocalDate joinDate = LocalDate.of(2018, 8, 20);
        System.out.println("Employee joined on: " + joinDate);
        
        // 3. Date Arithmetic
        LocalDate probEnd = joinDate.plusMonths(6);
        System.out.println("Probation ended on: " + probEnd);
        
        // 4. Parsing a String to Date
        String inputDate = "15-03-2023";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate parsedDate = LocalDate.parse(inputDate, formatter);
        
        // 5. Formatting Date to String
        DateTimeFormatter outFormat = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        System.out.println("Formatted string: " + parsedDate.format(outFormat));
        
        // 6. Period (Difference in dates)
        Period tenure = Period.between(joinDate, today);
        System.out.println("Tenure: " + tenure.getYears() + " years, " + tenure.getMonths() + " months.");
        
        // 7. LocalDateTime
        LocalDateTime loginTime = LocalDateTime.now();
        System.out.println("Login timestamp: " + loginTime);
    }
}</code></pre>
      </div>
      <div class="output-box">
Today is: (Current Date)
Employee joined on: 2018-08-20
Probation ended on: 2019-02-20
Formatted string: Mar 15, 2023
Tenure: 5 years, X months.
Login timestamp: (Current DateTime)
      </div>
      
      <h2>5. Line-by-Line Explanation</h2>
      <ul>
        <li><code>LocalDate.of(2018, 8, 20)</code>: Creates a specific date. Note that 8 means August (not September like the old API).</li>
        <li><code>plusMonths(6)</code>: Returns a NEW LocalDate object 6 months in the future. The original <code>joinDate</code> is unchanged.</li>
        <li><code>Period.between()</code>: Calculates the exact difference in years, months, and days between two LocalDates.</li>
      </ul>
      
      <h2>6. Execution Flow</h2>
      <div class="execution-trace">
        1. <code>DateTimeFormatter.ofPattern</code> compiles the pattern string into a format object.<br>
        2. <code>LocalDate.parse</code> uses the formatter to read the string character by character and construct a date.<br>
        3. Calculations like <code>plusMonths</code> handle leap years and differing month lengths automatically (e.g., Jan 31 + 1 month = Feb 28/29).
      </div>
      
      <h2>7. Different Variations</h2>
      <p><strong>Duration:</strong> While <code>Period</code> is for date differences (years, months, days), <code>Duration</code> is for time differences (hours, minutes, seconds).</p>
      <pre><code>Duration shiftLength = Duration.between(startTime, endTime);</code></pre>
      
      <h2>8. What happens without it?</h2>
      <p>You would have to use <code>java.util.Calendar</code>, which requires verbose code, magic numbers (Calendar.MONTH), and manual synchronization if shared between threads.</p>
      
      <h2>9. Advantages, limitations, trade-offs</h2>
      <p><strong>Advantages:</strong> Immutable, thread-safe, domain-driven design (a date without time is explicitly a LocalDate, avoiding timezone confusion).</p>
      <p><strong>Limitations:</strong> Interacting with legacy code requires conversions back to <code>java.util.Date</code>.</p>
      
      <h2>10. Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake 1: Using YYYY instead of yyyy</h4>
        <pre><code>// Incorrect: YYYY gives the week-based year
DateTimeFormatter f = DateTimeFormatter.ofPattern("dd-MM-YYYY"); 
// Dec 31, 2023 might format as Dec 31, 2024!

// Correct
DateTimeFormatter f = DateTimeFormatter.ofPattern("dd-MM-yyyy");</code></pre>
      </div>
      <div class="mistake-box">
        <h4>Mistake 2: Forgetting immutability</h4>
        <pre><code>// Incorrect
LocalDate d = LocalDate.now();
d.plusDays(5); // The result is lost!

// Correct
d = d.plusDays(5);</code></pre>
      </div>
      <div class="mistake-box">
        <h4>Mistake 3: Parsing with wrong pattern</h4>
        <pre><code>// Error: DateTimeParseException
LocalDate.parse("2023/10/25", DateTimeFormatter.ofPattern("yyyy-MM-dd")); 

// Correct: Pattern must match input exactly
LocalDate.parse("2023/10/25", DateTimeFormatter.ofPattern("yyyy/MM/dd"));</code></pre>
      </div>
      
      <h2>11. Related Concepts Comparison Table</h2>
      <table class="compare-table">
        <tr><th>Class</th><th>Stores Date?</th><th>Stores Time?</th><th>Use Case</th></tr>
        <tr><td>LocalDate</td><td>Yes</td><td>No</td><td>Birthdays, Joining Dates, Deadlines</td></tr>
        <tr><td>LocalTime</td><td>No</td><td>Yes</td><td>Shift timings, Alarm clocks</td></tr>
        <tr><td>LocalDateTime</td><td>Yes</td><td>Yes</td><td>Timestamps, Audit logs, Event schedules</td></tr>
      </table>
      
      <h2>12. Real-World Applications</h2>
      <p>Calculating employee payroll periods, verifying age limits, scheduling future tasks, recording precise audit logs for database changes.</p>
      
      <h2>13. Interview Preparation</h2>
      <p><strong>Q: Why is java.time better than java.util.Date?</strong><br>
      A: It is immutable, thread-safe, has fluent APIs for calculations, clear separation of Date/Time concepts, and sane indexing (months start at 1).</p>
      
      <h2>14. Practice Questions</h2>
      <div class="practice-section">
        <p><strong>Q1:</strong> Write code to find out what date it will be exactly 90 days from today.</p>
        <details><summary>Show Solution</summary>
        <pre><code>LocalDate future = LocalDate.now().plusDays(90);
System.out.println(future);</code></pre>
        </details>
      </div>
      <div class="practice-section"><h3>Output Prediction Challenge</h3>
<p>What does this code print?</p>
<div class="code-block"><pre><code>LocalDate d = LocalDate.of(2020, 1, 31);
System.out.println(d.plusMonths(1));</code></pre></div>
<details><summary>Show Answer</summary><p>2020-02-29. Leap year is handled automatically.</p></details>
</div>
      <div class="practice-section"><h3>Find the Bug</h3>
<p>This code has a problem. Can you find it?</p>
<div class="code-block"><pre><code>LocalDate d = LocalDate.now();
d.plusDays(10);
System.out.println(d);</code></pre></div>
<details><summary>Show Answer</summary><p>The bug is LocalDate is immutable. The fix is d = d.plusDays(10);</p></details>
</div>
    `
  },
  {
    id: 'exception-handling',
    phase: 3,
    title: 'Exception Handling',
    icon: 'E',
    level: 'Intermediate',
    minutes: 60,
    description: 'Learn how to handle runtime errors gracefully and create robust applications.',
    objectives: [
      'Understand the Exception Hierarchy',
      'Master try, catch, and finally blocks',
      'Distinguish between Checked and Unchecked exceptions',
      'Learn to use throw and throws',
      'Create custom Exception classes'
    ],
    content: `
      <h2>1. What is it?</h2>
      <p>An Exception is an unwanted or unexpected event occurring during the execution of a program (runtime) that disrupts the normal flow of instructions. Exception handling is the mechanism to handle these runtime errors so the normal application flow can be maintained.</p>
      
      <h2>2. Why do we need it?</h2>
      <p>If a program tries to open a file that doesn't exist, or divide a number by zero, the program will crash immediately. Exception handling allows us to "catch" the error, show a friendly message to the user, log the error, and continue running.</p>
      
      <h2>3. Syntax and Rules</h2>
      <h3>try-catch-finally</h3>
      <div class="code-block">
        <pre><code>try {
    // Code that might throw an exception
} catch (SpecificException e) {
    // Code to handle the exception
} finally {
    // Code that ALWAYS runs, regardless of exception (used for cleanup)
}</code></pre>
      </div>
      <div class="output-box">// Output depends on whether exception is thrown</div>
      
      <h3>Checked vs Unchecked</h3>
      <ul>
        <li><strong>Checked Exceptions:</strong> Checked at compile-time (e.g., <code>IOException</code>). The compiler forces you to handle them using try-catch or <code>throws</code>.</li>
        <li><strong>Unchecked Exceptions:</strong> Subclasses of <code>RuntimeException</code> (e.g., <code>NullPointerException</code>, <code>ArithmeticException</code>). Not checked at compile-time. Usually indicate programming logic errors.</li>
      </ul>
      
      <h2>4. Complete Runnable Example</h2>
      <div class="code-block">
        <div class="code-header"><span>EmployeeValidator.java</span></div>
        <pre><code>// Custom Exception
class InvalidSalaryException extends Exception {
    public InvalidSalaryException(String message) {
        super(message);
    }
}

public class EmployeeValidator {
    
    // Using 'throws' to declare that this method might throw an exception
    public static void validateSalary(double salary) throws InvalidSalaryException {
        if (salary &lt; 0) {
            // Using 'throw' to explicitly throw an exception object
            throw new InvalidSalaryException("Salary cannot be negative: " + salary);
        }
        System.out.println("Salary validated successfully.");
    }
    
    public static void main(String[] args) {
        double empSalary = -5000;
        
        try {
            System.out.println("Starting validation...");
            validateSalary(empSalary);
            System.out.println("This line will NOT print if exception occurs.");
            
        } catch (InvalidSalaryException e) {
            // Handling our custom exception
            System.err.println("Validation Error: " + e.getMessage());
            
        } catch (Exception e) {
            // Catching any other unexpected exceptions
            System.err.println("General Error: " + e.getMessage());
            
        } finally {
            // Always executes
            System.out.println("Validation process completed.");
        }
    }
}</code></pre>
      </div>
      <div class="output-box">
Starting validation...
Validation Error: Salary cannot be negative: -5000.0
Validation process completed.
      </div>
      
      <h2>5. Line-by-Line Explanation</h2>
      <ul>
        <li><code>class InvalidSalaryException extends Exception</code>: Creates a custom checked exception.</li>
        <li><code>throws InvalidSalaryException</code>: Warns the caller of <code>validateSalary</code> that they must handle this exception.</li>
        <li><code>throw new InvalidSalaryException(...)</code>: Actually creates and triggers the exception event.</li>
        <li><code>catch (InvalidSalaryException e)</code>: Captures the specific exception.</li>
        <li><code>finally</code>: Executes whether the try block succeeded or failed. Perfect for closing files or database connections.</li>
      </ul>
      
      <h2>6. Execution Flow</h2>
      <div class="execution-trace">
        1. Execution enters <code>try</code> block.<br>
        2. <code>validateSalary</code> is called.<br>
        3. Inside method, condition <code>salary &lt; 0</code> is true.<br>
        4. Exception is <code>thrown</code>. Execution IMMEDIATELY jumps out of the method.<br>
        5. JVM looks for a matching <code>catch</code> block in the caller.<br>
        6. <code>catch (InvalidSalaryException)</code> matches. Its code runs.<br>
        7. Execution proceeds to <code>finally</code> block.<br>
        8. Program continues normally after the finally block.
      </div>
      
      <h2>7. Different Variations</h2>
      <p><strong>Multiple Catch Blocks:</strong> You can have multiple catch blocks. <strong>Rule:</strong> Always catch the most specific exceptions first, and broader exceptions (like <code>Exception</code>) last.</p>
      <p><strong>try-with-resources:</strong> Automatically closes resources like Scanners or FileReaders without needing a finally block.</p>
      <pre><code>try (Scanner scanner = new Scanner(new File("data.txt"))) {
    // Use scanner
} // Scanner automatically closed here!</code></pre>
      
      <h2>8. What happens without it?</h2>
      <p>Without exception handling, an error like a missing file or bad network connection crashes the entire application, resulting in a stack trace printed to the user and sudden data loss.</p>
      
      <h2>9. Advantages, limitations, trade-offs</h2>
      <p><strong>Advantages:</strong> Separates error-handling code from regular business logic. Prevents crashes.</p>
      <p><strong>Trade-offs:</strong> Throwing exceptions is computationally expensive (it builds a stack trace). Do not use exceptions for normal control flow (e.g., checking if a user has enough balance shouldn't throw an exception, it should return a boolean).</p>
      
      <h2>10. Common Mistakes</h2>
      <div class="mistake-box">
        <h4>Mistake 1: Empty catch block (Swallowing the exception)</h4>
        <pre><code>// Incorrect: Silent failure, incredibly hard to debug
try {
    Integer.parseInt("ABC");
} catch (NumberFormatException e) {
    // Empty!
}

// Correct: Always log or handle it
} catch (NumberFormatException e) {
    System.out.println("Invalid number format provided.");
}</code></pre>
      </div>
      <div class="mistake-box">
        <h4>Mistake 2: Wrong catch order</h4>
        <pre><code>// Incorrect: Won't compile. General Exception catches everything first.
try { ... } 
catch (Exception e) { ... } 
catch (IOException e) { ... } 

// Correct: Specific first
try { ... } 
catch (IOException e) { ... } 
catch (Exception e) { ... }</code></pre>
      </div>
      <div class="mistake-box">
        <h4>Mistake 3: Catching Throwable or Error</h4>
        <pre><code>// Incorrect: Never catch Throwable or Error. Errors like OutOfMemoryError are unrecoverable.
catch (Throwable t) { ... } 

// Correct
catch (Exception e) { ... }</code></pre>
      </div>
      
      <h2>11. Related Concepts Comparison Table</h2>
      <table class="compare-table">
        <tr><th>Keyword</th><th>Usage</th><th>Location</th></tr>
        <tr><td>throw</td><td>Used to explicitly trigger an exception object</td><td>Inside method body</td></tr>
        <tr><td>throws</td><td>Declares that a method might throw exceptions</td><td>Method signature</td></tr>
      </table>
      
      <h2>12. Real-World Applications</h2>
      <p>Handling database connection failures, validating form inputs, dealing with file I/O operations, managing network timeouts gracefully.</p>
      
      <h2>13. Interview Preparation</h2>
      <p><strong>Q: What is the difference between Checked and Unchecked exceptions?</strong><br>
      A: Checked exceptions (Exception and subclasses) are verified by the compiler and must be handled. Unchecked exceptions (RuntimeException and subclasses) are not checked by the compiler and indicate programming logic errors.</p>
      <p><strong>Q: What is the difference between final, finally, and finalize?</strong><br>
      A: <code>final</code> is a keyword for constants. <code>finally</code> is a block in exception handling for cleanup. <code>finalize</code> is a deprecated method related to garbage collection.</p>
      
      <h2>14. Practice Questions</h2>
      <div class="practice-section">
        <p><strong>Q1:</strong> Write a method that divides two integers. Handle the <code>ArithmeticException</code> if the divisor is zero, returning 0 and printing a warning.</p>
        <details><summary>Show Solution</summary>
        <pre><code>public int safeDivide(int a, int b) {
    try {
        return a / b;
    } catch (ArithmeticException e) {
        System.out.println("Warning: Division by zero.");
        return 0;
    }
}</code></pre>
        </details>
      </div>
      <div class="practice-section"><h3>Output Prediction Challenge</h3>
<p>What does this code print?</p>
<div class="code-block"><pre><code>try {
    int a = 10 / 0;
} catch (Exception e) {
    System.out.println("A");
} finally {
    System.out.println("B");
}</code></pre></div>
<details><summary>Show Answer</summary><p>A then B. Exception caught, then finally runs.</p></details>
</div>
      <div class="practice-section"><h3>Find the Bug</h3>
<p>This code has a problem. Can you find it?</p>
<div class="code-block"><pre><code>try {
    // do something
} catch (Exception e) {
} catch (IOException e) {
}</code></pre></div>
<details><summary>Show Answer</summary><p>The bug is catching a broader exception before a specific one. The fix is to catch IOException first.</p></details>
</div>
    `
  }
];
