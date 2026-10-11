(() => {
  "use strict";

  // ── Merge all topic phases into one flat array ──
  const topics = [
    ...(window.JAVAPATH_PHASE1_TOPICS || []),
    ...(window.JAVAPATH_PHASE2_TOPICS || []),
    ...(window.JAVAPATH_PHASE3_TOPICS || []),
    ...(window.JAVAPATH_PHASE4_TOPICS || []),
    ...(window.JAVAPATH_PHASE5_TOPICS || []),
    ...(window.JAVAPATH_PHASE67_TOPICS || [])
  ];
  const flashcards = window.JAVAPATH_FLASHCARDS || [];
  const assessments = window.JAVAPATH_ASSESSMENTS || [];

  // ── Utility helpers ──
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  function esc(s = "") {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  // ── State management (no progress tracking) ──
  const STORAGE_KEY = "javapath-state-v2";
  const defaultState = {
    bookmarks: [],
    mistakes: [],
    flashcardStatus: {},
    quizScores: [],
    theme: "light",
    currentTopic: topics[0]?.id || ""
  };
  let state = loadState();
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return { ...defaultState, ...saved };
    } catch { return { ...defaultState }; }
  }
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // ── Navigation state ──
  let currentPage = "dashboard";
  let currentFlash = 0;
  let flashFlipped = false;

  // ── Assessment state ──
  let assessmentMode = "topic";       // "topic" | "mixed" | "output" | "oop" | "collections" | "theory" | "debugging"
  let assessmentTopic = "all";
  let assessmentDifficulty = "all";
  let assessmentQuestions = [];
  let assessmentIndex = 0;
  let assessmentChoice = null;
  let assessmentMultiChoices = [];
  let assessmentAnswered = false;

  // ── Phase data ──
  const PHASES = [
    { n: 1, title: "Java Fundamentals", description: "Program structure, variables, types, operators, casting, input/output, conditions, loops, arrays, methods, classes, and objects.", ids: ["program-structure","variables-types","operators-casting","input-output","conditions-loops","arrays-methods","classes-objects"] },
    { n: 2, title: "Object-Oriented Programming", description: "Constructors, static members, encapsulation, access modifiers, inheritance, polymorphism, abstraction, interfaces, and final.", ids: ["constructors","static-members","encapsulation","inheritance","polymorphism","abstraction-interfaces","final-keyword"] },
    { n: 3, title: "Strings, Dates & Exceptions", description: "Strings, StringBuilder, StringBuffer, LocalDate, LocalDateTime, parsing, formatting, and exception handling.", ids: ["strings","stringbuilder-buffer","dates-time","exception-handling"] },
    { n: 4, title: "Collections & Generics", description: "Lists, Sets, Maps, implementations, generics, iterators, sorting, Comparable, Comparator, and Optional.", ids: ["collections-overview","list-arraylist","set-implementations","map-implementations","comparable-comparator","iterators-optional"] },
    { n: 5, title: "Functional Programming & Streams", description: "Functional interfaces, lambdas, method references, Stream operations, Collectors, and Optional patterns.", ids: ["functional-interfaces","streams-basics","collectors-grouping","optional-advanced"] },
    { n: 6, title: "Integrated Practice", description: "Employee Management, Contact Manager, billing calculations, sorting tasks, and combined exercises.", ids: ["employee-management-project","contact-manager-project","billing-calculator","sorting-exercises","oop-collection-exercises"] },
    { n: 7, title: "Professional Foundations", description: "Debugging, testing, clean code practices, and professional habits.", ids: ["debugging-skills","clean-code","testing-basics"] }
  ];

  function topicById(id) { return topics.find(t => t.id === id) || topics[0]; }
  function phaseFor(id) { return PHASES.find(p => p.ids.includes(id))?.n || 1; }
  function phaseData() {
    return PHASES.map(p => ({ ...p, total: p.ids.length }));
  }

  // ── Page navigation ──
  function setPage(page) {
    currentPage = page;
    $("#search-results").classList.add("hidden");
    $("#global-search").value = "";
    render();
    $("#sidebar").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function pageTitle() {
    const map = {
      dashboard: "Dashboard",
      roadmap: "Learning Roadmap",
      topics: "All Topics",
      flashcards: "Flashcards",
      assessments: "Assessments",
      "assessment-quiz": "Assessment Quiz",
      playground: "Code Playground",
      assignments: "Assignments",
      review: "Review Mistakes",
      settings: "Settings",
      lesson: topicById(state.currentTopic)?.title || "Lesson"
    };
    return map[currentPage] || "Dashboard";
  }

  function header() {
    $("#crumb-current").textContent = pageTitle();
    $$(".nav-item[data-page]").forEach(b =>
      b.classList.toggle("active", b.dataset.page === currentPage)
    );
    $("#topic-count").textContent = topics.length;
  }

  // ── Common UI components ──
  function heading(eyebrow, title, description, action = "") {
    return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
  }

  function topicCard(t) {
    return `<article class="card topic-card" data-open-topic="${t.id}" tabindex="0" role="button">
      <div class="topic-top"><div class="topic-symbol">${t.icon}</div><span class="pill purple">${t.level}</span></div>
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.description)}</p>
      <div class="topic-footer"><span>${t.minutes} min read</span><span>Study topic ↗</span></div>
    </article>`;
  }

  // ══════════════════════════════════════════════
  //  PAGE RENDERERS
  // ══════════════════════════════════════════════

  // ── Dashboard ──
  function dashboard() {
    const next = topics[0];
    const featured = topics.slice(0, 3);
    return `${heading("MOURITECH JAVA TRAINING", "Welcome to JavaPath.", "A complete Java learning path — from your first class to collections, streams, and professional coding practices.")}
    <div class="grid dashboard-grid">
      <div>
        <section class="hero">
          <div class="hero-copy">
            <div class="eyebrow">YOUR JAVA JOURNEY</div>
            <h2>Learn Java by building<br>something real.</h2>
            <p>Follow one Employee Management example as it grows from variables into a practical Java application with OOP, collections, and streams.</p>
            <button class="btn" data-open-topic="${next.id}">Start learning <span>→</span></button>
          </div>
          <div class="hero-art">☕</div>
        </section>

        <div class="grid stat-grid">
          <div class="card stat-card"><div class="stat-top"><span>Total Topics</span><span class="stat-icon">▤</span></div><div class="stat-value">${topics.length}</div><div class="stat-note">Across 7 learning phases</div></div>
          <div class="card stat-card"><div class="stat-top"><span>Assessments</span><span class="stat-icon">✎</span></div><div class="stat-value">${assessments.length}</div><div class="stat-note">Practice questions available</div></div>
          <div class="card stat-card"><div class="stat-top"><span>Flashcards</span><span class="stat-icon">▣</span></div><div class="stat-value">${flashcards.length}</div><div class="stat-note">For active recall practice</div></div>
          <div class="card stat-card"><div class="stat-top"><span>Phases</span><span class="stat-icon">⌁</span></div><div class="stat-value">7</div><div class="stat-note">Fundamentals to Professional</div></div>
        </div>

        <div class="section-heading"><h2>Start with the fundamentals</h2><button class="text-link" data-page="topics">View all →</button></div>
        <div class="grid topic-grid">${featured.map(topicCard).join("")}</div>
      </div>

      <div class="side-stack">
        <section class="card card-pad">
          <div class="card-title-row"><h3>Learning Phases</h3></div>
          <div class="phase-list">${phaseData().map(p => `
            <div class="phase-row"><div class="phase-number">${p.n}</div><div class="phase-info"><strong>${p.title}</strong><small>${p.total} topics</small></div></div>
          `).join("")}</div>
          <button class="btn btn-soft" style="width:100%;margin-top:17px" data-page="roadmap">Explore learning roadmap</button>
        </section>

        <section class="card card-pad">
          <div class="card-title-row"><h3>Quick access</h3></div>
          <div class="quick-links">
            <button class="btn btn-soft" style="width:100%;margin-bottom:8px" data-page="assessments">📝 Take an assessment</button>
            <button class="btn btn-soft" style="width:100%;margin-bottom:8px" data-page="flashcards">🗂️ Review flashcards</button>
            <button class="btn btn-soft" style="width:100%" data-page="playground">💻 Code playground</button>
          </div>
        </section>

        <section class="card card-pad">
          <div class="card-title-row"><h3>Quick revision</h3><span class="pill">${state.mistakes.length} to revisit</span></div>
          ${state.mistakes.length
            ? `<p class="small muted">You have questions marked for revision.</p><button class="btn btn-soft" data-page="review">Review mistakes →</button>`
            : `<div class="empty-state" style="padding:8px"><div class="empty-icon">✦</div><strong>You're all caught up</strong><p>Missed quiz answers will appear here.</p></div>`
          }
        </section>
      </div>
    </div>`;
  }

  // ── Learning Roadmap ──
  function roadmap() {
    return `${heading("YOUR LEARNING PATH", "A structured roadmap for Java mastery.", "Learn in sequence from fundamentals through OOP, collections, streams, and practical projects.")}
    <div class="grid" style="gap:14px">
      ${phaseData().map(p => `
        <section class="card roadmap-phase">
          <div class="roadmap-head">
            <div class="phase-number">${p.n}</div>
            <div style="flex:1">
              <h3>${p.title}</h3>
              <p>${esc(p.description)}</p>
            </div>
            <span class="pill purple">${p.total} topics</span>
          </div>
          <div class="roadmap-topics">
            ${p.ids.map(id => {
              const t = topicById(id);
              return `<button class="roadmap-topic" data-open-topic="${id}">${esc(t.title)}</button>`;
            }).join("")}
          </div>
          <div style="margin-top:15px">
            <button class="btn btn-soft" data-open-topic="${p.ids[0]}">Start phase →</button>
          </div>
        </section>
      `).join("")}
    </div>`;
  }

  // ── All Topics ──
  function topicsPage() {
    return `${heading("TOPIC LIBRARY", "All Java topics.", "A focused Java syllabus: fundamentals, OOP, strings, dates, exceptions, collections, streams, and practical projects.")}
    <div class="tabs" id="topic-filters">
      <button class="tab active" data-filter="all">All topics (${topics.length})</button>
      ${phaseData().map(p => `<button class="tab" data-filter="${p.n}">Phase ${p.n}: ${p.title}</button>`).join("")}
    </div>
    <div class="grid topic-grid" id="topic-grid">${topics.map(topicCard).join("")}</div>`;
  }

  // ── Lesson Page (the main content page) ──
  function lessonPage() {
    const t = topicById(state.currentTopic);
    if (!t) return topicsPage();

    const idx = topics.findIndex(x => x.id === t.id);
    const prevTopic = idx > 0 ? topics[idx - 1] : null;
    const nextTopic = idx < topics.length - 1 ? topics[idx + 1] : null;

    // Build the main lesson content
    let mainContent = "";

    // If the topic has rich HTML content, use it
    if (t.content) {
      mainContent = t.content;
    } else {
      // Fallback for old-format topics (from original topics.js)
      mainContent = buildLegacyContent(t);
    }

    return `${heading(`PHASE ${phaseFor(t.id)} · ${t.level.toUpperCase()}`, esc(t.title), esc(t.description))}
    <div class="topic-detail">
      <article class="card lesson-main">
        <div class="pill purple">◷ ${t.minutes} minute lesson</div>
        ${mainContent}
        <hr class="divider">
        <div class="lesson-nav-bottom">
          ${prevTopic ? `<button class="btn" data-open-topic="${prevTopic.id}">← ${esc(prevTopic.title)}</button>` : '<span></span>'}
          ${nextTopic ? `<button class="btn btn-primary" data-open-topic="${nextTopic.id}">${esc(nextTopic.title)} →</button>` : '<span></span>'}
        </div>
      </article>
      <aside class="lesson-aside">
        <section class="card">
          <h3>Learning objectives</h3>
          <div class="check-list">${t.objectives.map(x => `<div class="check-row">${esc(x)}</div>`).join("")}</div>
        </section>
        <section class="card">
          <h3>Bookmark</h3>
          <p class="muted small">Save this topic for quick access later.</p>
          <button class="btn ${state.bookmarks.includes(t.id) ? 'btn-primary' : 'btn-soft'}" style="width:100%" data-bookmark="${t.id}">${state.bookmarks.includes(t.id) ? "★ Bookmarked" : "☆ Bookmark topic"}</button>
        </section>
        <section class="card">
          <h3>Quick flashcard</h3>
          <p class="small">${esc(flashcards.find(f => f[2] === t.id)?.[0] || "Review related flashcards for this topic.")}</p>
          <button class="btn btn-soft" style="width:100%" data-page="flashcards">Review flashcards →</button>
        </section>
        ${getRelatedTopics(t.id)}
      </aside>
    </div>`;
  }

  function buildLegacyContent(t) {
    // Convert old-format topic data to HTML content
    return `
      <h2>What is it?</h2>
      <p>${esc(t.definition || '')}</p>
      <h2>Why does it exist?</h2>
      <p>${esc(t.why || '')}</p>
      <h2>Runnable example</h2>
      <p class="muted small">Java 17 baseline · Expected output shown below has not been executed in this browser.</p>
      <div class="code-block"><div class="code-header"><span>Example.java · Java</span><button data-copy-code="${encodeURIComponent(t.code || '')}">Copy code</button></div><pre><code>${esc((t.code || '').replace(/\\n/g, "\n"))}</code></pre></div>
      <div class="output-label">Expected output</div>
      <div class="output-box">${esc(t.output || '')}</div>
      <h2>Line-by-line explanation</h2>
      <ol>${(t.explanation || []).map(x => `<li>${esc(x)}</li>`).join("")}</ol>
      <h2>Where would you use this?</h2>
      <p>${esc(t.use || '')}</p>
      <h2>Common mistakes to avoid</h2>
      <ul>${(t.mistakes || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${t.comparison ? `<h2>Compare related concepts</h2>
      <table class="compare-table"><thead><tr><th>Concept</th><th>Remember</th></tr></thead><tbody>${t.comparison.map(r => `<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table>` : ''}
      ${t.exercise ? `<div class="callout"><strong>Practice task</strong><br>${esc(t.exercise)} Try it yourself before looking up a solution.</div>` : ''}
    `;
  }

  function getRelatedTopics(currentId) {
    const phase = phaseFor(currentId);
    const phaseTopics = PHASES.find(p => p.n === phase);
    if (!phaseTopics) return "";
    const related = phaseTopics.ids.filter(id => id !== currentId).slice(0, 4);
    if (!related.length) return "";
    return `<section class="card">
      <h3>Related topics</h3>
      <div class="check-list">${related.map(id => {
        const t = topicById(id);
        return `<button class="related-topic-btn" data-open-topic="${id}"><span>${t.icon}</span> ${esc(t.title)}</button>`;
      }).join("")}</div>
    </section>`;
  }

  // ── Flashcards ──
  function flashcardPage() {
    const f = flashcards[currentFlash % flashcards.length];
    if (!f) return `${heading("FLASHCARDS", "No flashcards available.", "Flashcards will appear once content is loaded.")}`;
    return `${heading("ACTIVE RECALL", "Flashcards.", "Recall the idea first, then flip the card. Rate it honestly so you can decide what to revisit.")}
    <div style="max-width:720px;margin:0 auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <span class="pill purple">${currentFlash + 1} / ${flashcards.length}</span>
        <span class="muted small">${f[3]} · ${esc(topicById(f[2])?.title || 'General')}</span>
      </div>
      <article class="card flashcard" id="flashcard" role="button" tabindex="0" aria-label="Flip flashcard">
        <div>
          <div class="eyebrow">${flashFlipped ? "ANSWER" : "QUESTION · TAP TO FLIP"}</div>
          <h2>${esc(flashFlipped ? f[1] : f[0])}</h2>
          ${flashFlipped ? `<p>Related topic: ${esc(topicById(f[2])?.title || 'General')}</p>` : `<p>Try to answer from memory before revealing the back.</p>`}
        </div>
      </article>
      <div class="flash-controls">
        <button class="btn" data-flash-prev>← Previous</button>
        <button class="btn btn-primary" data-flip>${flashFlipped ? "Show question" : "Flip card"}</button>
        <button class="btn" data-flash-next>Next →</button>
        <button class="btn" data-shuffle>⤨ Shuffle</button>
      </div>
      <div class="section-heading"><h2>How well did you know it?</h2></div>
      <div class="flash-controls">
        <button class="btn" data-rate="Easy">Easy</button>
        <button class="btn" data-rate="Medium">Medium</button>
        <button class="btn" data-rate="Hard">Hard · revisit</button>
      </div>
      <p class="muted small" style="text-align:center;margin-top:14px">Tip: use ← / → to move between cards and Space to flip.</p>
    </div>`;
  }

  // ── Assessments ──
  function assessmentsPage() {
    return `${heading("TEST YOUR UNDERSTANDING", "Assessments.", "Practice questions covering all Java topics. Filter by topic, difficulty, or take mixed assessments.")}
    <div class="grid dashboard-grid">
      <div>
        <div class="assessment-categories">
          <h3>Assessment Categories</h3>
          <div class="grid assessment-grid">
            <button class="card card-pad assessment-cat" data-start-assessment="topic">
              <div class="stat-icon">📚</div>
              <strong>Topic-wise Quiz</strong>
              <p class="small muted">Practice questions filtered by specific Java topic.</p>
            </button>
            <button class="card card-pad assessment-cat" data-start-assessment="mixed">
              <div class="stat-icon">🎯</div>
              <strong>Mixed Java Assessment</strong>
              <p class="small muted">Random questions across all topics.</p>
            </button>
            <button class="card card-pad assessment-cat" data-start-assessment="output">
              <div class="stat-icon">🔍</div>
              <strong>Output Prediction</strong>
              <p class="small muted">Predict what Java code will print.</p>
            </button>
            <button class="card card-pad assessment-cat" data-start-assessment="oop">
              <div class="stat-icon">🏗️</div>
              <strong>OOP & Polymorphism</strong>
              <p class="small muted">Inheritance, overriding, abstraction questions.</p>
            </button>
            <button class="card card-pad assessment-cat" data-start-assessment="collections">
              <div class="stat-icon">📦</div>
              <strong>Collections & Streams</strong>
              <p class="small muted">List, Set, Map, Stream, and Collector questions.</p>
            </button>
            <button class="card card-pad assessment-cat" data-start-assessment="debugging">
              <div class="stat-icon">🐛</div>
              <strong>Debugging & Error Finding</strong>
              <p class="small muted">Find compilation errors and fix logical bugs.</p>
            </button>
          </div>
        </div>

        <div class="section-heading" style="margin-top:30px"><h2>Quick Stats</h2></div>
        <div class="grid stat-grid" style="grid-template-columns:repeat(3,1fr)">
          <div class="card stat-card"><div class="stat-top">Total Questions<span class="stat-icon">📝</span></div><div class="stat-value">${assessments.length}</div><div class="stat-note">In the question bank</div></div>
          <div class="card stat-card"><div class="stat-top">Attempts<span class="stat-icon">✎</span></div><div class="stat-value">${state.quizScores.length}</div><div class="stat-note">${state.quizScores.length ? `Latest: ${state.quizScores[state.quizScores.length - 1].score}%` : "No attempts yet"}</div></div>
          <div class="card stat-card"><div class="stat-top">For Revision<span class="stat-icon">↻</span></div><div class="stat-value">${state.mistakes.length}</div><div class="stat-note">Questions to revisit</div></div>
        </div>
      </div>

      <aside class="side-stack">
        <section class="card card-pad">
          <h3 style="font:700 14px Manrope;margin:0 0 12px">Topic Filter</h3>
          <select id="assessment-topic-filter" class="form-select" style="width:100%;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--text);margin-bottom:8px">
            <option value="all">All Topics</option>
            ${PHASES.map(p => `<optgroup label="Phase ${p.n}: ${p.title}">${p.ids.map(id => `<option value="${id}">${esc(topicById(id).title)}</option>`).join("")}</optgroup>`).join("")}
          </select>
          <h3 style="font:700 14px Manrope;margin:12px 0 8px">Difficulty</h3>
          <select id="assessment-difficulty-filter" class="form-select" style="width:100%;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--text);margin-bottom:12px">
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button class="btn btn-primary" style="width:100%" data-start-assessment="topic">Start Filtered Quiz →</button>
        </section>
        <section class="card card-pad">
          <h3 style="font:700 14px Manrope;margin:0 0 10px">Assessment Tips</h3>
          <p class="muted small">• Read every option carefully before answering.</p>
          <p class="muted small">• In Java, code can compile successfully but still contain a logical mistake.</p>
          <p class="muted small">• For output prediction, trace execution step by step.</p>
          <p class="muted small">• Mark tricky questions for revision.</p>
        </section>
      </aside>
    </div>`;
  }

  function assessmentQuizPage() {
    if (!assessmentQuestions.length) {
      return assessmentsPage();
    }
    const q = assessmentQuestions[assessmentIndex];
    if (!q) return assessmentsPage();

    const isMulti = q.type === "multi-select";
    const inputType = isMulti ? "checkbox" : "radio";

    return `${heading("ASSESSMENT", `Question ${assessmentIndex + 1} of ${assessmentQuestions.length}`, esc(topicById(q.topic)?.title || 'General') + ' · ' + (q.difficulty || 'medium'))}
    <div class="grid dashboard-grid">
      <section class="card quiz-question">
        <div class="card-title-row">
          <span class="pill purple">${q.type.replace("-", " ")}</span>
          <span class="pill">${esc(topicById(q.topic)?.title || '')}</span>
        </div>
        <h3>${q.question}</h3>
        ${q.code ? `<div class="code-block"><div class="code-header"><span>Java</span></div><pre><code>${esc(q.code)}</code></pre></div>` : ''}
        <div class="answer-list">
          ${q.options.map((o, i) => `
            <label class="answer-option ${assessmentAnswered ? (isCorrectOption(q, i) ? 'correct-answer' : (isSelectedOption(i) ? 'wrong-answer' : '')) : ''}">
              <input type="${inputType}" name="quiz-answer" value="${i}" ${isSelectedOption(i) ? "checked" : ""} ${assessmentAnswered ? "disabled" : ""}>
              <span>${esc(o)}</span>
            </label>
          `).join("")}
        </div>
        ${assessmentAnswered ? `
          <div class="feedback ${isAnswerCorrect(q) ? "correct" : "incorrect"}">
            <strong>${isAnswerCorrect(q) ? "✓ Correct!" : "✗ Not quite."}</strong>
            <p>${q.explanation}</p>
            ${q.codeAnswer ? `<div class="code-block" style="margin-top:10px"><div class="code-header"><span>Corrected Code</span></div><pre><code>${esc(q.codeAnswer)}</code></pre></div>` : ''}
          </div>
        ` : ''}
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px">
          ${!assessmentAnswered
            ? `<button class="btn btn-primary" id="submit-answer" ${(assessmentChoice === null && assessmentMultiChoices.length === 0) ? "disabled" : ""}>Submit answer</button>`
            : `<button class="btn btn-primary" id="next-question">Next question →</button>
               <button class="btn" data-mark-mistake="${q.id}">Mark for revision</button>`
          }
          <button class="btn" data-page="assessments">Back to assessments</button>
        </div>
      </section>
      <aside class="side-stack">
        <section class="card card-pad">
          <h3 style="font:700 14px Manrope;margin:0 0 12px">Quiz Progress</h3>
          <p class="muted small">Question ${assessmentIndex + 1} of ${assessmentQuestions.length}</p>
          <div class="progress-track"><div class="progress-fill" style="width:${Math.round((assessmentIndex + 1) / assessmentQuestions.length * 100)}%"></div></div>
        </section>
        <section class="card card-pad">
          <h3 style="font:700 14px Manrope;margin:0 0 10px">Question Type</h3>
          <p class="muted small">${getQuestionTypeDescription(q.type)}</p>
        </section>
      </aside>
    </div>`;
  }

  function isSelectedOption(i) {
    const q = assessmentQuestions[assessmentIndex];
    if (q?.type === "multi-select") return assessmentMultiChoices.includes(i);
    return assessmentChoice === i;
  }

  function isCorrectOption(q, i) {
    if (Array.isArray(q.answer)) return q.answer.includes(i);
    return q.answer === i;
  }

  function isAnswerCorrect(q) {
    if (Array.isArray(q.answer)) {
      return q.answer.length === assessmentMultiChoices.length &&
        q.answer.every(a => assessmentMultiChoices.includes(a));
    }
    return assessmentChoice === q.answer;
  }

  function getQuestionTypeDescription(type) {
    const map = {
      "mcq": "Single correct answer. Select the best option.",
      "multi-select": "Multiple correct answers. Select ALL that apply.",
      "output-prediction": "Predict what the code will output when executed.",
      "find-error": "Find the compilation or runtime error in the code.",
      "debugging": "Identify and fix the bug in the code.",
      "fill-blank": "Fill in the missing code to complete the program.",
      "code-completion": "Complete the code to achieve the desired behavior.",
      "conceptual": "Test your understanding of Java concepts.",
      "scenario": "Apply your knowledge to a real-world scenario."
    };
    return map[type] || "Answer the question below.";
  }

  function startAssessment(mode) {
    assessmentMode = mode;
    let filtered = [...assessments];

    // Apply topic filter
    const topicFilter = $("#assessment-topic-filter")?.value || "all";
    const diffFilter = $("#assessment-difficulty-filter")?.value || "all";

    switch (mode) {
      case "topic":
        if (topicFilter !== "all") filtered = filtered.filter(q => q.topic === topicFilter);
        break;
      case "mixed":
        shuffleArray(filtered);
        break;
      case "output":
        filtered = filtered.filter(q => q.type === "output-prediction");
        break;
      case "oop":
        filtered = filtered.filter(q => ["inheritance", "polymorphism", "abstraction-interfaces", "constructors", "encapsulation", "static-members", "final-keyword"].includes(q.topic));
        break;
      case "collections":
        filtered = filtered.filter(q => ["collections-overview", "list-arraylist", "set-implementations", "map-implementations", "comparable-comparator", "iterators-optional", "streams-basics", "collectors-grouping", "functional-interfaces"].includes(q.topic));
        break;
      case "debugging":
        filtered = filtered.filter(q => ["find-error", "debugging"].includes(q.type));
        break;
      case "theory":
        filtered = filtered.filter(q => q.type === "conceptual");
        break;
    }

    // Apply difficulty filter
    if (diffFilter !== "all") {
      filtered = filtered.filter(q => q.difficulty === diffFilter);
    }

    if (!filtered.length) {
      toast("No questions found for this filter. Try a different combination.");
      return;
    }

    // Shuffle for variety
    if (mode !== "mixed") shuffleArray(filtered);

    assessmentQuestions = filtered.slice(0, 25); // Max 25 per session
    assessmentIndex = 0;
    assessmentChoice = null;
    assessmentMultiChoices = [];
    assessmentAnswered = false;
    currentPage = "assessment-quiz";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // ── Code Playground ──
  function playgroundPage() {
    return `${heading("EXPERIMENT SAFELY", "Code Playground.", "Edit this sample and copy it into a local Java 17 environment to compile and run. This browser page does not execute Java.")}
    <div class="grid dashboard-grid">
      <section class="card practice-box">
        <div class="card-title-row"><h3>Employee.java</h3><span class="pill">Editable sample</span></div>
        <textarea class="editor" id="code-editor" spellcheck="false">class Employee {
    private int employeeId;
    private String employeeName;
    private double salary;

    Employee(int id, String name, double salary) {
        this.employeeId = id;
        this.employeeName = name;
        this.salary = salary;
    }

    void displayDetails() {
        System.out.println(employeeId + " - " + employeeName);
        System.out.println("Salary: " + salary);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp1 = new Employee(101, "Ravi", 35000.0);
        Employee emp2 = new Employee(102, "Priya", 42000.0);
        emp1.displayDetails();
        emp2.displayDetails();
    }
}</textarea>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
          <button class="btn btn-primary" id="copy-editor">Copy code</button>
          <button class="btn" id="reset-editor">Reset example</button>
        </div>
        <div class="callout">For an honest workflow: save as <strong>Main.java</strong>, then run <code>javac Main.java</code> and <code>java Main</code> in a Java 17 terminal. The output below is illustrative.</div>
        <div class="output-label">Illustrative expected output</div>
        <div class="output-box">101 - Ravi
Salary: 35000.0
102 - Priya
Salary: 42000.0</div>
      </section>
      <aside class="side-stack">
        <section class="card card-pad">
          <h3 style="font:700 14px Manrope;margin:0 0 10px">Try changing</h3>
          <div class="check-list">
            <div class="check-row">Add a department field to Employee.</div>
            <div class="check-row">Create a Developer subclass that extends Employee.</div>
            <div class="check-row">Override displayDetails() in Developer.</div>
            <div class="check-row">Use Employee reference with Developer object.</div>
            <div class="check-row">Store employees in ArrayList and iterate.</div>
          </div>
        </section>
        <section class="card card-pad">
          <h3 style="font:700 14px Manrope;margin:0 0 10px">No fake execution</h3>
          <p class="muted small">Java is not compiled in the browser. This playground provides editing and copy support only; displayed output is illustrative.</p>
        </section>
      </aside>
    </div>`;
  }

  // ── Assignments ──
  function assignmentsPage() {
    const assignments = window.JAVAPATH_ASSIGNMENTS || { mcq: [], practical: [] };
    
    return `${heading("PRACTICAL ASSIGNMENTS", "Assignments", "Practice your Java skills with MCQ questions and practical coding exercises with solutions.")}
    <div class="tabs" id="assignment-tabs">
      <button class="tab active" data-assignment-tab="mcq">MCQ Assignments (${assignments.mcq.length})</button>
      <button class="tab" data-assignment-tab="practical">Practical Assignments (${assignments.practical.length})</button>
    </div>
    <div id="assignment-content">
      ${renderMCQAssignments(assignments.mcq)}
    </div>`;
  }

  function renderMCQAssignments(mcqAssignments) {
    if (!mcqAssignments || mcqAssignments.length === 0) {
      return `<div class="card card-pad"><div class="empty-state"><div class="empty-icon">📋</div><strong>No MCQ assignments available</strong></div></div>`;
    }

    return `<div class="grid" style="gap:17px">
      ${mcqAssignments.map((q, idx) => `
        <section class="card card-pad assignment-item" data-assignment-id="${q.id}">
          <div class="card-title-row">
            <span class="pill purple">Question ${idx + 1}</span>
            <span class="pill">${q.difficulty || 'Medium'}</span>
          </div>
          <h3 style="font:600 15px Manrope,sans-serif;margin:0 0 15px;white-space:pre-line">${esc(q.question)}</h3>
          <div class="answer-list">
            ${q.options.map((opt, i) => `
              <div class="answer-option ${i === q.answer ? 'correct-answer' : ''}">
                <span>${String.fromCharCode(65 + i)}.</span>
                <span>${esc(opt)}</span>
                ${i === q.answer ? '<span class="pill green" style="margin-left:auto">✓ Correct</span>' : ''}
              </div>
            `).join("")}
          </div>
          <div class="feedback correct" style="margin-top:15px">
            <strong>Solution:</strong>
            <p style="margin:5px 0 0">${esc(q.explanation)}</p>
          </div>
        </section>
      `).join("")}
    </div>`;
  }

  function renderPracticalAssignments(practicalAssignments) {
    if (!practicalAssignments || practicalAssignments.length === 0) {
      return `<div class="card card-pad"><div class="empty-state"><div class="empty-icon">💻</div><strong>No practical assignments available</strong></div></div>`;
    }

    return `<div class="grid" style="gap:17px">
      ${practicalAssignments.map((p, idx) => `
        <section class="card card-pad assignment-item" data-assignment-id="${p.id}">
          <div class="card-title-row">
            <span class="pill purple">Exercise ${idx + 1}</span>
            <span class="pill">${p.difficulty || 'Medium'}</span>
          </div>
          <h3 style="font:700 16px Manrope,sans-serif;margin:0 0 10px">${esc(p.title)}</h3>
          <p style="color:var(--muted);font-size:13px;margin:0 0 15px">${esc(p.description)}</p>
          <div style="margin-bottom:15px">
            <strong style="font-size:12px">Topics:</strong>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:5px">
              ${p.topics.map(t => `<span class="pill" style="font-size:10px">${esc(t)}</span>`).join("")}
            </div>
          </div>
          <details>
            <summary style="padding:12px 16px;background:var(--accent-soft);cursor:pointer;font-weight:600;font-size:13px;color:var(--accent);border-radius:8px">View Solution</summary>
            <div style="margin-top:15px">
              <div class="code-block">
                <div class="code-header"><span>Solution.java</span><button data-copy-code="${encodeURIComponent(p.solution)}">Copy code</button></div>
                <pre><code>${esc(p.solution)}</code></pre>
              </div>
              <div class="callout" style="margin-top:15px">
                <strong>Explanation:</strong>
                <p style="margin:5px 0 0">${esc(p.explanation)}</p>
              </div>
            </div>
          </details>
        </section>
      `).join("")}
    </div>`;
  }

  // ── Review Mistakes ──
  function reviewPage() {
    const hard = flashcards.filter((f, i) => state.flashcardStatus[i] === "Hard");
    const missed = state.mistakes.map(id => assessments.find(q => q.id === id)).filter(Boolean);
    const bookmarked = state.bookmarks.map(id => topicById(id)).filter(t => t && t.id);

    return `${heading("REVISIT & REINFORCE", "Review Mistakes.", "Your bookmarks and difficult items collect here so revision is deliberate.")}
    <div class="grid two-col">
      <section class="card card-pad">
        <div class="card-title-row"><h3>Bookmarked topics</h3><span class="pill">${bookmarked.length}</span></div>
        ${bookmarked.length
          ? `<div class="lesson-list">${bookmarked.map(t => `
              <button class="lesson-row" style="width:100%;background:transparent;border:0;text-align:left;color:var(--text)" data-open-topic="${t.id}">
                <span class="lesson-dot">${t.icon}</span>
                <span class="lesson-meta"><strong>${esc(t.title)}</strong><small>${esc(t.description)}</small></span>
                <span class="lesson-arrow">↗</span>
              </button>`).join("")}</div>`
          : `<div class="empty-state"><strong>No bookmarks yet</strong><p>Bookmark topics from a lesson page.</p></div>`
        }
      </section>
      <section class="card card-pad">
        <div class="card-title-row"><h3>Hard flashcards</h3><span class="pill">${hard.length}</span></div>
        ${hard.length
          ? hard.map(f => `<p class="small">• ${esc(f[0])}</p>`).join("")
          : `<div class="empty-state"><strong>No hard cards marked</strong><p>Rate a flashcard as Hard to add it here.</p></div>`
        }
        <button class="btn btn-soft" data-page="flashcards" style="margin-top:10px">Review flashcards</button>
      </section>
      <section class="card card-pad">
        <div class="card-title-row"><h3>Questions to revisit</h3><span class="pill">${missed.length}</span></div>
        ${missed.length
          ? missed.map(q => `<p class="small">• ${esc(q.question)}</p>`).join("")
          : `<div class="empty-state"><strong>No questions flagged</strong><p>Mark assessment questions for revision after answering.</p></div>`
        }
        <button class="btn btn-soft" data-page="assessments" style="margin-top:10px">Practice again</button>
      </section>
    </div>`;
  }

  // ── Settings ──
  function settingsPage() {
    return `${heading("MAKE IT YOURS", "Settings.", "Control your appearance and locally saved data.")}
    <section class="card card-pad">
      <div class="settings-row">
        <div><strong>Appearance</strong><p>Switch between light and dark reading surfaces.</p></div>
        <button class="btn" id="theme-toggle-setting">${state.theme === "dark" ? "Switch to light" : "Switch to dark"}</button>
      </div>
      <div class="settings-row">
        <div><strong>Reset saved data</strong><p>Remove locally saved bookmarks, quiz history, and flashcard ratings.</p></div>
        <button class="btn btn-danger" id="reset-data">Reset data</button>
      </div>
    </section>
    <div class="callout">Your data is stored in this browser using localStorage. Clearing browser site data may remove it.</div>`;
  }

  // ══════════════════════════════════════════════
  //  RENDER & BIND
  // ══════════════════════════════════════════════

  function render() {
    header();
    const content = $("#page-content");
    const renderers = {
      dashboard,
      roadmap,
      topics: topicsPage,
      lesson: lessonPage,
      flashcards: flashcardPage,
      assessments: assessmentsPage,
      "assessment-quiz": assessmentQuizPage,
      playground: playgroundPage,
      assignments: assignmentsPage,
      review: reviewPage,
      settings: settingsPage
    };
    content.innerHTML = (renderers[currentPage] || dashboard)();
    bindPageActions();
  }

  function openTopic(id) {
    state.currentTopic = id;
    saveState();
    currentPage = "lesson";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function bindPageActions() {
    // Navigation
    $$("[data-page]").forEach(el =>
      el.addEventListener("click", () => setPage(el.dataset.page))
    );

    // Open topic
    $$("[data-open-topic]").forEach(el => {
      el.addEventListener("click", () => openTopic(el.dataset.openTopic));
      el.addEventListener("keydown", e => {
        if ((e.key === "Enter" || e.key === " ") && el.tagName !== "BUTTON") {
          e.preventDefault();
          openTopic(el.dataset.openTopic);
        }
      });
    });

    // Bookmarks
    $$("[data-bookmark]").forEach(el =>
      el.addEventListener("click", () => {
        const id = el.dataset.bookmark;
        state.bookmarks = state.bookmarks.includes(id)
          ? state.bookmarks.filter(x => x !== id)
          : [...state.bookmarks, id];
        saveState();
        render();
      })
    );

    // Copy code buttons (both in lesson content and playground)
    $$("[data-copy-code]").forEach(el =>
      el.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(decodeURIComponent(el.dataset.copyCode));
          toast("Code copied.");
        } catch { toast("Clipboard access unavailable. Select and copy manually."); }
      })
    );

    // Copy all code blocks in lesson content
    $$(".code-header button").forEach(btn => {
      if (!btn.dataset.copyCode) {
        btn.addEventListener("click", async () => {
          const codeBlock = btn.closest(".code-block");
          const code = codeBlock?.querySelector("code")?.textContent;
          if (code) {
            try {
              await navigator.clipboard.writeText(code);
              toast("Code copied.");
            } catch { toast("Select and copy manually."); }
          }
        });
      }
    });

    // Flashcard interactions
    const flash = $("#flashcard");
    if (flash) {
      const flip = () => { flashFlipped = !flashFlipped; render(); };
      flash.addEventListener("click", flip);
      flash.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      });
    }
    $$("[data-flip]").forEach(el => el.addEventListener("click", () => { flashFlipped = !flashFlipped; render(); }));
    $$("[data-flash-prev]").forEach(el => el.addEventListener("click", () => { currentFlash = (currentFlash - 1 + flashcards.length) % flashcards.length; flashFlipped = false; render(); }));
    $$("[data-flash-next]").forEach(el => el.addEventListener("click", () => { currentFlash = (currentFlash + 1) % flashcards.length; flashFlipped = false; render(); }));
    $$("[data-shuffle]").forEach(el => el.addEventListener("click", () => { currentFlash = Math.floor(Math.random() * flashcards.length); flashFlipped = false; render(); }));
    $$("[data-rate]").forEach(el => el.addEventListener("click", () => {
      state.flashcardStatus[currentFlash] = el.dataset.rate;
      saveState();
      currentFlash = (currentFlash + 1) % flashcards.length;
      flashFlipped = false;
      render();
      toast("Flashcard rating saved.");
    }));

    // Topic filters
    $$("[data-filter]").forEach(el => el.addEventListener("click", () => {
      $$("#topic-filters .tab").forEach(t => t.classList.toggle("active", t === el));
      const n = el.dataset.filter;
      const filtered = topics.filter(t => n === "all" || phaseFor(t.id) === Number(n));
      const grid = $("#topic-grid");
      if (grid) {
        grid.innerHTML = filtered.map(topicCard).join("");
        bindOpenTopicCards();
      }
    }));

    // Assignment tabs
    $$("[data-assignment-tab]").forEach(el => el.addEventListener("click", () => {
      $$("#assignment-tabs .tab").forEach(t => t.classList.toggle("active", t === el));
      const tab = el.dataset.assignmentTab;
      const assignments = window.JAVAPATH_ASSIGNMENTS || { mcq: [], practical: [] };
      const content = $("#assignment-content");
      if (content) {
        if (tab === "mcq") {
          content.innerHTML = renderMCQAssignments(assignments.mcq);
        } else if (tab === "practical") {
          content.innerHTML = renderPracticalAssignments(assignments.practical);
        }
        bindPageActions();
      }
    }));

    // Assessment interactions
    $$("[data-start-assessment]").forEach(el =>
      el.addEventListener("click", () => startAssessment(el.dataset.startAssessment))
    );

    // Quiz answer selection
    const radios = $$('input[name="quiz-answer"]');
    radios.forEach(r => r.addEventListener("change", () => {
      const q = assessmentQuestions[assessmentIndex];
      if (q?.type === "multi-select") {
        const val = Number(r.value);
        if (r.checked) {
          if (!assessmentMultiChoices.includes(val)) assessmentMultiChoices.push(val);
        } else {
          assessmentMultiChoices = assessmentMultiChoices.filter(v => v !== val);
        }
      } else {
        assessmentChoice = Number(r.value);
      }
      const submit = $("#submit-answer");
      if (submit) submit.disabled = false;
    }));

    // Submit answer
    $("#submit-answer")?.addEventListener("click", () => {
      const q = assessmentQuestions[assessmentIndex];
      if (!q) return;
      if (q.type === "multi-select" && assessmentMultiChoices.length === 0) return;
      if (q.type !== "multi-select" && assessmentChoice === null) return;

      assessmentAnswered = true;
      const correct = isAnswerCorrect(q);

      if (!correct && !state.mistakes.includes(q.id)) {
        state.mistakes.push(q.id);
      }
      state.quizScores.push({
        score: correct ? 100 : 0,
        date: new Date().toISOString(),
        question: q.id
      });
      saveState();
      render();
    });

    // Next question
    $("#next-question")?.addEventListener("click", () => {
      assessmentIndex++;
      if (assessmentIndex >= assessmentQuestions.length) {
        toast("Assessment complete! Starting a new set.");
        currentPage = "assessments";
        render();
        return;
      }
      assessmentChoice = null;
      assessmentMultiChoices = [];
      assessmentAnswered = false;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Mark for revision
    $$("[data-mark-mistake]").forEach(el =>
      el.addEventListener("click", () => {
        if (!state.mistakes.includes(el.dataset.markMistake))
          state.mistakes.push(el.dataset.markMistake);
        saveState();
        toast("Added to revision.");
      })
    );

    // Playground
    $("#copy-editor")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText($("#code-editor").value);
        toast("Code copied.");
      } catch { toast("Select and copy manually."); }
    });
    $("#reset-editor")?.addEventListener("click", () => {
      const e = $("#code-editor");
      if (e) e.value = e.defaultValue;
    });

    // Settings
    $("#theme-toggle-setting")?.addEventListener("click", toggleTheme);
    $("#reset-data")?.addEventListener("click", () => {
      if (confirm("Reset all JavaPath bookmarks, quiz history, and flashcard data? This cannot be undone.")) {
        state = { ...defaultState };
        saveState();
        applyTheme();
        setPage("dashboard");
        toast("Data reset.");
      }
    });

    // Add copy buttons to all code blocks in lesson content
    addCopyButtons();
  }

  function addCopyButtons() {
    $$(".lesson-main .code-block").forEach(block => {
      const header = block.querySelector(".code-header");
      if (header && !header.querySelector(".copy-btn-added")) {
        const btn = document.createElement("button");
        btn.textContent = "Copy code";
        btn.className = "copy-btn-added";
        btn.addEventListener("click", async () => {
          const code = block.querySelector("code")?.textContent;
          if (code) {
            try {
              await navigator.clipboard.writeText(code);
              btn.textContent = "Copied!";
              setTimeout(() => btn.textContent = "Copy code", 1500);
            } catch { toast("Select and copy manually."); }
          }
        });
        // Only add if no copy button exists
        if (!header.querySelector("button")) {
          header.appendChild(btn);
        }
      }
    });
  }

  function bindOpenTopicCards() {
    $$("[data-open-topic]").forEach(el =>
      el.addEventListener("click", () => openTopic(el.dataset.openTopic))
    );
  }

  // ── Theme ──
  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
    render();
  }
  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    $("#theme-toggle").textContent = state.theme === "dark" ? "☾" : "☼";
  }

  // ── Toast ──
  let toastTimer;
  function toast(msg) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add("hidden"), 2400);
  }

  // ── Search ──
  function search(query) {
    const results = $("#search-results");
    const q = query.trim().toLowerCase();
    if (!q) { results.classList.add("hidden"); return; }

    const hits = topics.filter(t =>
      [t.title, t.description, ...(t.objectives || [])].join(" ").toLowerCase().includes(q)
    ).slice(0, 8);

    // Also search assessments
    const qHits = assessments.filter(a =>
      (a.question || "").toLowerCase().includes(q)
    ).slice(0, 4);

    let html = "";
    if (hits.length) {
      html += `<div class="search-section-label">Topics</div>`;
      html += hits.map(t => `
        <button class="search-hit" data-search-topic="${t.id}">
          <strong>${esc(t.title)}</strong>
          <small>${esc(t.description)}</small>
        </button>
      `).join("");
    }
    if (qHits.length) {
      html += `<div class="search-section-label">Assessment Questions</div>`;
      html += qHits.map(a => `
        <button class="search-hit" data-search-assessment="${a.topic}">
          <strong>${esc(a.question.substring(0, 80))}${a.question.length > 80 ? '...' : ''}</strong>
          <small>${esc(topicById(a.topic)?.title || '')} · ${a.difficulty}</small>
        </button>
      `).join("");
    }
    if (!html) {
      html = `<div class="empty-state"><strong>No matching results</strong><p>Try a keyword such as constructor, String, Map, or Stream.</p></div>`;
    }

    results.innerHTML = html;
    results.classList.remove("hidden");

    $$("[data-search-topic]", results).forEach(b =>
      b.addEventListener("click", () => {
        results.classList.add("hidden");
        $("#global-search").value = "";
        openTopic(b.dataset.searchTopic);
      })
    );
    $$("[data-search-assessment]", results).forEach(b =>
      b.addEventListener("click", () => {
        results.classList.add("hidden");
        $("#global-search").value = "";
        setPage("assessments");
      })
    );
  }

  // ── Global event listeners ──
  $("#global-search").addEventListener("input", e => search(e.target.value));
  $("#global-search").addEventListener("keydown", e => {
    if (e.key === "Escape") $("#search-results").classList.add("hidden");
    if (e.key === "Enter") {
      const first = $("[data-search-topic]");
      if (first) first.click();
    }
  });
  $("#theme-toggle").addEventListener("click", toggleTheme);
  $("#mobile-menu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));

  document.addEventListener("click", e => {
    if (!e.target.closest(".search-box") && !e.target.closest(".search-results"))
      $("#search-results").classList.add("hidden");
  });

  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      $("#global-search").focus();
    }
    if (currentPage === "flashcards" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
      if (e.key === "ArrowLeft") $("[data-flash-prev]")?.click();
      if (e.key === "ArrowRight") $("[data-flash-next]")?.click();
      if (e.code === "Space") { e.preventDefault(); $("[data-flip]")?.click(); }
    }
  });

  // ── Details/Summary toggle for solutions in content ──
  document.addEventListener("click", e => {
    const details = e.target.closest("details");
    if (details && details.querySelector("summary") === e.target) {
      // Let native browser behavior handle details toggle
    }
  });

  // ── Initialize ──
  applyTheme();
  render();

})();