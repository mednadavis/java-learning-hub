# JavaPath — Java Learning Platform

A responsive, no-framework Java learning application built with HTML5, CSS3, and vanilla JavaScript.

## Run it

1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. For the most consistent local experience, use VS Code's Live Server extension to serve the folder.

No backend, package installation, or build step is required. Google Fonts are optional; the app falls back to system fonts if offline.

## Features included

- Responsive dashboard and seven-phase learning roadmap
- Lesson library with runnable-style Java examples, expected output, explanations, comparisons, and practice tasks
- Employee Management example as the main learning storyline
- Search across lesson titles and teaching content
- Mark lessons complete, bookmark topics, and save personal notes
- Export personal notes to Markdown
- Flashcards with flip, shuffle, and Easy/Medium/Hard ratings
- Multiple-choice quiz with feedback, score history, and revision list
- Editable code playground with copy/reset controls
- Light/dark theme, daily study target, and reset option
- Local progress saved in `localStorage`

## Important limitations

- This initial version shows verified/illustrative expected output; it does **not** compile or execute Java in the browser.
- Quiz content and lessons are a starter content set based on the supplied build brief. To guarantee every item from `Java_Complete_Revision_Notes.md` is included, that source Markdown file must be added and checked against the topic coverage.
- Excluded from the learning roadmap as requested: Big O, Git, and JDBC.
- The app uses Java 17 as the baseline and notes selected Java 11+ APIs where relevant.

## Project structure

```text
java-learning-platform/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   └── topics.js
└── README.md
```

## Data and privacy

Learning progress, quiz attempts, bookmarks, ratings, settings, and notes are stored in the browser's localStorage. Reset data from Settings to clear this app's saved state. Avoid saving sensitive information in personal notes.
