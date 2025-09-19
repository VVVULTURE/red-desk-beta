// fetcher.js (modified)
// Web Browser App (uses existing fetch logic)

window.Apps = window.Apps || {};
Apps.fetcher = {
  title: 'Web Browser',
  icon: '🌐',
  open(opts={}) {
    WindowManager.create(this, opts);
  },
  content() {
    return `
      <div>
        <form class="fletcher-box" onsubmit="Apps.fetcher.handleFetch(event)">
          <input type="url" id="desktop-fetcher-input" placeholder="Enter a website link here..." required />
          <button type="submit">Fetch & Open</button>
        </form>
        <p id="desktop-fetcher-status" style="color:var(--accent);margin-top:5px;"></p>
      </div>
    `;
  },
  handleFetch(e) {
    e.preventDefault();
    const input = document.getElementById('desktop-fetcher-input');
    const status = document.getElementById('desktop-fetcher-status');
    let url = input.value.trim();
    if (!url) {
      status.textContent = "Please enter a URL.";
      return;
    }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    status.textContent = "Opening: " + url;
    const appInfo = {
      title: 'Web: ' + new URL(url).hostname,
      content: () => `<iframe src="${url}" style="width:100%;height:100%;border:none;" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`
    };
    const win = WindowManager.create(appInfo);
    const maxBtn = win.querySelector('button[title="Maximize"]');
    WindowManager.maximize(maxBtn);
    status.textContent = "Opened in window!";
    setTimeout(()=>{status.textContent = "";}, 3500);
    input.value = '';
  }
};
