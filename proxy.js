js

const target = encodeURIComponent("https://api.github.com/repos/openai/gpt-5");
fetch(`https://legislative-ann-vadenjonas-1de36bc6.koyeb.app/cors?url=${target}`)
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
