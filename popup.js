document.getElementById('defangButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;

  // Send the inputText to the content script for defanging
  chrome.scripting.executeScript({
    target: { tabId: activeTabId },
    function: defangInContentScript,
    args: [inputText],
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'defangedText') {
    document.getElementById('output').textContent = message.defangedText;
  }
});

// Get the active tab ID
let activeTabId;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  activeTabId = tabs[0].id;
});

function defangInContentScript(inputText) {
  // Modify this function to defang the inputText as shown in the previous code example
  // Then, send the defanged text back to the popup script
  const defangedText = defangUrlAndIp(inputText);

  chrome.runtime.sendMessage({ type: 'defangedText', defangedText });
}
