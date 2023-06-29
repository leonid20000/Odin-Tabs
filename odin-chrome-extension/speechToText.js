if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //const startBtn = document.getElementById('startBtn');
  const result = document.getElementById('result');
  var dialog = [];
  var apiKey='';
  chrome.storage.local.get(['mySetting1'], function(result) {
	  apiKey = result.mySetting1;

	  recognition.lang = 'en-US';
	  recognition.continuous = true;
	  recognition.interimResults = false;

	  recognition.onstart = function() {
		console.log('Speech recognition started');
	  };

	  recognition.onend = function() {
		console.log('Speech recognition stopped');
		dialog = [];
		updateFaceSpan('&#128564;'); // Change the content to a sleeping emoji
	  };

	  recognition.onresult = function(event) {
		const transcript = event.results[event.results.length - 1][0].transcript;
		console.log('Speech recognized:', transcript);
		const result = document.getElementById('result');
		result.innerText = transcript;
		const userMessageObject = createMessageObject("user", transcript+" (ONLY show the ID of the tab)");
		dialog.push(userMessageObject);
		
		
		
		let altTabContext = 'The following is a list of tab IDs and the contents of each tab: \n'; // Initialize a base string to store the context information
		// Get all the tabs
		chrome.tabs.query({}, function(tabs) {
			tabs.forEach(function(tab) {
				var tabId = tab.id !== undefined ? tab.id : 'N/A';
				var url = tab.url ? tab.url.split('?')[0] : 'N/A';
				var title = tab.title || 'N/A';
				altTabContext += 'Tab ID: ' + tabId + ' URL: ' + url + ' Title: ' + title + ' \n ';
			});

		
		console.log(altTabContext);
		generateText(altTabContext, transcript)
			.then(text => {
			  console.log('Generated text:', text);
				const LLMMessageObject = createMessageObject("assistant", text);
				dialog.push(LLMMessageObject);
			  const tabID = text.match(/\d+/g)[0];
				console.log(tabID);
				// Activate the tab
				let tabIDInt = parseInt(tabID, 10); // Parsing tabID as base 10 integer
				chrome.tabs.get(tabIDInt, function(tab) {
				  if (tab) {
					const windowId = tab.windowId;

					// Activate the tab in the window and focus the window
					chrome.tabs.update(tabIDInt, { active: true }, function(updatedTab) {
					  if (updatedTab) {
						console.log('Tab activated successfully');

						// Focus the window
						chrome.windows.update(windowId, { focused: true }, function(updatedWindow) {
						  if (updatedWindow) {
							console.log('Window focused successfully');
						  } else {
							console.log('Failed to focus window');
						  }
						});
					  } else {
						console.log('Failed to activate tab');
					  }
					});
				  } else {
					console.log('Tab not found');
				  }
				});

			  // ...
			})
			.catch(error => {
			  console.error(error);
			});
		


		});
		
		
		
		
	  };
	  
	  recognition.start();
	  
//	  startBtn.addEventListener('click', function() {
//		recognition.start();
//	  });
	  
	});
	  
} else {
  console.log('Speech recognition not supported in this browser');
}


function generateText(altTabContext,transcript) {
		return new Promise((resolve, reject) => {

			  // Set the API endpoint URL
			  const apiUrl = 'https://api.openai.com/v1/chat/completions';
			  console.log(transcript);
			  // Set the request data
			  const data = {
				  "model": "gpt-3.5-turbo",
				  "messages": [{"role": "system", "content": altTabContext}, ...dialog, {"role":"system","content":"ONLY show the ID of the tab which is more likely to be relevant to user messages. Response format should be Tab ID: <TabID>"}],
				  "temperature": 0.9,
				  "max_tokens": 150,
				  "top_p": 1,
				  "frequency_penalty": 0.0,
				  "presence_penalty": 0.6
			  };
			  console.log(data);

			  // Make the API request
			  fetch(apiUrl, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				  'Authorization': `Bearer ${apiKey}`
				},
				body: JSON.stringify(data)
			  })
				.then(response => response.json())
				.then(data => {
				  //const outputElement = document.getElementById('output');
				  //outputElement.innerText = data.choices[0].message.content;
				  const output = data.choices[0].message.content;
				  resolve(output); // Resolve the Promise with the generated text
				})
				.catch(error => {
				  console.error(error);
				  reject(error); // Reject the Promise with the error
				});
		  });
}
	
	
	
function createMessageObject(role, content) {
  return {
    role: role,
    content: content
  };
}

function updateFaceSpan(content) {
  chrome.runtime.sendMessage({ action: 'updateFace', content: content });
}