const fs = require('fs');
let content = fs.readFileSync('data/topics-phase4.js', 'utf8');

function appendToTopic(id, htmlToAppend) {
    const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?content:\\s*\`[\\s\\S]*?)(\\s*\`\\s*\\n\\s*\\},?)`, 'g');
    content = content.replace(regex, `$1\n${htmlToAppend}$2`);
}

// 1. Output Boxes
content = content.replace(/(System\.out\.println\(i \+ ": " \+ team\.get\(i\)\.getName\(\)\);\n\}\n<\/code><\/pre><\/div>)/, '$1\n      <div class="output-box">Alice\nBob\n0: Alice\n1: Bob</div>');

content = content.replace(/(System\.out\.println\(skills\); \/\/ Output order is unpredictable! e\.g\., \[SQL, Java, Spring\]\n<\/code><\/pre><\/div>)/, '$1\n      <div class="output-box">3\n[SQL, Java, Spring]</div>');

content = content.replace(/(System\.out\.println\(employees\.size\(\)\); \/\/ Outputs 2! Set failed to prevent duplicate!\n<\/code><\/pre>\n\s*<\/div>)/, '$1\n      <div class="output-box">2</div>');

content = content.replace(/(System\.out\.println\(numbers\); \/\/ Output: \[10, 30, 50\] Automatically sorted!\n<\/code><\/pre><\/div>)/, '$1\n      <div class="output-box">[10, 30, 50]</div>');

content = content.replace(/(System\.out\.println\("Employee 103 not found\."\);\n\}\n<\/code><\/pre><\/div>)/, '$1\n      <div class="output-box">Bob\nEmployee 103 not found.</div>');

content = content.replace(/(System\.out\.println\(entry\.getKey\(\) \+ " -&gt; " \+ entry\.getValue\(\)\.getName\(\)\);\n\}\n<\/code><\/pre><\/div>)/, '$1\n      <div class="output-box">ID: 101\nID: 102\nName: Alice Smith\nName: Bob\n101 -&gt; Alice Smith\n102 -&gt; Bob</div>');

content = content.replace(/(System\.out\.println\(lit\.previous\(\)\); \/\/ Prints list backwards\n\}\n<\/code><\/pre><\/div>)/, '$1\n      <div class="output-box">Charlie\nBob\nAlice</div>');

// 2-6 Appending to topics
const t1 = `
      <div class="callout"><strong>Key Takeaways:</strong><ul><li>Arrays have fixed sizes.</li><li>Use Collections for dynamic data structures.</li></ul></div>
      <div class="execution-trace"><h4>Adding to an ArrayList</h4><ol><li>Check capacity.</li><li>Add element.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Collections are used everywhere in Java applications to group related objects like users, database records, and UI components.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>What is wrong with <code>List&lt;String&gt; list = new List&lt;&gt;();</code>?</p><details><summary>Show Solution</summary><p>List is an interface. You must instantiate a concrete class like ArrayList.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: List vs Set vs Map differences?</summary><p>List allows duplicates and is ordered. Set prohibits duplicates. Map stores key-value pairs.</p></details>
      <details><summary>Q: What is autoboxing?</summary><p>Automatic conversion between primitive types and their corresponding wrapper classes.</p></details>
      <details><summary>Q: Why use generics?</summary><p>Generics provide compile-time type safety and eliminate the need for casting.</p></details>
`;
appendToTopic('collections-overview', t1);

const t2 = `
      <div class="execution-trace"><h4>ArrayList Growth</h4><ol><li>Array reaches capacity.</li><li>New array created (1.5x size).</li><li>Elements copied.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>ArrayList is the go-to default for storing any sequence of data, like a shopping cart or a list of active users.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why does <code>list.remove(2)</code> throw IndexOutOfBoundsException on an empty list?</p><details><summary>Show Solution</summary><p>The list has no elements, so index 2 does not exist.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: ArrayList vs LinkedList?</summary><p>ArrayList is backed by an array (fast random access), LinkedList is backed by nodes (fast insertions/deletions at ends).</p></details>
      <details><summary>Q: How does ArrayList grow?</summary><p>It creates a new array 1.5 times the size of the original and copies elements over.</p></details>
      <details><summary>Q: What is ConcurrentModificationException?</summary><p>An exception thrown when a collection is modified structurally while iterating over it without using the Iterator's own methods.</p></details>
`;
appendToTopic('list-arraylist', t2);

