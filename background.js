function defangInContentScript(selectedText) {
  // Implement your defanging logic here
  const defangedText = defangUrlAndIp(selectedText); // Call a function to defang the selected text

  // Send the defanged text back to the content script
  chrome.scripting.executeScript({
    target: { tabId: chrome.tabs.tabId }, // Use chrome.tabs.tabId to refer to the current tab
    func: sendDefangedTextToContent,
    args: [defangedText],
  });
}

function sendDefangedTextToContent(defangedText) {
  
  console.log(defangedText); 
