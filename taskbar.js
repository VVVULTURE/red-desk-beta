window.Taskbar = {
  pinned: ['texteditor', 'calculator', 'settings', 'terminal', 'fileexplorer', 'games', 'executor', 'fetcher'],
  running: [],
  init() {
    const bar = document.getElementById('taskbar');
    bar.className = 'taskbar';
    bar.innerHTML = `
      <button class="taskbar-start" id="taskbar-start-btn">Red OS</button>
      <div class="taskbar-apps"></div>
    `;
    this.renderApps();
    setTimeout(() => {
      const btn = document.getElementById('taskbar-start-btn');
      if (btn) btn.onclick = () => Taskbar.openLauncher();
    }, 10);
  },
  renderApps() {
    const appsDiv = document.querySelector('.taskbar-apps');
    appsDiv.innerHTML = '';
    this.pinned.forEach(appId => {
      if (!window.Apps[appId]) return;
      const btn = document.createElement('button');
      btn.className = 'taskbar-app' + (Taskbar.running.includes(appId) ? ' running' : '');
      btn.innerHTML = window.Apps[appId].icon || '🗔'; // This supports <img> tags!
      btn.title = window.Apps[appId].title;
      btn.onclick = () => window.Apps[appId].open();
      appsDiv.appendChild(btn);
    });
  },
  openLauncher() {
    ContextMenu.show(
      Object.values(window.Apps).map(app => ({
        label: app.title,
        icon: app.icon,
        action: () => app.open()
      })),
      80,
      window.innerHeight - 55
    );
  }
};

document.addEventListener('DOMContentLoaded', () => Taskbar.init());

// taskbar.js
// (Paste this into your existing taskbar.js file or append it to the end.
// If you append, the script will add the button when the DOM is loaded.)

// taskbar.js — minimal drop-in to add the emoji link with no native button styling
(function () {
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScaYcFE6kxkrrnx09OX8QLJZluyDLUeH65pDbRa-I2DapeQ7A/viewform?usp=dialog";

  function onReady(fn) {
    if (document.readyState !== "loading") return fn();
    document.addEventListener("DOMContentLoaded", fn);
  }

  onReady(function () {
    let taskbar = document.getElementById("taskbar")
               || document.querySelector(".taskbar")
               || document.querySelector("#taskbar-container")
               || document.querySelector(".taskbar-container")
               || document.querySelector('[role="toolbar"]')
               || document.body;

    // Remove any previously-added element (safe id-based cleanup)
    const old = document.getElementById("taskbar-form-btn");
    if (old && old.parentElement) old.parentElement.remove();

    // Wrapper that will push content to the far right
    const rightWrapper = document.createElement("div");
    rightWrapper.className = "taskbar-right";

    // Anchor (no button) — anchor opens new tab naturally
    const a = document.createElement("a");
    a.id = "taskbar-form-btn";
    a.href = FORM_URL;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("role", "button");
    a.setAttribute("aria-label", "Open Google Form (new tab)");
    a.title = "Open form";

    // Emoji span — purely presentational
    const span = document.createElement("span");
    span.className = "taskbar-form-emoji";
    span.textContent = "📝";
    span.setAttribute("aria-hidden", "true");

    a.appendChild(span);
    rightWrapper.appendChild(a);
    taskbar.appendChild(rightWrapper);

    // Keyboard support: Enter/Space when focused on the anchor
    a.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        a.click();
      }
    });
  });
})();
