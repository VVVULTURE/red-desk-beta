// main.js (file explorer supports folders and files)
// Entrypoint: registers all apps/pages/widgets for context menu and launcher

window.Apps = window.Apps || {};

// ... (other apps omitted for brevity, unchanged) ...

// File Explorer (functional with folders and files)
Apps.fileexplorer = {
  title: 'File Explorer',
  icon: '🗂️',
  open(opts = {}) { WindowManager.create(this, opts); },
  files: [
    {
      name: 'Example File.pdf',
      outline: 'Google Drive PDF (auto download)',
      url: 'https://drive.google.com/uc?export=download&id=1I-Fhn3JIRIfR2t-ST585MiCTblrgFhQZ'
    }
    // You can add more files at root if needed
  ],
  folders: [
    {
      name: 'Eag1.12.2 Textures',
      files: [
        {
          name: 'Eag1.12.2 Texture 1.zip',
          outline: 'Google Drive ZIP (auto download)',
          url: 'https://drive.google.com/uc?export=download&id=1SkwfBg5VXIpQSGGa4U6R83R6o8TdgQm4'
        },
        {
          name: 'Eag1.12.2 Texture 2.zip',
          outline: 'Google Drive ZIP (auto download)',
          url: 'https://drive.google.com/uc?export=download&id=1ztQbEdr68hPw-NinaBXJqLPlUTH217Xe'
        },
        {
          name: 'Eag1.12.2 Texture 3.zip',
          outline: 'Google Drive ZIP (auto download)',
          url: 'https://drive.google.com/uc?export=download&id=17YSkJTqsaZB57z3HYoFzdTgTAPlnDE3N'
        },
        {
          name: 'Eag1.12.2 Texture 4.zip',
          outline: 'Google Drive ZIP (auto download)',
          url: 'https://drive.google.com/uc?export=download&id=13OVXpz8_bhS3jNbWvo81vsUm6v4-cEeM'
        },
        {
          name: 'Eag1.12.2 Texture 5.zip',
          outline: 'Google Drive ZIP (auto download)',
          url: 'https://drive.google.com/uc?export=download&id=1nWuWl3fm3iHm7dWlyR-_yBSEPHLh-72Z'
        },
        {
          name: 'Eag1.12.2 Texture 6.zip',
          outline: 'Google Drive ZIP (auto download)',
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
                <br>
                <span style="opacity:0.7;font-size:0.9em;">${file.outline}</span>
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
                <br>
                <span style="opacity:0.7;font-size:0.9em;">${file.outline}</span>
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

// ... (other apps unchanged) ...
