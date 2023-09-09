document.getElementById('defangButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;

  
  chrome.scripting.executeScript({
    target: { tabId: activeTabId },
    function: defangInContentScript,
    args: [inputText],
  });
});


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

  const defangedText = defangUrlAndIp(inputText);

  chrome.runtime.sendMessage({ type: 'defangedText', defangedText });
}
