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

(function () {
  // URL to open in a new tab
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScaYcFE6kxkrrnx09OX8QLJZluyDLUeH65pDbRa-I2DapeQ7A/viewform?usp=dialog";

  // Wait for DOM ready
  function onReady(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  onReady(function () {
    // Try to find the taskbar container.
    // Common ids/classes used by the project: 'taskbar', 'taskbar-container', or element with class 'taskbar'
    let taskbar = document.getElementById("taskbar")
               || document.querySelector(".taskbar")
               || document.querySelector("#taskbar-container")
               || document.querySelector(".taskbar-container");

    // If we couldn't find a taskbar, try the element with role="toolbar" or fall back to body (safe fallback).
    if (!taskbar) {
      taskbar = document.querySelector('[role="toolbar"]') || document.body;
    }

    // Create a right-side wrapper to push this button to the far right (uses margin-left: auto)
    let rightWrapper = document.createElement("div");
    rightWrapper.className = "taskbar-right";

    // Create anchor so target/_blank + rel attributes behave correctly
    let a = document.createElement("a");
    a.href = FORM_URL;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", "Open Google Form (new tab)");

    // Create the button with emoji
    let btn = document.createElement("button");
    btn.type = "button";
    btn.id = "taskbar-form-btn";
    btn.className = "taskbar-form-btn";
    btn.title = "Open form";
    btn.textContent = "📋"; // the emoji you requested

    // Put the button inside the anchor, and the anchor inside the right wrapper
    a.appendChild(btn);
    rightWrapper.appendChild(a);

    // Append the rightWrapper as the last child of the taskbar
    taskbar.appendChild(rightWrapper);

    // Optional: keyboard accessibility (Enter/Space opens link)
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        a.click();
      }
    });

    // No other behavior changed.
    // End of script.
  });
})();

