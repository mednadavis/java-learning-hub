window.JAVAPATH_PHASE4_TOPICS = [
  {
    id: 'collections-overview',
    phase: 4,
    title: 'Collections Framework Overview',
    icon: '📦',
    level: 'Beginner',
    minutes: 30,
    description: 'Introduction to the Java Collections Framework, Generics, and Wrapper Classes.',
    objectives: [
      'Understand the limitations of arrays and why collections are needed',
      'Distinguish between the Collection interface and the Collections utility class',
      'Learn the core Collection hierarchy (List, Set, Queue) and Map',
      'Grasp the basics of Generics and the diamond operator',
      'Understand Wrapper classes and autoboxing/unboxing'
    ],
    content: `
      <h2>The Problem with Arrays</h2>
      <p>Imagine you are building an Employee Management System. You start by storing employees in an array:</p>
      <div class="code-block"><div class="code-header"><span>Company.java</span></div><pre><code>Employee[] employees = new Employee[5];
employees[0] = new Employee("Alice");
// ... fill array ...
</code></pre></div>
      <p>This works, but arrays have major limitations:</p>
      <ul>
        <li><strong>Fixed Size:</strong> What if we hire a 6th employee? We have to create a new, larger array and copy all the elements over.</li>
        <li><strong>No Built-in Methods:</strong> Arrays don't have methods to easily search, sort, or remove elements.</li>
        <li><strong>Type Issues:</strong> Arrays can hold primitives or objects, but manipulating them is manual and error-prone.</li>
      </ul>
      <p>This is where the <strong>Java Collections Framework (JCF)</strong> comes to the rescue. It provides dynamic data structures that automatically grow and shrink, along with powerful methods to manipulate data.</p>
      
      <h2>Collection vs Collections</h2>
      <p>A common point of confusion is the difference between <code>Collection</code> and <code>Collections</code>.</p>
      <ul>
        <li><code>Collection</code>: An <strong>interface</strong>. It is the root interface for most collections (like List, Set, Queue).</li>
        <li><code>Collections</code>: A <strong>utility class</strong>. It contains static methods that operate on or return collections (like sorting, searching).</li>
      </ul>

      <h2>The Collection Hierarchy</h2>
      <p>The JCF is divided into two main branches:</p>
      <ol>
        <li><strong>Collection Interface:</strong> Stores individual elements.
          <ul>
            <li><strong>List:</strong> Ordered, allows duplicates. (e.g., ArrayList, LinkedList)</li>
            <li><strong>Set:</strong> Unordered, no duplicates. (e.g., HashSet, TreeSet)</li>
            <li><strong>Queue:</strong> Ordered, FIFO (First-In, First-Out). (e.g., PriorityQueue)</li>
          </ul>
        </li>
        <li><strong>Map Interface:</strong> Stores key-value pairs. It is <em>not</em> a child of <code>Collection</code>. (e.g., HashMap, TreeMap)</li>
      </ol>
      <table class="compare-table">
        <tr><th>Collection Type</th><th>Ordered?</th><th>Allows Duplicates?</th><th>Use Case</th></tr>
        <tr><td>List</td><td>Yes</td><td>Yes</td><td>When sequence matters or you need index access.</td></tr>
        <tr><td>Set</td><td>No*</td><td>No</td><td>When uniqueness is required (e.g., employee IDs).</td></tr>
        <tr><td>Map</td><td>No*</td><td>Keys: No, Values: Yes</td><td>Looking up data by a key (e.g., ID to Employee object).</td></tr>
      </table>
      <p><small>*Some implementations like TreeSet or TreeMap maintain order.</small></p>

      <h2>Generics: Type Safety with &lt;&gt;</h2>
      <p>Before Java 5, collections stored <code>Object</code>s. This meant you could put an <code>Employee</code> and a <code>String</code> in the same list, which caused errors when you tried to retrieve them.</p>
      <div class="mistake-box">
        <h4>Without Generics (Unsafe)</h4>
        <pre><code>List employees = new ArrayList();
employees.add(new Employee("Bob"));
employees.add("This is a string!"); // Compiles fine!

// Later...
Employee e = (Employee) employees.get(1); // ClassCastException at runtime!
</code></pre>
      </div>
      <p><strong>Generics</strong> solve this by letting you specify the type of objects the collection can hold using angle brackets <code>&lt;&gt;</code>.</p>
      <div class="code-block"><div class="code-header"><span>GenericList.java</span></div><pre><code>List&lt;Employee&gt; employees = new ArrayList&lt;Employee&gt;();
employees.add(new Employee("Bob"));
// employees.add("String"); // Compiler ERROR! This protects us.
</code></pre></div>
      <h3>The Diamond Operator &lt;&gt;</h3>
      <p>Since Java 7, you don't need to repeat the type on the right side. You can use the "diamond operator":</p>
      <div class="code-block"><div class="code-header"><span>Diamond.java</span></div><pre><code>List&lt;Employee&gt; employees = new ArrayList&lt;&gt;(); // Much cleaner!
</code></pre></div>

      <h2>Wrapper Classes and Autoboxing</h2>
      <p>Collections can <strong>only store Objects</strong>, not primitives (like <code>int</code>, <code>double</code>, <code>boolean</code>). To store numbers in a List, we use <strong>Wrapper Classes</strong>.</p>
      <ul>
        <li><code>int</code> &rarr; <code>Integer</code></li>
        <li><code>double</code> &rarr; <code>Double</code></li>
        <li><code>boolean</code> &rarr; <code>Boolean</code></li>
        <li><code>char</code> &rarr; <code>Character</code></li>
      </ul>
      <p><strong>Autoboxing</strong> is Java automatically converting a primitive to a wrapper object. <strong>Unboxing</strong> is the reverse.</p>
      <div class="code-block"><div class="code-header"><span>Wrappers.java</span></div><pre><code>List&lt;Integer&gt; salaries = new ArrayList&lt;&gt;();
salaries.add(50000); // Autoboxing: Java turns int 50000 into new Integer(50000)

int firstSalary = salaries.get(0); // Unboxing: Integer converted back to int
</code></pre></div>

      <div class="practice-section">
        <h3>Practice Question</h3>
        <p>Why doesn't <code>List&lt;int&gt; numbers = new ArrayList&lt;&gt;();</code> compile?</p>
        <details><summary>Show Solution</summary>
        <p>Collections can only store Objects. <code>int</code> is a primitive type, not an Object. You must use the wrapper class <code>Integer</code> instead: <code>List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();</code></p>
        </details>
      </div>

      <div class="callout"><strong>Key Takeaways:</strong><ul><li>Arrays have fixed sizes.</li><li>Use Collections for dynamic data structures.</li></ul></div>
      <div class="execution-trace"><h4>Adding to an ArrayList</h4><ol><li>Check capacity.</li><li>Add element.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Collections are used everywhere in Java applications to group related objects like users, database records, and UI components.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>What is wrong with <code>List&lt;String&gt; list = new List&lt;&gt;();</code>?</p><details><summary>Show Solution</summary><p>List is an interface. You must instantiate a concrete class like ArrayList.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: List vs Set vs Map differences?</summary><p>List allows duplicates and is ordered. Set prohibits duplicates. Map stores key-value pairs.</p></details>
      <details><summary>Q: What is autoboxing?</summary><p>Automatic conversion between primitive types and their corresponding wrapper classes.</p></details>
      <details><summary>Q: Why use generics?</summary><p>Generics provide compile-time type safety and eliminate the need for casting.</p></details>

    `
  },
  {
    id: 'list-arraylist',
    phase: 4,
    title: 'List and ArrayList',
    icon: '📋',
    level: 'Beginner',
    minutes: 40,
    description: 'Master the List interface and its most popular implementation, ArrayList.',
    objectives: [
      'Learn core List interface methods',
      'Understand how ArrayList works under the hood',
      'Create, iterate, and modify lists safely',
      'Compare ArrayList with LinkedList',
      'Handle list modifications and ConcurrentModificationException'
    ],
    content: `
      <h2>The List Interface</h2>
      <p>A <strong>List</strong> is an ordered collection that allows duplicate elements. You can access elements by their integer index (starting at 0). Think of it like a dynamically resizing array.</p>
      <p>Core methods include:</p>
      <ul>
        <li><code>add(E e)</code>: Appends the element to the end.</li>
        <li><code>add(int index, E e)</code>: Inserts the element at the specified position.</li>
        <li><code>get(int index)</code>: Returns the element at the specified position.</li>
        <li><code>set(int index, E e)</code>: Replaces the element at the specified position.</li>
        <li><code>remove(int index)</code> / <code>remove(Object o)</code>: Removes an element.</li>
        <li><code>size()</code>: Returns the number of elements.</li>
        <li><code>contains(Object o)</code>: Returns true if the list contains the element.</li>
      </ul>

      <h2>ArrayList Internals</h2>
      <p>An <strong>ArrayList</strong> is backed by a standard array. When you create an ArrayList, it creates an internal array (default capacity is 10). When that array gets full, ArrayList creates a new, larger array (usually 1.5x the size) and copies the elements over.</p>
      <p>Because it's backed by an array, <strong>accessing elements by index is extremely fast</strong> (O(1)). However, inserting or removing elements in the <em>middle</em> can be slow (O(n)) because subsequent elements must be shifted.</p>

      <h2>Creating Lists</h2>
      <div class="code-block"><div class="code-header"><span>ListCreation.java</span></div><pre><code>// 1. Standard creation (Mutable)
List&lt;String&gt; names = new ArrayList&lt;&gt;();
names.add("Alice");

// 2. Immutable list (Java 9+)
List&lt;String&gt; immutableNames = List.of("Bob", "Charlie");
// immutableNames.add("Dave"); // Throws UnsupportedOperationException!

// 3. Arrays.asList (Fixed size, but mutable elements)
List&lt;String&gt; fixedNames = Arrays.asList("Eve", "Frank");
fixedNames.set(0, "Eva"); // OK
// fixedNames.add("Grace"); // Throws UnsupportedOperationException!
</code></pre></div>

      <h2>Iterating Over a List</h2>
      <p>There are several ways to loop through a list.</p>
      <div class="code-block"><div class="code-header"><span>Iteration.java</span></div><pre><code>List&lt;Employee&gt; team = new ArrayList&lt;&gt;();
team.add(new Employee("Alice"));
team.add(new Employee("Bob"));

// 1. For-each loop (Preferred for reading)
for (Employee emp : team) {
    System.out.println(emp.getName());
}

// 2. Traditional for-i loop (Needed if you need the index)
for (int i = 0; i &lt; team.size(); i++) {
    System.out.println(i + ": " + team.get(i).getName());
}
</code></pre></div>
      <div class="output-box">Alice
Bob
0: Alice
1: Bob</div>

      <h2>The Danger of Modifying During Iteration</h2>
      <p>What if we want to remove employees who are inactive while iterating over the list?</p>
      <div class="mistake-box">
        <h4>Incorrect (Throws Exception)</h4>
        <pre><code>for (Employee emp : team) {
    if (!emp.isActive()) {
        team.remove(emp); // Throws ConcurrentModificationException!
    }
}
</code></pre>
      </div>
      <p>You cannot modify a collection directly using <code>add()</code> or <code>remove()</code> while iterating with a for-each loop. Java detects this and throws a <code>ConcurrentModificationException</code>.</p>
      
      <h3>The Solution: Iterator</h3>
      <p>To safely remove elements during iteration, use an <strong>Iterator</strong>.</p>
      <div class="code-block"><div class="code-header"><span>SafeRemoval.java</span></div><pre><code>Iterator&lt;Employee&gt; iterator = team.iterator();
while (iterator.hasNext()) {
    Employee emp = iterator.next();
    if (!emp.isActive()) {
        iterator.remove(); // SAFE removal!
    }
}
</code></pre></div>
      <p><em>Note: In Java 8+, you can also use <code>team.removeIf(emp -&gt; !emp.isActive());</code> for a cleaner solution.</em></p>

      <h2>ArrayList vs LinkedList</h2>
      <table class="compare-table">
        <tr><th>Feature</th><th>ArrayList</th><th>LinkedList</th></tr>
        <tr><td>Underlying Structure</td><td>Dynamic Array</td><td>Doubly Linked List</td></tr>
        <tr><td>Access by Index (get)</td><td>Fast (O(1))</td><td>Slow (O(n))</td></tr>
        <tr><td>Insert/Remove at end</td><td>Fast (O(1))</td><td>Fast (O(1))</td></tr>
        <tr><td>Insert/Remove in middle</td><td>Slow (Shifting required)</td><td>Fast (Pointer update)</td></tr>
        <tr><td>Memory usage</td><td>Less</td><td>More (stores pointers)</td></tr>
      </table>
      <div class="callout"><strong>Rule of Thumb:</strong> Use <code>ArrayList</code> 99% of the time. Only use <code>LinkedList</code> if you are doing constant insertions/deletions at the beginning or middle of a very large list.</div>

      <div class="practice-section">
        <h3>Practice Question</h3>
        <p>Write code to create a List of Integers containing 1 to 5. Then, safely remove the number 3 from the list.</p>
        <details><summary>Show Solution</summary>
        <div class="code-block"><pre><code>List&lt;Integer&gt; nums = new ArrayList&lt;&gt;(List.of(1, 2, 3, 4, 5));
// Using Iterator
Iterator&lt;Integer&gt; it = nums.iterator();
while(it.hasNext()) {
    if(it.next() == 3) {
        it.remove();
    }
}
// Or Java 8+ way:
// nums.removeIf(n -> n == 3);
</code></pre></div>
        </details>
      </div>

      <div class="execution-trace"><h4>ArrayList Growth</h4><ol><li>Array reaches capacity.</li><li>New array created (1.5x size).</li><li>Elements copied.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>ArrayList is the go-to default for storing any sequence of data, like a shopping cart or a list of active users.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why does <code>list.remove(2)</code> throw IndexOutOfBoundsException on an empty list?</p><details><summary>Show Solution</summary><p>The list has no elements, so index 2 does not exist.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: ArrayList vs LinkedList?</summary><p>ArrayList is backed by an array (fast random access), LinkedList is backed by nodes (fast insertions/deletions at ends).</p></details>
      <details><summary>Q: How does ArrayList grow?</summary><p>It creates a new array 1.5 times the size of the original and copies elements over.</p></details>
      <details><summary>Q: What is ConcurrentModificationException?</summary><p>An exception thrown when a collection is modified structurally while iterating over it without using the Iterator's own methods.</p></details>

    `
  },
  {
    id: 'set-implementations',
    phase: 4,
    title: 'Set: HashSet, LinkedHashSet, TreeSet',
    icon: '🎯',
    level: 'Intermediate',
    minutes: 40,
    description: 'Learn how Sets guarantee uniqueness and the vital role of equals() and hashCode().',
    objectives: [
      'Understand the core property of a Set (no duplicates)',
      'Compare HashSet, LinkedHashSet, and TreeSet',
      'Master the equals() and hashCode() contract',
      'Learn how HashSet determines duplicates',
      'Perform standard Set operations'
    ],
    content: `
      <h2>What is a Set?</h2>
      <p>A <strong>Set</strong> is a collection that <strong>cannot contain duplicate elements</strong>. It models the mathematical set abstraction. It is ideal when you need to maintain a unique collection of items, like active employee IDs or a list of tags.</p>

      <h2>The Three Main Set Implementations</h2>
      <table class="compare-table">
        <tr><th>Implementation</th><th>Order</th><th>Underlying Structure</th><th>Speed</th></tr>
        <tr><td><code>HashSet</code></td><td>Unordered (Random)</td><td>Hash Table</td><td>Extremely Fast (O(1))</td></tr>
        <tr><td><code>LinkedHashSet</code></td><td>Insertion Order</td><td>Hash Table + Linked List</td><td>Very Fast (O(1))</td></tr>
        <tr><td><code>TreeSet</code></td><td>Sorted Order</td><td>Red-Black Tree</td><td>Logarithmic (O(log n))</td></tr>
      </table>

      <h3>1. HashSet Example</h3>
      <div class="code-block"><div class="code-header"><span>HashSetExample.java</span></div><pre><code>Set&lt;String&gt; skills = new HashSet&lt;&gt;();
skills.add("Java");
skills.add("Spring");
skills.add("SQL");
skills.add("Java"); // Ignored, duplicate!

System.out.println(skills.size()); // Outputs 3
System.out.println(skills); // Output order is unpredictable! e.g., [SQL, Java, Spring]
</code></pre></div>
      <div class="output-box">3
[SQL, Java, Spring]</div>

      <h2>The equals() and hashCode() Contract (CRITICAL!)</h2>
      <p>How does a <code>HashSet</code> know if an element is a duplicate? It relies on two methods inherited from the <code>Object</code> class: <code>equals()</code> and <code>hashCode()</code>.</p>
      
      <p><strong>hashCode():</strong> Returns an integer representation of the object. Used to place the object in a "bucket" in the hash table.</p>
      <p><strong>equals():</strong> Compares two objects for logical equality.</p>

      <div class="callout"><strong>The Contract:</strong> If two objects are equal according to <code>equals()</code>, they MUST have the same <code>hashCode()</code>. If they have the same <code>hashCode()</code>, they might not be equal (this is called a collision), but the hash table handles that using <code>equals()</code> to check within the bucket.</div>

      <h3>Custom Objects in a HashSet</h3>
      <p>If you don't override these methods, Java compares object <em>memory addresses</em>. This leads to duplicate data!</p>
      <div class="mistake-box">
        <h4>Without Overriding equals/hashCode</h4>
        <pre><code>Employee e1 = new Employee(1, "Alice");
Employee e2 = new Employee(1, "Alice"); // Logically same employee

Set&lt;Employee&gt; employees = new HashSet&lt;&gt;();
employees.add(e1);
employees.add(e2); 

System.out.println(employees.size()); // Outputs 2! Set failed to prevent duplicate!
</code></pre>
      </div>
      <div class="output-box">2</div>

      <p>To fix this, we generate <code>equals()</code> and <code>hashCode()</code> in our Employee class (usually done via IDE shortcuts or Lombok).</p>
      <div class="code-block"><div class="code-header"><span>Employee.java</span></div><pre><code>public class Employee {
    private int id;
    private String name;
    
    // ... constructor, getters ...

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return id == employee.id; // Equality based on ID
    }

    @Override
    public int hashCode() {
        return Objects.hash(id); // Hash based on ID
    }
}
</code></pre></div>

      <h2>TreeSet and Sorting</h2>
      <p><code>TreeSet</code> keeps elements sorted. However, the objects inside MUST implement the <code>Comparable</code> interface (or you must provide a <code>Comparator</code>), otherwise, it throws a <code>ClassCastException</code>.</p>
      <div class="code-block"><div class="code-header"><span>TreeSetExample.java</span></div><pre><code>Set&lt;Integer&gt; numbers = new TreeSet&lt;&gt;();
numbers.add(50);
numbers.add(10);
numbers.add(30);

System.out.println(numbers); // Output: [10, 30, 50] Automatically sorted!
</code></pre></div>
      <div class="output-box">[10, 30, 50]</div>

      <div class="practice-section">
        <h3>Practice Question</h3>
        <p>You have a <code>HashSet&lt;Employee&gt;</code>. You add an Employee, then you change the Employee's ID using a setter, and then try to check <code>set.contains(employee)</code>. What happens and why?</p>
        <details><summary>Show Solution</summary>
        <p>It will likely return <code>false</code>. This is a common mistake: modifying an object that is in a HashSet in a way that changes its hashCode. The object is in the "wrong bucket" now, so the Set can't find it. <strong>Never mutate fields used in equals/hashCode while the object is in a Set!</strong></p>
        </details>
      </div>

      <div class="execution-trace"><h4>HashSet.add()</h4><ol><li>Calculate hashCode.</li><li>Find bucket.</li><li>Check equality using equals().</li><li>Insert if unique.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Sets are perfect for tracking unique visitors, removing duplicates from a list, or checking membership quickly.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why is my object duplicated in the HashSet?</p><details><summary>Show Solution</summary><p>You probably forgot to override equals() and hashCode() in your class.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: How does HashSet determine equality?</summary><p>It uses the hashCode() to find the bucket, and then equals() to compare with elements in that bucket.</p></details>
      <details><summary>Q: Why override both equals and hashCode?</summary><p>To maintain the contract: equal objects must have the same hash code.</p></details>
      <details><summary>Q: TreeSet vs HashSet?</summary><p>TreeSet maintains elements in sorted order, while HashSet does not guarantee any order but is generally faster.</p></details>

    `
  },
  {
    id: 'map-implementations',
    phase: 4,
    title: 'Map: HashMap, LinkedHashMap, TreeMap',
    icon: '🗺️',
    level: 'Intermediate',
    minutes: 45,
    description: 'Learn to store and retrieve data using key-value pairs with Maps.',
    objectives: [
      'Understand why Map is not a Collection',
      'Learn core Map operations (put, get, remove)',
      'Iterate over Maps using keySet, values, and entrySet',
      'Compare HashMap, LinkedHashMap, and TreeMap',
      'Utilize modern Map methods (getOrDefault, compute)'
    ],
    content: `
      <h2>What is a Map?</h2>
      <p>A <strong>Map</strong> is an object that maps <strong>keys to values</strong>. A map cannot contain duplicate keys; each key can map to at most one value. </p>
      <p><em>Note: Map does NOT inherit from the Collection interface because it represents a mapping of key-value pairs, not a collection of single elements.</em></p>

      <h2>Core Map Methods</h2>
      <ul>
        <li><code>put(K key, V value)</code>: Associates the specified value with the specified key. If the key exists, it overrides the value.</li>
        <li><code>get(Object key)</code>: Returns the value for the key, or <code>null</code> if not found.</li>
        <li><code>containsKey(Object key)</code>: Returns true if the map contains the key.</li>
        <li><code>remove(Object key)</code>: Removes the mapping for a key.</li>
      </ul>

      <h2>HashMap in Action</h2>
      <p>Let's map Employee IDs (Integer) to Employee objects.</p>
      <div class="code-block"><div class="code-header"><span>EmployeeDB.java</span></div><pre><code>Map&lt;Integer, Employee&gt; db = new HashMap&lt;&gt;();

// Adding entries
db.put(101, new Employee("Alice"));
db.put(102, new Employee("Bob"));

// Updating an entry (Key 101 already exists)
db.put(101, new Employee("Alice Smith")); 

// Retrieving
Employee emp = db.get(102);
System.out.println(emp.getName()); // Outputs: Bob

// Checking
if (!db.containsKey(103)) {
    System.out.println("Employee 103 not found.");
}
</code></pre></div>
      <div class="output-box">Bob
Employee 103 not found.</div>

      <h2>Iterating Over a Map</h2>
      <p>Maps cannot be iterated directly using a for-each loop. You must iterate over its keys, values, or entries.</p>
      <div class="code-block"><div class="code-header"><span>MapIteration.java</span></div><pre><code>// 1. Iterate over Keys
for (Integer id : db.keySet()) {
    System.out.println("ID: " + id);
}

// 2. Iterate over Values
for (Employee e : db.values()) {
    System.out.println("Name: " + e.getName());
}

// 3. Iterate over Entries (Best for getting both Key and Value)
for (Map.Entry&lt;Integer, Employee&gt; entry : db.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue().getName());
}
</code></pre></div>

      <h2>Map Implementations</h2>
      <table class="compare-table">
        <tr><th>Implementation</th><th>Order</th><th>Null Keys?</th><th>Speed</th></tr>
        <tr><td><code>HashMap</code></td><td>Unordered</td><td>Allowed (1 null key)</td><td>Fastest (O(1))</td></tr>
        <tr><td><code>LinkedHashMap</code></td><td>Insertion Order</td><td>Allowed</td><td>Very Fast</td></tr>
        <tr><td><code>TreeMap</code></td><td>Sorted by Key</td><td>NOT Allowed</td><td>Logarithmic (O(log n))</td></tr>
      </table>

      <h2>Modern Map Methods (Java 8+)</h2>
      <p>Java 8 added powerful methods to handle common Map scenarios elegantly.</p>
      <div class="code-block"><div class="code-header"><span>ModernMap.java</span></div><pre><code>Map&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();
scores.put("Alice", 90);

// 1. getOrDefault: Prevent null returns
int bobScore = scores.getOrDefault("Bob", 0); // Returns 0 instead of null

// 2. putIfAbsent: Only put if key doesn't exist
scores.putIfAbsent("Alice", 100); // Alice remains 90

// 3. compute: Update a value based on existing value
scores.compute("Alice", (key, val) -> val + 5); // Alice becomes 95
</code></pre></div>

      <h2>Immutable Maps (Java 9+)</h2>
      <div class="code-block"><pre><code>Map&lt;String, Integer&gt; config = Map.of(
    "timeout", 30,
    "maxUsers", 100
);
// config.put("test", 1); // Throws UnsupportedOperationException
</code></pre></div>

      <div class="practice-section">
        <h3>Practice Question</h3>
        <p>Write code to count the frequency of each word in a <code>List&lt;String&gt; words</code> using a Map.</p>
        <details><summary>Show Solution</summary>
        <div class="code-block"><pre><code>Map&lt;String, Integer&gt; frequency = new HashMap&lt;&gt;();
for (String word : words) {
    // Java 8 way (cleanest)
    frequency.put(word, frequency.getOrDefault(word, 0) + 1);
}
</code></pre></div>
        </details>
      </div>

      <div class="callout"><strong>Pro Tip:</strong> Always use immutable objects as Map keys to prevent hash code changes after insertion.</div>
      <div class="execution-trace"><h4>HashMap.get()</h4><ol><li>Calculate key's hashCode.</li><li>Locate bucket.</li><li>Traverse linked list/tree in bucket comparing keys with equals().</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Maps are heavily used for caching, looking up configurations by key, and grouping data.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why does map.get("key") return null when I know I put it in?</p><details><summary>Show Solution</summary><p>The key's class might not properly implement equals() and hashCode(), or it was mutated after insertion.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: HashMap internal working?</summary><p>It uses an array of buckets. Each bucket holds a linked list or tree of entries. It uses hashCode to find the bucket and equals to find the specific entry.</p></details>
      <details><summary>Q: What if we don't override hashCode?</summary><p>Objects that are logically equal might land in different buckets, leading to duplicate keys in the map.</p></details>
      <details><summary>Q: HashMap vs Hashtable?</summary><p>HashMap is not synchronized and allows a null key. Hashtable is synchronized and does not allow nulls.</p></details>

    `
  },
  {
    id: 'comparable-comparator',
    phase: 4,
    title: 'Comparable, Comparator, and Sorting',
    icon: '⚖️',
    level: 'Advanced',
    minutes: 45,
    description: 'Understand how to sort objects using natural ordering and custom comparators.',
    objectives: [
      'Understand the need for sorting interfaces',
      'Implement Comparable for natural ordering',
      'Create Comparators for custom sorting logic',
      'Use Java 8 Comparator static methods (comparing, reversed)',
      'Sort collections using Collections.sort and List.sort'
    ],
    content: `
      <h2>The Sorting Problem</h2>
      <p>Sorting primitives or Strings is easy: <code>Collections.sort(namesList)</code>. But what happens if we try to sort a list of <code>Employee</code> objects?</p>
      <div class="mistake-box">
        <h4>The Error</h4>
        <pre><code>List&lt;Employee&gt; team = new ArrayList&lt;&gt;();
team.add(new Employee(2, "Bob"));
team.add(new Employee(1, "Alice"));

Collections.sort(team); // Compiler ERROR!
</code></pre>
      </div>
      <p>Java doesn't know <em>how</em> to sort Employees. Should it sort by ID? By Name? By Salary? We must tell Java how to compare two Employee objects using either <code>Comparable</code> or <code>Comparator</code>.</p>

      <h2>1. Comparable: "Natural" Ordering</h2>
      <p>If an object has a standard, obvious way it should be sorted, it should implement the <code>Comparable&lt;T&gt;</code> interface. This dictates the class's "natural ordering".</p>
      <p>Let's say the natural order for Employees is by their ID.</p>
      <div class="code-block"><div class="code-header"><span>Employee.java</span></div><pre><code>public class Employee implements Comparable&lt;Employee&gt; {
    private int id;
    private String name;

    // ... constructors, getters ...

    @Override
    public int compareTo(Employee other) {
        // Contract of compareTo:
        // Return negative number if this < other
        // Return 0 if this == other
        // Return positive number if this > other
        
        return Integer.compare(this.id, other.id); 
    }
}
</code></pre></div>
      <p>Now, <code>Collections.sort(team)</code> will compile and sort the list by ID!</p>

      <h2>2. Comparator: Custom Ordering</h2>
      <p>What if we want to sort Employees by name instead? We shouldn't change the <code>compareTo</code> method, because sorting by name isn't the "natural" order. Instead, we use a <strong>Comparator</strong>.</p>
      
      <p>A <code>Comparator&lt;T&gt;</code> is a separate class (or lambda) that dictates how to sort.</p>
      <div class="code-block"><div class="code-header"><span>NameSorter.java</span></div><pre><code>Comparator&lt;Employee&gt; byName = new Comparator&lt;Employee&gt;() {
    @Override
    public int compare(Employee e1, Employee e2) {
        return e1.getName().compareTo(e2.getName()); // Strings already have compareTo
    }
};

// Using List.sort (Java 8+)
team.sort(byName);
</code></pre></div>

      <h2>Modern Comparators (Java 8+)</h2>
      <p>Java 8 revolutionized <code>Comparator</code> with static helper methods, making them incredibly clean and readable using lambdas.</p>
      <div class="code-block"><div class="code-header"><span>ModernSorting.java</span></div><pre><code>// Sort by Name
team.sort(Comparator.comparing(Employee::getName));

// Sort by Salary, descending
team.sort(Comparator.comparing(Employee::getSalary).reversed());

// Chain comparators: Sort by Department, THEN by Name
team.sort(Comparator.comparing(Employee::getDepartment)
                    .thenComparing(Employee::getName));
</code></pre></div>

      <h2>Comparable vs Comparator</h2>
      <table class="compare-table">
        <tr><th>Feature</th><th>Comparable</th><th>Comparator</th></tr>
        <tr><td>Location</td><td>Inside the class being sorted</td><td>Separate class or lambda</td></tr>
        <tr><td>Method</td><td><code>compareTo(T o)</code></td><td><code>compare(T o1, T o2)</code></td></tr>
        <tr><td>Purpose</td><td>Defines the single, default sorting rule</td><td>Defines multiple, custom sorting rules</td></tr>
        <tr><td>Usage</td><td><code>Collections.sort(list)</code></td><td><code>list.sort(comparator)</code></td></tr>
      </table>

      <div class="practice-section">
        <h3>Practice Question</h3>
        <p>Write a single line of Java 8 code to sort a <code>List&lt;Employee&gt; list</code> by age descending, and then by name ascending.</p>
        <details><summary>Show Solution</summary>
        <div class="code-block"><pre><code>list.sort(Comparator.comparing(Employee::getAge).reversed()
                    .thenComparing(Employee::getName));
</code></pre></div>
        </details>
      </div>

      <div class="callout"><strong>Remember:</strong> Comparable is for "natural" sorting, Comparator is for custom sorting.</div>
      <div class="execution-trace"><h4>Collections.sort()</h4><ol><li>Convert collection to array.</li><li>Use TimSort algorithm to sort the array.</li><li>Convert array back to collection.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Sorting search results by relevance, ordering transactions by date, or ranking players by score.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why does <code>Collections.sort(myList)</code> not compile?</p><details><summary>Show Solution</summary><p>The objects in the list do not implement Comparable.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: When to use Comparable vs Comparator?</summary><p>Comparable for default natural order defined in the class. Comparator for sorting from outside the class or defining multiple sort orders.</p></details>
      <details><summary>Q: What does compareTo return?</summary><p>Negative if less, zero if equal, positive if greater.</p></details>
      <details><summary>Q: Can we use Comparator on classes we don't own?</summary><p>Yes, that's one of its main benefits over Comparable.</p></details>

    `
  },
  {
    id: 'iterators-optional',
    phase: 4,
    title: 'Iterators, for-each, and Optional',
    icon: '🔍',
    level: 'Advanced',
    minutes: 40,
    description: 'Deep dive into collection iteration mechanics and safe null handling with Optional.',
    objectives: [
      'Understand how the enhanced for-loop uses Iterators',
      'Learn about ListIterator for bidirectional traversal',
      'Solve ConcurrentModificationException scenarios',
      'Understand the purpose of Optional to avoid NullPointerException',
      'Use Optional methods (isPresent, ifPresent, orElse, map)'
    ],
    content: `
      <h2>The Iterator Interface</h2>
      <p>While the enhanced <code>for-each</code> loop is convenient, it's actually just "syntactic sugar" for an <strong>Iterator</strong>. An Iterator is an object that walks through a collection.</p>
      
      <p>When you write this:</p>
      <div class="code-block"><pre><code>for (String name : names) { ... }</code></pre></div>
      <p>Java compiles it to this:</p>
      <div class="code-block"><pre><code>Iterator&lt;String&gt; it = names.iterator();
while (it.hasNext()) {
    String name = it.next();
    // ...
}</code></pre></div>

      <h3>ListIterator</h3>
      <p>Lists offer a specialized <code>ListIterator</code> that allows you to traverse backwards and add/replace elements during iteration.</p>
      <div class="code-block"><div class="code-header"><span>ListIteratorExample.java</span></div><pre><code>ListIterator&lt;String&gt; lit = names.listIterator(names.size()); // Start at end
while (lit.hasPrevious()) {
    System.out.println(lit.previous()); // Prints list backwards
}
</code></pre></div>
      <div class="output-box">Charlie
Bob
Alice</div>

      <h2>Dealing with Nulls: Enter Optional</h2>
      <p>A classic problem in Java is returning <code>null</code> when a value isn't found (e.g., searching for an employee by ID). This leads to the infamous <code>NullPointerException</code> (NPE).</p>
      
      <div class="mistake-box">
        <h4>The Old Way (Error Prone)</h4>
        <pre><code>public Employee findById(int id) {
    // ... logic ... returns null if not found
}

// Caller forgets to check for null
Employee emp = findById(999);
System.out.println(emp.getName()); // CRASH! NullPointerException
</code></pre>
      </div>

      <p>Java 8 introduced <code>Optional&lt;T&gt;</code>. An Optional is a container object which may or may not contain a non-null value. <strong>It forces the caller to explicitly handle the case where the value is missing.</strong></p>

      <h3>Creating Optionals</h3>
      <div class="code-block"><pre><code>// 1. Empty Optional
Optional&lt;Employee&gt; emptyOpt = Optional.empty();

// 2. Optional with a known non-null value
Optional&lt;Employee&gt; validOpt = Optional.of(new Employee("Alice")); // Throws NPE if null is passed!

// 3. Optional with a value that might be null (Most common)
Employee result = lookupDatabase(); 
Optional&lt;Employee&gt; safeOpt = Optional.ofNullable(result);
</code></pre></div>

      <h3>Consuming Optionals Elegantly</h3>
      <p>Instead of writing <code>if (opt.isPresent()) { return opt.get(); } else { ... }</code>, Optional provides functional methods.</p>
      <div class="code-block"><div class="code-header"><span>UsingOptional.java</span></div><pre><code>Optional&lt;Employee&gt; opt = findEmployeeById(101);

// 1. Provide a default value
Employee e1 = opt.orElse(new Employee("Default"));

// 2. Throw an exception if missing
Employee e2 = opt.orElseThrow(() -&gt; new RuntimeException("Not Found!"));

// 3. Execute code only if present
opt.ifPresent(emp -&gt; System.out.println(emp.getName()));

// 4. Map the value (Extract just the name)
String name = opt.map(Employee::getName).orElse("Unknown");
</code></pre></div>

      <div class="callout"><strong>Best Practices for Optional:</strong>
        <ul>
          <li><strong>DO</strong> use it as a return type for methods that might not return a result.</li>
          <li><strong>DON'T</strong> use it as a parameter to methods or constructors.</li>
          <li><strong>DON'T</strong> use it as a field in a class (it's not Serializable).</li>
          <li><strong>DON'T</strong> just call <code>get()</code> without checking <code>isPresent()</code> first.</li>
        </ul>
      </div>

      <div class="practice-section">
        <h3>Practice Question</h3>
        <p>Rewrite this code using Optional to avoid NullPointerException if the map doesn't contain the key:<br>
        <code>String dept = employeeDepts.get("Alice").toUpperCase();</code></p>
        <details><summary>Show Solution</summary>
        <div class="code-block"><pre><code>String dept = Optional.ofNullable(employeeDepts.get("Alice"))
                      .map(String::toUpperCase)
                      .orElse("NO DEPARTMENT");
</code></pre></div>
        </details>
      </div>

      <div class="execution-trace"><h4>Iterator traversal</h4><ol><li>Check hasNext().</li><li>Call next() to get element and advance cursor.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Iterators are used behind the scenes in for-each loops. Optional is heavily used in Java Streams and Spring Data JPA repositories.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why does <code>opt.get()</code> throw NoSuchElementException?</p><details><summary>Show Solution</summary><p>You called get() on an empty Optional without checking isPresent() first.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: Why was Optional introduced?</summary><p>To provide a clear, expressive way to handle potentially null values and reduce NullPointerExceptions.</p></details>
      <details><summary>Q: When NOT to use Optional?</summary><p>Avoid using Optional as a field type in classes (it's not serializable) or as a method parameter.</p></details>
      <details><summary>Q: What is the difference between orElse and orElseGet?</summary><p>orElse is always evaluated, whereas orElseGet uses a Supplier that is only executed if the Optional is empty.</p></details>

    `
  }
];
