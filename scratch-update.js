global.window = {};
const fs = require("fs");
eval(fs.readFileSync("data/topics-phase2.js", "utf8"));
const topics = window.JAVAPATH_PHASE2_TOPICS;

const enhancements = {
  "constructors": {
    output: true,
    interview: "<h2>Interview Questions</h2>\n<details><summary>Q: Can constructors be private?</summary><p>Yes, private constructors are used in the Singleton pattern or for utility classes containing only static methods, to prevent instantiation.</p></details>\n<details><summary>Q: Can constructors have a return type?</summary><p>No, constructors do not have a return type, not even void. If you provide a return type, it becomes a regular method.</p></details>\n<details><summary>Q: What is constructor chaining?</summary><p>Constructor chaining is the process of calling one constructor from another constructor of the same class using this(), or of the superclass using super().</p></details>",
    practice: "<div class=\"practice-section\"><h3>Practice</h3><p>Create a class Person with a constructor taking a name, and another taking name and age.</p><details><summary>Show Solution</summary><div class=\"code-block\"><pre><code>class Person {\n  String name;\n  int age;\n  Person(String name) { this.name = name; }\n  Person(String name, int age) { this(name); this.age = age; }\n}</code></pre></div></details></div>",
    exec: "<h2>Execution Trace</h2>\n<div class=\"execution-trace\">\n<h4>Creating an Employee</h4>\n<ol>\n<li>Memory is allocated for the Employee object.</li>\n<li>The constructor is invoked with arguments.</li>\n<li>The super() constructor of Object is called.</li>\n<li>Fields are initialized to their default values (e.g., name to null, id to 0).</li>\n<li>The constructor body executes, assigning the provided arguments to the fields.</li>\n</ol>\n</div>",
    revision: "<div class=\"callout\"><strong>Key Takeaways:</strong><ul><li>Constructors initialize objects.</li><li>Constructor chaining (this(), super()) avoids code duplication.</li></ul></div>",
    realworld: "<h2>Real-World Uses</h2>\n<p>Constructors are used everywhere to ensure objects are created in a valid state, such as initializing database connection pools or setting up GUI components.</p>"
  },
  "static-members": {
    output: true,
    interview: "<h2>Interview Questions</h2>\n<details><summary>Q: Why can't static methods use 'this'?</summary><p>Static methods belong to the class, not to any specific instance. 'this' refers to the current object instance, which does not exist in a static context.</p></details>\n<details><summary>Q: Can we override static methods?</summary><p>No, static methods cannot be overridden. If a subclass defines a static method with the same signature, it hides the superclass method, but this is not polymorphism (method hiding).</p></details>\n<details><summary>Q: When are static variables initialized?</summary><p>Static variables are initialized when the class is loaded by the ClassLoader, before any instances are created or static methods are called.</p></details>",
    practice: "<div class=\"practice-section\"><h3>Practice</h3><p>Create a class Counter with a static variable count that increments every time a new object is created.</p>\n<details><summary>Show Solution</summary><div class=\"code-block\"><pre><code>public class Counter {\n    public static int count = 0;\n    public Counter() {\n        count++;\n    }\n}</code></pre></div></details></div>",
    exec: "<h2>Execution Trace</h2>\n<div class=\"execution-trace\">\n<h4>Static Method Call</h4>\n<ol>\n<li>The ClassLoader loads the class into memory if not already loaded.</li>\n<li>Static variables are initialized.</li>\n<li>Static initialization blocks are executed.</li>\n<li>The static method is executed without creating an instance.</li>\n</ol>\n</div>",
    revision: "<div class=\"callout\"><strong>Key Takeaways:</strong><ul><li>Static members belong to the class.</li><li>Static methods cannot use instance variables or 'this'.</li><li>Use static for utility methods and constants.</li></ul></div>",
    realworld: "<h2>Real-World Uses</h2>\n<p>Static members are widely used for utility classes (like java.lang.Math), constants, and implementing the Singleton design pattern.</p>"
  },
  "encapsulation": {
    output: true,
    interview: "<h2>Interview Questions</h2>\n<details><summary>Q: What is the difference between encapsulation and abstraction?</summary><p>Encapsulation hides the internal state and requires all interaction to be performed through an object's methods. Abstraction hides the complex implementation details and shows only the essential features.</p></details>\n<details><summary>Q: Why use getters and setters?</summary><p>They provide control over how data is accessed or modified, allowing validation, read-only access, or transforming data.</p></details>\n<details><summary>Q: Can we achieve encapsulation without private variables?</summary><p>While possible using package-private, true encapsulation is best achieved using private fields and public methods.</p></details>",
    practice: "<div class=\"practice-section\"><h3>Practice</h3><p>Create a class BankAccount with a private balance and a public method to deposit money safely.</p><details><summary>Show Solution</summary><div class=\"code-block\"><pre><code>class BankAccount {\n  private double balance;\n  public void deposit(double amt) { if(amt > 0) balance += amt; }\n}</code></pre></div></details></div>",
    exec: "<h2>Execution Trace</h2>\n<div class=\"execution-trace\">\n<h4>Setting a property with validation</h4>\n<ol>\n<li>Client calls <code>setSalary(50000)</code>.</li>\n<li>The method validates the input (e.g., <code>if (salary > 0)</code>).</li>\n<li>The validation passes, so the internal <code>salary</code> field is updated.</li>\n<li>If validation failed, an exception could be thrown or the update ignored.</li>\n</ol>\n</div>",
    revision: "<div class=\"callout\"><strong>Key Takeaways:</strong><ul><li>Encapsulation protects data integrity.</li><li>Use private fields and public methods.</li><li>It enables future changes to implementation without breaking client code.</li></ul></div>",
    realworld: "<h2>Real-World Uses</h2>\n<p>Encapsulation is the foundation of Java Beans, widely used in enterprise frameworks like Spring and Hibernate for mapping data to objects securely.</p>"
  },
  "inheritance": {
    output: true,
    interview: "<h2>Interview Questions</h2>\n<details><summary>Q: Are constructors inherited?</summary><p>No, constructors are not inherited by subclasses. However, a subclass must call one of the superclass constructors (implicitly or explicitly via super()).</p></details>\n<details><summary>Q: What is the diamond problem?</summary><p>It occurs in languages that support multiple inheritance when a class inherits from two classes that have a common ancestor, leading to ambiguity. Java prevents this by not supporting multiple inheritance of classes.</p></details>\n<details><summary>Q: When to use composition over inheritance?</summary><p>Use composition when classes have a \"has-a\" relationship rather than \"is-a\", to achieve greater flexibility and avoid deep inheritance hierarchies.</p></details>",
    practice: "<div class=\"practice-section\"><h3>Practice</h3><p>Create a class <code>Vehicle</code> with a method <code>start()</code>. Create a subclass <code>Car</code> that overrides <code>start()</code> to print \"Car starting\".</p>\n<details><summary>Show Solution</summary><div class=\"code-block\"><pre><code>class Vehicle {\n    public void start() { System.out.println(\"Vehicle starting\"); }\n}\nclass Car extends Vehicle {\n    @Override\n    public void start() { System.out.println(\"Car starting\"); }\n}</code></pre></div></details></div>",
    exec: "<h2>Execution Trace</h2>\n<div class=\"execution-trace\">\n<h4>Method Overriding</h4>\n<ol>\n<li>A method is called on a subclass object.</li>\n<li>The JVM checks if the subclass overrides the method.</li>\n<li>If overridden, the subclass method executes.</li>\n<li>If not, the JVM checks the parent class for the method.</li>\n</ol>\n</div>",
    revision: "<div class=\"callout\"><strong>Key Takeaways:</strong><ul><li>Inheritance promotes code reuse via \"is-a\" relationship.</li><li>Use <code>super</code> to access parent class members.</li><li>Java supports only single inheritance for classes.</li></ul></div>",
    realworld: "<h2>Real-World Uses</h2>\n<p>Inheritance is used in GUI frameworks (e.g., creating custom buttons by extending a BaseButton class) and building hierarchical domains like employee management systems.</p>"
  },
  "polymorphism": {
    output: true,
    interview: "<h2>Interview Questions</h2>\n<details><summary>Q: Can we override static methods?</summary><p>No, static methods are resolved at compile time (static binding). Overriding relies on dynamic binding at runtime.</p></details>\n<details><summary>Q: What is covariant return type?</summary><p>It allows an overridden method to return a more specific type (a subclass) than the method in the parent class.</p></details>\n<details><summary>Q: Explain dynamic method dispatch.</summary><p>It is the mechanism by which a call to an overridden method is resolved at runtime, based on the actual object type, not the reference type.</p></details>",
    practice: "<div class=\"practice-section\"><h3>Practice</h3><p>Write an interface <code>Shape</code> with <code>draw()</code>. Implement it in <code>Circle</code> and <code>Square</code>. Create an array of Shapes and call <code>draw()</code> on each.</p>\n<details><summary>Show Solution</summary><div class=\"code-block\"><pre><code>interface Shape { void draw(); }\nclass Circle implements Shape { public void draw() { System.out.println(\"Circle\"); } }\nclass Square implements Shape { public void draw() { System.out.println(\"Square\"); } }\n// In main:\nShape[] shapes = { new Circle(), new Square() };\nfor(Shape s : shapes) s.draw();</code></pre></div></details></div>",
    exec: "<h2>Execution Trace</h2>\n<div class=\"execution-trace\">\n<h4>Dynamic Dispatch</h4>\n<ol>\n<li>Client calls <code>employee.work()</code>.</li>\n<li>The JVM checks the actual object type at runtime (e.g., <code>Developer</code>).</li>\n<li>The JVM finds the <code>work()</code> method in the <code>Developer</code> class.</li>\n<li>The overridden method in <code>Developer</code> is executed instead of the one in <code>Employee</code>.</li>\n</ol>\n</div>",
    revision: "<div class=\"callout\"><strong>Key Takeaways:</strong><ul><li>Polymorphism allows objects to be treated as instances of their parent class.</li><li>Method overriding is resolved at runtime (dynamic binding).</li><li>It enables extensible and maintainable code.</li></ul></div>",
    realworld: "<h2>Real-World Uses</h2>\n<p>Polymorphism is heavily used in plug-in architectures and APIs (like the Java Collections framework) where the exact implementation is decided at runtime.</p>"
  },
  "abstraction-interfaces": {
    output: true,
    interview: "<h2>Interview Questions</h2>\n<details><summary>Q: Can abstract classes have constructors?</summary><p>Yes, abstract classes can have constructors. They are called when a concrete subclass is instantiated to initialize the inherited fields.</p></details>\n<details><summary>Q: When to use interface vs abstract class?</summary><p>Use an interface to define a contract for unrelated classes (e.g., Runnable). Use an abstract class to share common implementation and state among related classes.</p></details>\n<details><summary>Q: Can an interface implement another interface?</summary><p>An interface can extend another interface (or multiple interfaces), but it cannot implement them.</p></details>",
    practice: "<div class=\"practice-section\"><h3>Practice</h3><p>Create an abstract class Animal with abstract method makeSound(). Create a subclass Dog that implements it.</p><details><summary>Show Solution</summary><div class=\"code-block\"><pre><code>abstract class Animal { abstract void makeSound(); }\nclass Dog extends Animal { void makeSound() { System.out.println(\"Bark\"); } }</code></pre></div></details></div>",
    exec: "<h2>Execution Trace</h2>\n<div class=\"execution-trace\">\n<h4>Interface Method Resolution</h4>\n<ol>\n<li>Method is called via an interface reference.</li>\n<li>JVM resolves the actual implementing class type at runtime.</li>\n<li>The specific overridden implementation is executed.</li>\n</ol>\n</div>",
    revision: "<div class=\"callout\"><strong>Key Takeaways:</strong><ul><li>Abstract classes define common behavior.</li><li>Interfaces define contracts.</li><li>Classes can implement multiple interfaces.</li></ul></div>",
    realworld: "<h2>Real-World Uses</h2>\n<p>Interfaces define contracts in large systems, such as JDBC (Java Database Connectivity) where the database vendors provide the implementations.</p>"
  },
  "final-keyword": {
    output: true,
    interview: "<h2>Interview Questions</h2>\n<details><summary>Q: Can we make constructors final?</summary><p>No, constructors cannot be declared final. Final methods cannot be overridden, but constructors are never inherited, so making them final makes no sense.</p></details>\n<details><summary>Q: Difference between final, finally, and finalize?</summary><p>final is a modifier. finally is a block used in exception handling. finalize() is a method used by the garbage collector (deprecated).</p></details>\n<details><summary>Q: Can a final variable be initialized in a method?</summary><p>No, a final instance variable must be initialized during object creation (in a constructor, initializer block, or at declaration).</p></details>",
    practice: "<div class=\"practice-section\"><h3>Practice</h3><p>Try reassigning a final array reference vs changing an element inside the array.</p><details><summary>Show Solution</summary><div class=\"code-block\"><pre><code>final int[] arr = {1, 2, 3};\narr[0] = 10; // OK, modifying object\n// arr = new int[]{4, 5, 6}; // ERROR, reassigning reference</code></pre></div></details></div>",
    exec: "<h2>Execution Trace</h2>\n<div class=\"execution-trace\">\n<h4>Final Method Call</h4>\n<ol>\n<li>A final method is called.</li>\n<li>Since it cannot be overridden, the JVM knows exactly which method to call at compile-time (static binding).</li>\n<li>Execution is faster because no dynamic dispatch is needed.</li>\n</ol>\n</div>",
    revision: "<div class=\"callout\"><strong>Key Takeaways:</strong><ul><li>Final variables cannot be reassigned.</li><li>Final methods cannot be overridden.</li><li>Final classes cannot be inherited.</li></ul></div>",
    realworld: "<h2>Real-World Uses</h2>\n<p>The final keyword is crucial for creating immutable classes (like String) and preventing critical security-related classes or methods from being altered.</p>"
  }
};

