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

// Fetcher (web browser, uses your fetch logic)
Apps.fetcher = window.Apps.fetcher;

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
    if (input.value.trim()) {
      history.innerHTML += `<div style="color:var(--accent);">$ ${input.value}</div>`;
      history.innerHTML += `<div>${input.value}</div>`;
      input.value = '';
    }
  }
};

// --- Place this inside main.js, replacing the Apps.fileexplorer definition ---

Apps.fileexplorer = {
  title: 'File Explorer',
  icon: '🗂️',
  open(opts = {}) { WindowManager.create(this, opts); },
  files: [
    {
      name: 'Compact Conflict.html',
      url: 'https://drive.google.com/file/d/1-2j4syiWMUsqDPFxaqvKy9fyEtJEqFqa/view?usp=drive_link'
    }
    // Add more files at root if needed
  ],
  folders: [
    {
      name: 'Eag1.12.2 Textures',
      files: [
        {
          name: 'Cookie CLicker.html',
          url: 'https://drive.google.com/uc?export=download&id=1SkwfBg5VXIpQSGGa4U6R83R6o8TdgQm4'
        },
        {
          name: 'Eag1.12.2 Texture 2.zip',
          url: 'https://drive.google.com/uc?export=download&id=1ztQbEdr68hPw-NinaBXJqLPlUTH217Xe'
        },
        {
          name: 'Xray_1.12.2',
      url: 'https://drive.google.com/uc?export=download&id=1I-Fhn3JIRIfR2t-ST585MiCTblrgFhQZ'

        }
        
        {
          name: 'Eag1.12.2 Texture 3.zip',
          url: 'https://drive.google.com/uc?export=download&id=17YSkJTqsaZB57z3HYoFzdTgTAPlnDE3N'
        },
        {
          name: 'Eag1.12.2 Texture 4.zip',
          url: 'https://drive.google.com/uc?export=download&id=13OVXpz8_bhS3jNbWvo81vsUm6v4-cEeM'
        },
        {
          name: 'Eag1.12.2 Texture 5.zip',
          url: 'https://drive.google.com/uc?export=download&id=1nWuWl3fm3iHm7dWlyR-_yBSEPHLh-72Z'
        },
        {
          name: 'Eag1.12.2 Texture 6.zip',
          url: 'https://drive.google.com/uc?export=download&id=1Kd80kw-CrLYEJqN5Mg3RxH38wW5WcTEV'
        }
      ]
    }
  ],
  content() {
    // Render root files
    let html = `
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
              </button>
            </li>
          `).join('')}
        </ul>
        <h2>Folders</h2>
        <ul style="list-style:none;padding:0;">
          ${this.folders.map((folder, idx) => `
            <li style="margin:1rem 0;">
              <button
                style="background:var(--button);color:var(--primary);padding:0.8rem 1.4rem;font-size:1.1rem;border-radius:var(--radius);border:none;cursor:pointer;box-shadow:var(--shadow);width:100%;text-align:left;"
                onclick="window.Apps.fileexplorer.openFolder(${idx})"
              >
                <strong>📁 ${folder.name}</strong>
              </button>
            </li>
          `).join('')}
        </ul>
        <div id="fileexplorer-folder-view"></div>
      </div>
    `;
    return html;
  },
  openFile(idx) {
    const file = this.files[idx];
    if (file && file.url) {
      window.open(file.url, '_blank'); // Redirects out of OS to open in normal tab
    }
  },
  openFolder(idx) {
    const folder = this.folders[idx];
    if (!folder) return;
    // Render folder view in the file explorer window (replace previous folder view)
    const win = Apps.fileexplorer._getCurrentWindow();
    if (!win) return;
    const folderView = win.querySelector('#fileexplorer-folder-view');
    folderView.innerHTML = `
      <div style="margin-top:2rem;">
        <h3>📁 ${folder.name}</h3>
        <button onclick="window.Apps.fileexplorer.closeFolderView()" style="margin-bottom:1rem;background:var(--button);color:var(--primary);border:none;padding:0.5rem 1.2rem;border-radius:var(--radius);cursor:pointer;">Back</button>
        <ul style="list-style:none;padding:0;">
          ${folder.files.map((file, fidx) => `
            <li style="margin:1rem 0;">
              <button
                style="background:var(--button);color:var(--primary);padding:0.8rem 1.4rem;font-size:1rem;border-radius:var(--radius);border:none;cursor:pointer;box-shadow:var(--shadow);width:100%;text-align:left;"
                onclick="window.Apps.fileexplorer.openFolderFile(${idx},${fidx})"
              >
                <strong>${file.name}</strong>
              </button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  },
  openFolderFile(folderIdx, fileIdx) {
    const folder = this.folders[folderIdx];
    if (!folder) return;
    const file = folder.files[fileIdx];
    if (file && file.url) {
      window.open(file.url, '_blank'); // Redirects out of OS to open in normal tab
    }
  },
  closeFolderView() {
    // Close folder view and return to root
    const win = Apps.fileexplorer._getCurrentWindow();
    if (!win) return;
    const folderView = win.querySelector('#fileexplorer-folder-view');
    folderView.innerHTML = '';
  },
  _getCurrentWindow() {
    // Find the most recent file explorer window
    return [...document.querySelectorAll('.os-window')].reverse().find(
      w => w.querySelector('.os-window-title') && w.querySelector('.os-window-title').textContent === 'File Explorer'
    );
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
