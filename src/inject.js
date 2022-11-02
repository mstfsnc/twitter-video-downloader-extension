import browser from "webextension-polyfill";

const element = document.createElement("script");
element.src = browser.runtime.getURL("content.js");
(document.head || document.documentElement).appendChild(element);

// inject settings from chrome.storage.local to localStorage
chrome.storage.local.get('buttonMode', res => {
  localStorage.setItem('twitter-downloader-button-mode', res.buttonMode)
})