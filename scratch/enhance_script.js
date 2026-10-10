const fs = require('fs');
const path = 'C:/Users/sivad/Desktop/java-learning-platform/data/topics-phase6-7.js';
let content = fs.readFileSync(path, 'utf8');

const enhancements = {
  'employee-management-project': `
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
  `,
  'contact-manager-project': `
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
  `,
  'billing-calculator': `
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
  `,
  'sorting-exercises': `
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
  `,
  'oop-collection-exercises': `
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
  `,
  'debugging-skills': `
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
  `,
  'clean-code': `
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
  `,
  'testing-basics': `
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
};

for (const [id, additionalContent] of Object.entries(enhancements)) {
  const regex = new RegExp("(id:\\s*'" + id + "'[\\s\\S]*?content:\\s*`)([\\s\\S]*?)(`\\s*\\},?)");
  content = content.replace(regex, (match, p1, p2, p3) => {
    return p1 + p2 + additionalContent + p3;
  });
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done');
