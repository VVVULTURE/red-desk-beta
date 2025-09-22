// main.js (modified executor app only; other apps unchanged)
// Entrypoint: registers all apps/pages/widgets for context menu and launcher

window.Apps = window.Apps || {};

// Text Editor
Apps.texteditor = {
  title: 'Text Editor',
  icon: '📝',
  open(opts = {}) { WindowManager.create(this, opts); },
  content() {
    return '<textarea style="width:100%;height:220px;" placeholder="Type your notes here..."></textarea>';
  }
};

// Import Games app logic from apps/games.js (do not redefine here!)

// HTML Executor
Apps.executor = {
  title: 'HTML Executor',
  icon: '📄',
  open(opts = {}) { WindowManager.create(this, opts); },
  content() {
    return `
      <div class="executor-box">
        <label for="executor-text">Type HTML to execute:</label>
        <textarea id="executor-text" placeholder="Type or paste your HTML, JS, or CSS here..." style="width:100%;height:120px;"></textarea>
        <button onclick="window.Apps.executor.executeTypedHTML()">Execute Typed HTML</button>
        <label for="executor-file">Or upload a file to execute as HTML:</label>
        <input type="file" id="executor-file" accept="*/*">
        <button onclick="window.Apps.executor.executeUploadedFile()">Execute Uploaded File</button>
        <span id="executor-status" style="color:var(--accent);margin-top:5px;"></span>
      </div>
    `;
  },
  executeTypedHTML() {
    const status = document.getElementById('executor-status');
    const html = document.getElementById('executor-text').value;
    if (!html.trim()) {
      status.textContent = "Please enter HTML or code to execute.";
      return;
    }
    const appInfo = {
      title: 'Executed HTML',
      content: () => `<iframe srcdoc="${html.replace(/"/g, '&quot;')}" style="width:100%;height:100%;border:none;" sandbox="allow-scripts allow-same-origin"></iframe>`
    };
    const win = WindowManager.create(appInfo);
    const maxBtn = win.querySelector('button[title="Maximize"]');
    WindowManager.maximize(maxBtn);
    status.textContent = "Executed in window.";
    setTimeout(() => { status.textContent = ""; }, 3000);
  },
  executeUploadedFile() {
    const status = document.getElementById('executor-status');
    const input = document.getElementById('executor-file');
    const file = input.files[0];
    if (!file) {
      status.textContent = "Please select a file to execute.";
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      const html = e.target.result;
      const appInfo = {
        title: file.name || 'Executed File',
        content: () => `<iframe srcdoc="${html.replace(/"/g, '&quot;')}" style="width:100%;height:100%;border:none;" sandbox="allow-scripts allow-same-origin"></iframe>`
      };
      const win = WindowManager.create(appInfo);
      const maxBtn = win.querySelector('button[title="Maximize"]');
      WindowManager.maximize(maxBtn);
      status.textContent = "File executed in window.";
      setTimeout(() => { status.textContent = ""; }, 3000);
    };
    reader.onerror = function() {
      status.textContent = "Failed to read file.";
    };
    reader.readAsText(file);
    input.value = '';
  }
};

// Settings
Apps.settings = {
  title: 'Settings',
  icon: '⚙️',
  open(opts = {}) { WindowManager.create(this, opts); },
  content() {
    return `
      <div>
        <label for="wallpaper-url">Change Wallpaper (URL):</label>
        <input type="text" id="wallpaper-url" style="width:100%;" placeholder="Paste image URL here..." />
        <button onclick="window.Apps.settings.updateWallpaper()">Set Wallpaper</button>
        <span id="wallpaper-status" style="color:var(--accent);margin-top:5px;"></span>
      </div>
    `;
  },
  updateWallpaper() {
    const input = document.getElementById('wallpaper-url');
    const status = document.getElementById('wallpaper-status');
    if (input.value.trim()) {
      window.Desktop.setWallpaper(input.value.trim());
      status.textContent = "Wallpaper updated!";
      setTimeout(() => { status.textContent = ""; }, 2000);
      input.value = '';
    } else {
      status.textContent = "Please enter a valid image URL.";
      setTimeout(() => { status.textContent = ""; }, 2000);
    }
  }
};

