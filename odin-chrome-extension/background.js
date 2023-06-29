// Listen for messages from the popup or content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'startRecognition') {
    const desiredHTML = 'speechToText.html';
    openTabWithHTMLIfNotExists(desiredHTML);
  } else if (request.action === 'setSetting') {
    const settingValue = request.value;
    // Store the setting value in local storage
    chrome.storage.local.set({ mySetting1: settingValue });
  } else if (request.action === 'updateFace') {
    // Find the tab with the popup.html file
    chrome.tabs.query({ url: chrome.runtime.getURL('popup.html') }, function(tabs) {
      if (tabs.length > 0) {
        // Relay the message to the popup script
        chrome.tabs.sendMessage(tabs[0].id, request);
      } else {
        // The popup.html file is not open in any tab
        console.log('Popup.html is not open');
      }
    });
  }
});

function openTabWithHTMLIfNotExists(htmlFile) {
  chrome.tabs.query({}, function(tabs) {
    const isTabOpen = tabs.some(function(tab) {
      const url = new URL(tab.url);
      return url.pathname.endsWith(htmlFile);
    });

    if (isTabOpen) {
      const targetTab = tabs.find(function(tab) {
        const url = new URL(tab.url);
        return url.pathname.endsWith(htmlFile);
      });
      chrome.tabs.reload(targetTab.id);
    } else {
      const htmlURL = chrome.runtime.getURL(htmlFile);
      chrome.tabs.create({ url: htmlURL });
    }
  });
}
