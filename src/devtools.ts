import browser from 'webextension-polyfill';

async function createPanel() {
  // It appears that Chrome treats URLs relative to extension root,
  // and Firefox treats it relative to the devtools page.
  // Use `/` to circumvent.
  const icon = '/public/icon/icon_128.png';
  const url = '/src/devtools/panel.html';
  await browser.devtools.panels.create(`three`, icon, url);
}

if (browser.devtools.inspectedWindow.tabId) {
  // As of now, only inspect content windows, not when
  // debugging a devtools panel for example.
  browser.devtools.inspectedWindow.eval(`window.DevToolsAPI`).then(([result]) => {
    if (!result) {
      createPanel();
    }
  });
}
