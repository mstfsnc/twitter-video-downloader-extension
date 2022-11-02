import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(function () {
  browser.tabs
    .query({ url: "*://twitter.com/*", currentWindow: true })
    .then(function (tabs) {
      tabs.forEach(function (tab) {
        browser.tabs.reload(tab.id);
      });
    });
});