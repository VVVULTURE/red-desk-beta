// games.js (modified for special Atari embed launches)
// Games App: Restored original Games page logic/UI

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
    // List of games that should use Atari embed
    const atariGames = {
      'Cookie Clicker': 'https://cookieclicker-nu.vercel.app',
      'Dadish 2': 'https://dadish2.vercel.app/',
      'Eaglercraft 1.8': 'https://eagler1-8-8-wasm-gc.vercel.app',
      'Eaglercraft 1.12': 'https://math-class-school.vercel.app'
    };

    // If this game is in the special list, launch Atari embed
    const isAtariGame = Object.entries(atariGames).find(([key, value]) =>
      key === name && value === url
    );

    if (isAtariGame) {
      // Compose atari embed blob link
      // Example: https://atari-embeds.vercel.app/blob?url=<encoded original url>
      const atariBlob = `https://atari-embeds.vercel.app/blob?url=${encodeURIComponent(url)}`;
      window.open(atariBlob, '_blank');
      return;
    }

    // Normal launch for other games
    if (!url) {
      return;
    }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    const appInfo = {
      title: name || 'Game',
      content: () => `<iframe src="${url}" style="width:100%;height:100%;border:none;" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`
    };
    const win = WindowManager.create(appInfo);
    const maxBtn = win.querySelector('button[title="Maximize"]');
    WindowManager.maximize(maxBtn);
  }
};
