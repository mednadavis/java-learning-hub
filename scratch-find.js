global.window = {};
const fs = require('fs');
eval(fs.readFileSync('data/topics-phase2.js', 'utf8'));
const topics = window.JAVAPATH_PHASE2_TOPICS;
let count = 0;
topics.forEach(t => {
  const matches = t.content.match(/<div class="code-block">[\s\S]*?<\/div>/g) || [];
  console.log(`\n\n--- TOPIC: ${t.id} --- (${matches.length} blocks)`);
  matches.forEach(m => {
    console.log(m);
  });
});
