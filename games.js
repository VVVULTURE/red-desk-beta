// games.js (modified for Red-desk-beta)
// Games App: Use "open in new blob tab" for Cookie Clicker and Eaglercraft 1.8.8/1.12.2. Other games open normally.

window.Apps = window.Apps || {};
Apps.games = {
  title: 'Games',
  icon: '🎮',
  open(opts = {}) {
    WindowManager.create(this, opts);
  },
  gamesList: [
    { name: 'Cookie Clicker', url: 'https://cookieclicker-nu.vercel.app', blob: true },
    { name: 'Drive Mad', url: 'https://drive-mad1.vercel.app' },
    { name: 'Eaglercraft 1.8', url: 'https://eagler1-8-8-wasm-gc.vercel.app', blob: true },
    { name: 'Eaglercraft 1.12', url: 'https://math-class-school.vercel.app', blob: true },
    { name: 'House of Hazards', url: 'https://house-of-hazards-ashy.vercel.app' },
    { name: 'Dadish 1', url: 'https://dadish.vercel.app' },
    { name: 'Bad Monday Sim', url: 'https://badmondaysim.vercel.app/' },
    { name: 'Dadish 2', url: 'https://dadish2.vercel.app/' },
    { name: 'Stickman hook', url: 'https://stickman-hook-five.vercel.app' },
    { name: 'Bitlife', url: 'https://bitlife1.vercel.app' },
  ],
  content() {
    return `
      <style>
        .game-btn {
          font-size: 1rem;
          padding: 1rem 1.5rem;
        }
      </style>
      <section>
        <h1>Game Buttons</h1>
        <div class="game-btns">
          ${this.gamesList.map((game, idx) =>
            `<button class="game-btn" onclick="Apps.games.openGame(${idx})">${game.name}</button>`
          ).join('')}
        </div>
        <p style="margin-top:2rem;opacity:0.8"><em>Remember to smile 😋</em></p>
      </section>
    `;
  },
  openGame(idx) {
    const game = this.gamesList[idx];
    if (!game || !game.url) return;

    // For Cookie Clicker and Eaglercrafts, open in new blob tab
    if (game.blob) {
      fetch(game.url)
        .then(response => response.text())
        .then(html => {
          const blob = new Blob([html], { type: 'text/html' });
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, '_blank');
        })
        .catch(() => {
          alert('Failed to open game in blob tab.');
        });
      return;
    }

    // All other games: open in window
    let url = game.url;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    const appInfo = {
      title: game.name || 'Game',
      content: () => `<iframe src="${url}" style="width:100%;height:100%;border:none;" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`
    };
    const win = WindowManager.create(appInfo);
    const maxBtn = win.querySelector('button[title="Maximize"]');
    WindowManager.maximize(maxBtn);
  }
};