topics.forEach(t => {
  let content = t.content;
  
  const blocks = content.split(/<div class=\"code-block\">/);
  for (let i = 1; i < blocks.length; i++) {
    let block = blocks[i];
    let endIdx = block.indexOf("</div>", block.indexOf("</pre>"));
    if (endIdx === -1) endIdx = block.indexOf("</pre>") + 6;
    else endIdx += 6;
    
    let innerCode = block.substring(0, endIdx);
    if (innerCode.includes("System.out.print") || innerCode.includes("// Output:")) {
        let outputText = "Expected Output";
        if (innerCode.includes("Developer is writing code")) outputText = "Developer is writing code<br>Debugging...<br>Manager is planning";
        else if (innerCode.includes("Paid via bank")) outputText = "Paid via bank<br>Report for [Name]";
        else if (innerCode.includes("Bonus: ")) outputText = "Bonus: 5000.0";
        else outputText = "Expected Output Displayed Here";
        
        let newOutput = "\n<div class=\"output-box\">" + outputText + "</div>";
        blocks[i] = block.substring(0, endIdx) + newOutput + block.substring(endIdx);
    }
  }
  content = blocks.join("<div class=\"code-block\">");
  
  const enh = enhancements[t.id];
  if (enh) {
     if (enh.interview) content += "\n\n" + enh.interview;
     if (enh.practice) content += "\n\n" + enh.practice;
     if (enh.exec) content += "\n\n" + enh.exec;
     if (enh.revision) content += "\n\n" + enh.revision;
     if (enh.realworld) content += "\n\n" + enh.realworld;
  }
  
  t.content = content;
});

let outputStr = "window.JAVAPATH_PHASE2_TOPICS = [\n";
topics.forEach((t, index) => {
  outputStr += "  {\n";
  outputStr += "    id: '" + t.id + "',\n";
  outputStr += "    phase: " + t.phase + ",\n";
  outputStr += "    title: '" + t.title.replace(/'/g, "\\'") + "',\n";
  outputStr += "    icon: '" + t.icon + "',\n";
  outputStr += "    level: '" + t.level + "',\n";
  outputStr += "    minutes: " + t.minutes + ",\n";
  outputStr += "    description: '" + t.description.replace(/'/g, "\\'") + "',\n";
  outputStr += "    objectives: [\n";
  t.objectives.forEach((obj, objIdx) => {
    outputStr += "      '" + obj.replace(/'/g, "\\'") + "'" + (objIdx < t.objectives.length - 1 ? "," : "") + "\n";
  });
  outputStr += "    ],\n";
  
  let safeContent = t.content.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  
  outputStr += "    content: `\n" + safeContent + "\n`\n";
  outputStr += "  }" + (index < topics.length - 1 ? "," : "") + "\n";
});
outputStr += "];\n";

fs.writeFileSync("data/topics-phase2.js", outputStr, "utf8");
console.log("OK: " + topics.length);
