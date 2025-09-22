// apps/websitefetcher.js
// Website Fetcher app with custom logo and style

window.Apps = window.Apps || {};
Apps.websitefetcher = {
  title: 'Website Fetcher',
  // Use your uploaded logo file here
  icon: `<img src="assets/fetcher-logo.png" alt="Website Fetcher" style="width:1.6em;height:1.6em;vertical-align:middle;border-radius:50%;background:#232323;">`,
  open(opts = {}) {
    WindowManager.create(this, opts);
  },
  content() {
    return `
      <style>
        .website-fetcher-box {
          background: linear-gradient(135deg, #2a0d0d 0%, #ff2e2e 100%);
          border-radius: 14px;
          padding: 2.2rem 1.5rem 1.8rem 1.5rem;
          box-shadow: 0 6px 24px rgba(255,46,46,0.13);
          color: #fff;
          font-family: 'Orbitron', 'Nunito', Arial, sans-serif;
        }
        .website-fetcher-title {
          font-size: 2.2rem;
          font-weight: bold;
          color: #ff2e2e;
          letter-spacing: .06em;
          margin-bottom: .7rem;
          text-shadow: 0 2px 12px #a00;
        }
        .website-fetcher-input {
          width: 100%;
          font-size: 1.2rem;
          padding: 0.8rem;
          border: 2px solid #ff2e2e;
          border-radius: 8px;
          background: #18181F;
          color: #fff;
          margin-bottom: 1.2rem;
          outline: none;
          transition: border .22s;
        }
        .website-fetcher-input:focus {
          border-color: #ff5555;
        }
        .website-fetcher-btn {
          background: #ff2e2e;
          color: #fff;
          font-size: 1.1rem;
          padding: 0.8rem 1.6rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 2px 10px #ff2e2e60;
          transition: background .18s, transform .18s;
        }
        .website-fetcher-btn:hover {
          background: #d00;
          transform: scale(1.04);
        }
        .website-fetcher-status {
          color: #ff2e2e;
          margin-top: 1rem;
          font-size: 1rem;
          font-family: 'Nunito', Arial, sans-serif;
          text-shadow: 0 1px 8px #900;
        }
      </style>
      <div class="website-fetcher-box">
        <div class="website-fetcher-title">
          Website Fetcher
        </div>
        <form onsubmit="Apps.websitefetcher.handleFetch(event)">
          <input type="url" id="website-fetcher-input" class="website-fetcher-input" placeholder="Paste a website URL here..." required />
          <button type="submit" class="website-fetcher-btn">Fetch & Open</button>
        </form>
        <div id="website-fetcher-status" class="website-fetcher-status"></div>
      </div>
    `;
  },
  handleFetch(e) {
    e.preventDefault();
    const input = document.getElementById('website-fetcher-input');
    const status = document.getElementById('website-fetcher-status');
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