const t3 = `
      <div class="execution-trace"><h4>HashSet.add()</h4><ol><li>Calculate hashCode.</li><li>Find bucket.</li><li>Check equality using equals().</li><li>Insert if unique.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Sets are perfect for tracking unique visitors, removing duplicates from a list, or checking membership quickly.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why is my object duplicated in the HashSet?</p><details><summary>Show Solution</summary><p>You probably forgot to override equals() and hashCode() in your class.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: How does HashSet determine equality?</summary><p>It uses the hashCode() to find the bucket, and then equals() to compare with elements in that bucket.</p></details>
      <details><summary>Q: Why override both equals and hashCode?</summary><p>To maintain the contract: equal objects must have the same hash code.</p></details>
      <details><summary>Q: TreeSet vs HashSet?</summary><p>TreeSet maintains elements in sorted order, while HashSet does not guarantee any order but is generally faster.</p></details>
`;
appendToTopic('set-implementations', t3);

const t4 = `
      <div class="callout"><strong>Pro Tip:</strong> Always use immutable objects as Map keys to prevent hash code changes after insertion.</div>
      <div class="execution-trace"><h4>HashMap.get()</h4><ol><li>Calculate key's hashCode.</li><li>Locate bucket.</li><li>Traverse linked list/tree in bucket comparing keys with equals().</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Maps are heavily used for caching, looking up configurations by key, and grouping data.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why does map.get("key") return null when I know I put it in?</p><details><summary>Show Solution</summary><p>The key's class might not properly implement equals() and hashCode(), or it was mutated after insertion.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: HashMap internal working?</summary><p>It uses an array of buckets. Each bucket holds a linked list or tree of entries. It uses hashCode to find the bucket and equals to find the specific entry.</p></details>
      <details><summary>Q: What if we don't override hashCode?</summary><p>Objects that are logically equal might land in different buckets, leading to duplicate keys in the map.</p></details>
      <details><summary>Q: HashMap vs Hashtable?</summary><p>HashMap is not synchronized and allows a null key. Hashtable is synchronized and does not allow nulls.</p></details>
`;
appendToTopic('map-implementations', t4);

const t5 = `
      <div class="callout"><strong>Remember:</strong> Comparable is for "natural" sorting, Comparator is for custom sorting.</div>
      <div class="execution-trace"><h4>Collections.sort()</h4><ol><li>Convert collection to array.</li><li>Use TimSort algorithm to sort the array.</li><li>Convert array back to collection.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Sorting search results by relevance, ordering transactions by date, or ranking players by score.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why does <code>Collections.sort(myList)</code> not compile?</p><details><summary>Show Solution</summary><p>The objects in the list do not implement Comparable.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: When to use Comparable vs Comparator?</summary><p>Comparable for default natural order defined in the class. Comparator for sorting from outside the class or defining multiple sort orders.</p></details>
      <details><summary>Q: What does compareTo return?</summary><p>Negative if less, zero if equal, positive if greater.</p></details>
      <details><summary>Q: Can we use Comparator on classes we don't own?</summary><p>Yes, that's one of its main benefits over Comparable.</p></details>
`;
appendToTopic('comparable-comparator', t5);

const t6 = `
      <div class="execution-trace"><h4>Iterator traversal</h4><ol><li>Check hasNext().</li><li>Call next() to get element and advance cursor.</li></ol></div>
      <h2>Real-World Uses</h2>
      <p>Iterators are used behind the scenes in for-each loops. Optional is heavily used in Java Streams and Spring Data JPA repositories.</p>
      <div class="practice-section"><h3>Find the Bug</h3><p>Why does <code>opt.get()</code> throw NoSuchElementException?</p><details><summary>Show Solution</summary><p>You called get() on an empty Optional without checking isPresent() first.</p></details></div>
      <h2>Interview Questions</h2>
      <details><summary>Q: Why was Optional introduced?</summary><p>To provide a clear, expressive way to handle potentially null values and reduce NullPointerExceptions.</p></details>
      <details><summary>Q: When NOT to use Optional?</summary><p>Avoid using Optional as a field type in classes (it's not serializable) or as a method parameter.</p></details>
      <details><summary>Q: What is the difference between orElse and orElseGet?</summary><p>orElse is always evaluated, whereas orElseGet uses a Supplier that is only executed if the Optional is empty.</p></details>
`;
appendToTopic('iterators-optional', t6);

fs.writeFileSync('data/topics-phase4.js', content, 'utf8');
console.log('Update complete.');
