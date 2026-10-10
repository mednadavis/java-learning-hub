# JavaPath — MouriTech Java Training Academy

A complete, beginner-friendly Java learning platform built for MouriTech intensive training. Designed for learners from both CS and non-CS backgrounds (ECE, Mechanical Engineering, etc.).

## Features

- **36 comprehensive topics** across 7 learning phases
- **150 assessment questions** with detailed explanations
- **50 flashcards** for active recall
- **Code playground** with editable Java examples
- **Dark/light theme** with responsive design
- **Search** across topics and assessments
- **Bookmarks** and **mistake review** system

## Learning Phases

| Phase | Title | Topics |
|-------|-------|--------|
| 1 | Java Fundamentals | Program structure, variables, types, operators, I/O, conditions, loops, arrays, methods, classes |
| 2 | Object-Oriented Programming | Constructors, static members, encapsulation, inheritance, polymorphism, abstraction, interfaces, final |
| 3 | Strings, Dates & Exceptions | Strings, StringBuilder, LocalDate, DateTimeFormatter, exception handling |
| 4 | Collections & Generics | List, Set, Map, implementations, Comparable, Comparator, Optional |
| 5 | Functional Programming & Streams | Functional interfaces, lambdas, method references, Stream API, Collectors |
| 6 | Integrated Practice | Employee Management, Contact Manager, billing, sorting, combined exercises |
| 7 | Professional Foundations | Debugging, clean code, testing basics |

## Assessment Categories

- Topic-wise quizzes
- Mixed Java assessments
- Output prediction practice
- OOP & polymorphism assessments
- Collections & Streams assessments
- Debugging & error finding

## Tech Stack

- Pure HTML, CSS, and vanilla JavaScript
- No frameworks or build tools required
- Java 17 baseline for all code examples
- LocalStorage for bookmarks and quiz history

## How to Run

1. Open `index.html` in any modern browser
2. Or serve with any local HTTP server:
   ```
   npx serve .
   ```

## Project Structure

```
java-learning-platform/
├── index.html                    # Main HTML entry point
├── css/
│   └── styles.css                # All styles (responsive, dark/light)
├── data/
│   ├── topics-phase1.js          # Phase 1: Java Fundamentals (7 topics)
│   ├── topics-phase2.js          # Phase 2: OOP (7 topics)
│   ├── topics-phase3.js          # Phase 3: Strings, Dates, Exceptions (4 topics)
│   ├── topics-phase4.js          # Phase 4: Collections & Generics (6 topics)
│   ├── topics-phase5.js          # Phase 5: Functional Programming (4 topics)
│   ├── topics-phase6-7.js        # Phase 6-7: Practice & Professional (8 topics)
│   ├── assessments.js            # 150 assessment questions
│   └── flashcards.js             # 50 flashcards
├── js/
│   └── app.js                    # Application logic (routing, rendering, state)
└── README.md
```

## Content Philosophy

- Every topic starts by explaining the **problem** before the concept
- **Everyday analogies** before technical definitions
- **Complete runnable code** with expected output
- **Line-by-line explanations** and execution traces
- **Common mistakes** with incorrect code, error, and fix
- **Comparison tables** for related concepts
- **Practice questions** with hidden solutions
- **Employee Management** storyline used throughout

## Assignments

The Assignments section is marked "Coming Soon" and is ready for future content additions.

## Notes

- No progress tracking or completion statistics
- No personal notes feature
- No external dependencies beyond Google Fonts
- All content works offline once loaded
- Code examples are illustrative — Java is not compiled in the browser
