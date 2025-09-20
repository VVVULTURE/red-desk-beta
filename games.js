// games.js (modified)
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
    // Games that should be launched as Atari embeds blob link in a new tab
    const blobGames = [
      'Cookie Clicker',
      'Eaglercraft 1.8',
      'Eaglercraft 1.12',
      'Dadish 2'
    ];

    if (!url) {
      return;
    }

    if (blobGames.includes(name)) {
      // Create blob link for Atari embeds
      // Format: blob:https://1853742666-atari-embeds.googleusercontent.com/<uuid>
      // We generate a uuid (not cryptographically strong, but works for this purpose)
      function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

      const blobUrl = `blob:https://1853742666-atari-embeds.googleusercontent.com/${uuidv4()}`;

      // The content of the blob should be an iframe that loads the original vercel url
      const iframeHtml = `<iframe src="${url}" style="width:100vw;height:100vh;border:none;" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`;

      // Create the blob and open in new tab
      const blob = new Blob([iframeHtml], { type: 'text/html' });
      const link = URL.createObjectURL(blob);

      // We need to spoof the URL as if it's blob:...atari-embeds.googleusercontent.com/<uuid>
      // But browsers won't let you set the domain for a blob: link.
      // Instead, we use the blob we created and open in new tab.
      // To show the "atari-embeds" format, we can set window.name, but domain will be the origin.

      // Open in new tab
      window.open(link, '_blank');
      return;
    }

    // Normal games: open in an OS window
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
