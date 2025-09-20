// games.js (modified as requested)
// All games use their original logic EXCEPT Cookie Clicker and Eaglercrafts, which use RedDesk launching

window.Apps = window.Apps || {};
Apps.games = {
  title: 'Games',
  icon: '🎮',
  open(opts = {}) {
    WindowManager.create(this, opts);
  },
  gamesList: [
    { name: 'Cookie Clicker', url: 'https://cookieclicker-nu.vercel.app' },
    { name: 'Drive Mad', url: 'https://drive-mad1.vercel.app' },
    { name: 'Eaglercraft 1.8', url: 'https://eagler1-8-8-wasm-gc.vercel.app' },
    { name: 'Eaglercraft 1.12', url: 'https://math-class-school.vercel.app' },
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
          ${this.gamesList.map(game =>
            `<button class="game-btn" onclick="Apps.games.openGame('${game.url}', '${game.name}')">${game.name}</button>`
          ).join('')}
        </div>
        <p style="margin-top:2rem;opacity:0.8"><em>Remember to smile 😋</em></p>
      </section>
    `;
  },
  openGame(url, name) {
    // Use RedDesk window/iframe logic for Cookie Clicker and Eaglercrafts
    const isSpecial =
      name === 'Cookie Clicker' ||
      name.startsWith('Eaglercraft');
    if (isSpecial) {
      // RedDesk launching style (iframe in maximized window)
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
      const appInfo = {
        title: name || 'Game',
        content: () => `<iframe src="${url}" style="width:100%;height:100%;border:none;" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`
      };
      const win = WindowManager.create(appInfo);
      const maxBtn = win.querySelector('button[title="Maximize"]');
      WindowManager.maximize(maxBtn);
    } else {
      // Normal launching style (could be opening in new tab, etc. - here, window as before)
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
      // For demonstration, open in window but do NOT maximize
      const appInfo = {
        title: name || 'Game',
        content: () => `<iframe src="${url}" style="width:100%;height:100%;border:none;" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`
      };
      WindowManager.create(appInfo); // not maximized
    }
  }
};
