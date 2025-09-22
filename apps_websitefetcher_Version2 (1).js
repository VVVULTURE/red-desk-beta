window.Apps = window.Apps || {};
Apps.websitefetcher = {
  title: 'Website Fetcher',
  icon: `<img src="assets/fetcher-logo.png" alt="Website Fetcher" style="width:1.6em;height:1.6em;vertical-align:middle;border-radius:50%;background:#232323;">`,
  open(opts = {}) {
    WindowManager.create(this, opts);
  },
  content() {
    // ... (rest of your app code)
  },
  handleFetch(e) {
    // ... (rest of your app code)
  }
};