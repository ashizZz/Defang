// Function to defang a URL or IP
function defangUrlAndIp(input) {
  // Replace "https://" with "hxxps[://]"
  input = input.replace(/https:\/\//g, 'hxxps[://]');

  // Replace "http://" with "hxxp[://]"
  input = input.replace(/http:\/\//g, 'hxxp[://]');

  // Replace dots with square brackets
  input = input.replace(/\./g, '[.]');

  // Implement your additional defanging logic here if needed
  // For example, you can replace other characters as required

  // Return the defanged text
  return input;
}

// Create a variable to keep track of the currently open overlay
let currentOverlay = null;

document.addEventListener('selectionchange', function () {
  const selectedText = window.getSelection().toString().trim();

  if (!selectedText) {
    // No text is selected, close the current overlay if any
    if (currentOverlay) {
      document.body.removeChild(currentOverlay);
      currentOverlay = null;
    }
    return;
  }

  // Check if the selected text looks like a URL or IP address
  const isUrlOrIp = /^(https?|ftp|file):\/\/\S+|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/.test(selectedText) ||
    /^[A-Za-z0-9.-]+\.[A-Za-z]{2,6}(:[0-9]+)?(\/\S*)?$/.test(selectedText) ||
    /^[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(selectedText);

  if (isUrlOrIp) {
    // Get the selection range to position the overlay
    const selection = window.getSelection().getRangeAt(0);
    const rect = selection.getBoundingClientRect();

    // Defang the selected text
    const defangedText = defangUrlAndIp(selectedText);

    // Create an overlay element
    const overlay = document.createElement('div');
    overlay.className = 'defang-overlay';

    // Apply styles to the overlay
    overlay.style.position = 'absolute';
    overlay.style.top = `${rect.bottom + window.scrollY}px`;
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.fontSize = '16px';
    overlay.style.color = '#fff'; /* Text color (white) */
    overlay.style.background = 'linear-gradient(to bottom, #282424, #282424)'; /* Gradient background from black to white */
    overlay.style.border = '1px solid #000';
    overlay.style.borderRadius = '6px'; /* Slightly rounded corners */
    overlay.style.padding = '10px'; /* More padding for a larger overlay */
    overlay.style.maxWidth = '400px'; /* Adjust the maximum width as needed */
    overlay.style.wordWrap = 'break-word';
    overlay.style.whiteSpace = 'normal';
    overlay.style.zIndex = '9999';

    // Automatically copy the defanged text to the clipboard
    navigator.clipboard.writeText(defangedText).then(function () {
      // Clipboard copy was successful
      console.log('Copied to clipboard');
      // Close the overlay after a short delay (e.g., 2 seconds)
      setTimeout(function () {
        document.body.removeChild(overlay);
        currentOverlay = null;
      }, 2000); // Adjust the delay as needed
    }).catch(function (err) {
      // Clipboard copy failed
      console.error('Failed to copy to clipboard: ', err);
      // Close the overlay immediately in case of an error
      document.body.removeChild(overlay);
      currentOverlay = null;
    });

    // Append the defanged text to the overlay
    overlay.textContent = defangedText;

    // Close the currently open overlay (if any)
    if (currentOverlay) {
      document.body.removeChild(currentOverlay);
    }

    // Append the overlay to the body and update the currently open overlay
    document.body.appendChild(overlay);
    currentOverlay = overlay;
  }
});
