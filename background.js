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
  // Modify this function to handle the defangedText in your content script
  // For example, you can display an overlay or take any other desired action
  // This function will be executed in the context of the content script
  // You can access the defangedText variable here
  console.log(defangedText); // Example: Log the defanged text to the console
}