// Calculator (basic)
Apps.calculator = {
  title: 'Calculator',
  icon: '🧮',
  open(opts = {}) { WindowManager.create(this, opts); },
  content() {
    return `
      <input type="text" id="calc-input" style="width:100%;font-size:1.2rem;" placeholder="Type an expression..." />
      <button onclick="window.Apps.calculator.calculate()">Calculate</button>
      <div id="calc-output" style="margin-top:1rem;color:var(--accent);"></div>
    `;
  },
  calculate() {
    const input = document.getElementById('calc-input');
    const output = document.getElementById('calc-output');
    try {
      output.textContent = eval(input.value);
    } catch {
      output.textContent = "Invalid expression.";
    }
  }
};

// Terminal (minimal)
Apps.terminal = {
  title: 'Terminal',
  icon: '💻',
  open(opts = {}) { WindowManager.create(this, opts); },
  content() {
    return `
      <div style="background:#232323;padding:1em;font-family:monospace;color:#fff;">
        <div id="terminal-history"></div>
        <input type="text" id="terminal-input" style="width:100%;background:#18181F;color:#fff;border:none;" placeholder="Type a command..." onkeydown="if(event.key==='Enter'){window.Apps.terminal.run()}">
      </div>
    `;
  },
  run() {
    const input = document.getElementById('terminal-input');
    const history = document.getElementById('terminal-history');
    const cmd = input.value.trim();
    if (cmd) {
      history.innerHTML += `<div style="color:var(--accent);">$ ${cmd}</div>`;
      if (cmd === 'sudo apt install neofetch' || cmd === 'sudo apt run neofetch') {
        const appInfo = {
          title: 'neofetch',
          content: () => `<img src="assets/neofetch.png" style="width:100%;height:100%;object-fit:contain;background:black;">`
        };
        const win = WindowManager.create(appInfo, { width: '800px', height: '600px' });
        const maxBtn = win.querySelector('button[title="Maximize"]');
        WindowManager.maximize(maxBtn);
        history.innerHTML += `<div>Opening neofetch output...</div>`;
      } else {
        history.innerHTML += `<div>${cmd}</div>`;
      }
      input.value = '';
      history.scrollTop = history.scrollHeight;
    }
  }
};

// File Explorer (functional)
// Define your files here; add more as needed
Apps.fileexplorer = {
  title: 'File Explorer',
  icon: '🗂️',
  open(opts = {}) { WindowManager.create(this, opts); },
  files: [
    {
      name: 'Eag-1.12.2-Xray',
      url: 'https://drive.google.com/uc?export=download&id=1I-Fhn3JIRIfR2t-ST585MiCTblrgFhQZ'
    }

  // Add more files here as needed
  ],
  content() {
    return `
      <div>
        <h2>Files</h2>
        <ul style="list-style:none;padding:0;">
          ${this.files.map((file, idx) => `
            <li style="margin:1rem 0;">
              <button
                style="background:var(--button);color:var(--primary);padding:0.8rem 1.4rem;font-size:1rem;border-radius:var(--radius);border:none;cursor:pointer;box-shadow:var(--shadow);width:100%;text-align:left;"
                onclick="window.Apps.fileexplorer.openFile(${idx})"
              >
                <strong>${file.name}</strong>
                <br>
                <span style="opacity:0.7;font-size:0.9em;">${file.outline}</span>
              </button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  },
  openFile(idx) {
    const file = this.files[idx];
    if (file && file.url) {
      window.open(file.url, '_blank'); // Redirects out of OS to open in normal tab
    }
  }
};

