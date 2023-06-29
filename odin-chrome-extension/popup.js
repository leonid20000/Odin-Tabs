document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  const result = document.getElementById('result');
  const settingsBtn = document.getElementById('settingsBtn');
  const faceSpan = document.getElementById('face');
  
  startBtn.addEventListener('click', function() {
	// Send a message to the background script to start speech recognition
	chrome.runtime.sendMessage({ action: 'startRecognition' });
	// Disable startBtn and set label to "Active"
	startBtn.disabled = true;
	startBtn.textContent = 'Active';
	faceSpan.innerHTML = '&#129488;';
  });

  // Event listener to receive the update message from the background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateFace') {
      faceSpan.innerHTML = request.content;
	  switch(request.content) {
		  case '&#128564;':
			// Re-enable the startBtn
			startBtn.disabled = false;
			startBtn.textContent = 'Wake Up';
			break;

		  default:
			//do nothing
		}
    }
  });
  // Get the value of mySetting1 from local storage
  chrome.storage.local.get(['mySetting1'], function(result) {
    const mySetting1 = result.mySetting1;

    if (mySetting1) {
	  chrome.runtime.sendMessage({ action: 'startRecognition' });	
      // Disable startBtn and set label to "Active"
      startBtn.disabled = true;
      startBtn.textContent = 'Active';
	  faceSpan.innerHTML = '&#129488;';
    } else {
      // Disable startBtn and set label to "Link an LLM to start"
      startBtn.disabled = true;
      startBtn.textContent = 'Link an LLM to start';
    }
  });


  settingsBtn.addEventListener('click', function() {
    const settingValue = prompt('Enter a valid Key:');
    // Send the setting value to the background script
    chrome.runtime.sendMessage({ action: 'setSetting', value: settingValue });
	// Re-enable the startBtn after sending the setting value
	startBtn.disabled = false;
	startBtn.textContent = 'Start';
	
  });
});