// Website Fetcher
Apps.websitefetcher = {
  title: 'Website Fetcher',
  icon: '⏩',
  open(opts = {}) {
    WindowManager.create(this, opts);
  },
  content() {
    return `
      <style>
        .fetcher-container {
            background: linear-gradient(135deg, #2c003e 0%, #5c0a13 100%);
            color: #fff;
            font-family: 'Segoe UI', 'Arial', sans-serif;
            border: 2px solid #ff004c;
            border-radius: 16px;
            padding: 32px 24px 24px 24px;
            box-shadow: 0 8px 32px rgba(200,0,50,0.5);
            max-width: 400px;
            width: 90%;
            text-align: center;
            margin: 2rem auto;
        }
        .logo {
            font-size: 2.8em;
            margin-bottom: 8px;
            filter: drop-shadow(0 0 8px #ff004c);
            user-select: none;
        }
        h2 {
            margin: 0 0 18px 0;
            font-weight: 700;
            color: #ff004c;
            text-shadow: 0 2px 8px #2c003e;
            letter-spacing: 1px;
        }
        .fetcher-input {
            width: 90%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ff004c;
            background: #330013;
            color: #fff;
            font-size: 1em;
            margin-bottom: 16px;
            outline: none;
            transition: border 0.2s;
        }
        .fetcher-input:focus {
            border: 2px solid #ff004c;
            background: #ff004c22;
        }
        .fetcher-btn {
            background: linear-gradient(90deg, #ff004c 0%, #9e003e 100%);
            color: #fff;
            font-size: 1.1em;
            font-family: inherit;
            border: none;
            border-radius: 8px;
            padding: 12px 36px;
            cursor: pointer;
            box-shadow: 0 2px 8px #b3002c33;
            transition: background 0.3s, transform 0.15s;
        }
        .fetcher-btn:hover {
            background: linear-gradient(90deg, #f50944 0%, #a00046 100%);
            transform: scale(1.04);
        }
        .footer {
            margin-top: 22px;
            font-size: 0.9em;
            color: #ffb3d6;
            opacity: 0.65;
        }
      </style>
      <div class="fetcher-container">
        <div class="logo">⏩</div>
        <h2>Website Fetcher</h2>
        <input id="websitefetcher-url" class="fetcher-input" type="text" placeholder="Enter website URL (e.g. https://example.com)">
        <br>
        <button class="fetcher-btn" onclick="Apps.websitefetcher.fetchWebsite()">Open Website</button>
        <div class="footer">Powered by Red Desk Beta</div>
      </div>
      <script>
        window.Apps = window.Apps || {};
        Apps.websitefetcher = Apps.websitefetcher || {};
        Apps.websitefetcher.fetchWebsite = function() {
          var url = document.getElementById('websitefetcher-url').value.trim();
          if (url && !/^https?:\/\//i.test(url)) url = 'https://' + url;
          if (url && /^https?:\/\/.+\..+/i.test(url)) {
            const win = WindowManager.create({
              title: url,
              content: () => '<iframe src="' + url.replace(/"/g, '&quot;') + '" style="width:100%;height:100%;border:none;background:#111;"></iframe>'
            });
            WindowManager.maximize(win.querySelector('button[title="Maximize"]'));
          } else {
            alert('Please enter a valid URL (e.g. https://example.com)');
          }
        };
        document.getElementById('websitefetcher-url').addEventListener('keydown', function(e){
          if (e.key === 'Enter') Apps.websitefetcher.fetchWebsite();
        });
      </script>
    `;
  }
};




// Calendar (minimal)
Apps.calendar = {
  title: 'Calendar',
  icon: '📅',
  open(opts = {}) { WindowManager.create(this, opts); },
  content() {
    return `<div>${new Date().toLocaleDateString()}</div>`;
  }
};

// Notification system (minimal)
Apps.notification = {
  title: 'Notifications',
  icon: '🔔',
  open(opts = {}) { WindowManager.create(this, opts); },
  content() {
    return `<div>(No notifications yet!)</div>`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Boot sequence if desired
});
