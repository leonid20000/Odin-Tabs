# Odin Tabs Extension

The Odin Tabs extension is a browser extension that allows you to navigate through your browser tabs using speech recognition and the Large Language Model (LLM) of your choice.

## Use Cases

Odin Tabs can be useful in various scenarios and industries. Some common use cases include:

- **Data Analysis and Research:** Professionals and researchers working with data analysis may have multiple tabs open for data sources, statistical tools, research papers, and visualization libraries.

- **Financial Trading and Market Analysis:** Traders and investors often have multiple tabs open for financial news, stock market charts, trading platforms, research reports, and economic data.

- **Programming and Coding:** Programmers and coders frequently open multiple tabs for documentation, forums, code editors, and online code repositories to access references and code snippets.

- **Content Curation and Social Media Management:** Individuals responsible for content curation or managing social media accounts may open multiple tabs for content scheduling tools, analytics platforms, social media profiles, and content creation resources.

- **Online Advertising and Campaign Management:** Marketers or advertisers managing online campaigns often have multiple tabs open for ad platforms, analytics dashboards, competitor analysis tools, and creative assets.

- **Project Management and Collaboration:** Teams working on collaborative projects often rely on multiple tabs for project management tools, communication platforms, shared document editing, and task tracking.

- **Online Learning Platforms and Courses:** Students enrolled in online courses or educational platforms may have multiple tabs open for lecture videos, course materials, assignments, discussion forums, and supplementary resources.

- **Competitive Analysis and Market Research:** Professionals conducting competitive analysis or market research may open multiple tabs for competitor websites, industry reports, market data sources, and marketing intelligence tools.

- **Multiple Device Management:** Users who manage multiple devices, such as smartphones, tablets, and smart home devices, may have multiple tabs open for device management interfaces, syncing services, and cross-device communication.


These circumstances often involve complex tasks, extensive information gathering, and the need to switch between various tools and resources, leading to a higher number of open tabs for efficient workflow management.


## Functionality

The extension consists of the following components:

- **Background Script (`background.js`):** Listens for messages from the popup or content scripts and handles the communication between them. It manages tab opening and reloading and stores user settings in the local storage.

- **Popup Script (`popup.js`):** Represents the popup window of the extension. It allows the user to start speech recognition, view the recognized speech text, configure settings, and displays a face emoji based on the state of the speech recognition.

- **Popup HTML (`popup.html`):** The HTML markup for the popup window. It contains the necessary elements to display the face emoji, buttons, and recognized speech text.

- **Speech-to-Text Script (`odinTabs.js`):** Handles the speech recognition functionality. It utilizes the Web Speech API to convert spoken words into text. The recognized text is then further processed using the LLM of your choice (currently gpt-turbo-3.5), and the results are used to perform tab navigation.

- **Speech-to-Text HTML (`speechToText.html`):** The HTML markup for the speech-to-text page. It includes a container to display the recognized speech text.

## Installation

To install the Odin Tabs extension, follow these steps:

1. Download or clone the extension code from the repository.

2. Open Google Chrome and navigate to `chrome://extensions`.

3. Enable the **Developer mode** using the toggle switch located at the top right corner of the page.

4. Click on the **Load unpacked** button.

5. Select the folder containing the extension code and click **Open**.

6. The Odin Tabs extension should now appear in the list of installed extensions. Ensure the extension is enabled.

7. Click on the extension icon in the Chrome toolbar to open the popup window.

8. The popup window provides options to start speech recognition, configure settings, and view the recognized speech text.

9. Click on the **Start Speech Recognition** button to begin the speech-to-text functionality. Allow microphone access if prompted.

10. Speak into the microphone, and the recognized speech text will be displayed in the popup window.

11. Odin Tabs will use the recognized text to perform tab management actions. For example, the extension will activate the relevant tab.

12. The face emoji in the popup window will change based on the state of the speech recognition. For example, it will display a sleeping emoji when the speech recognition stops.

## Configuration

The Odin Tabs extension provides a settings option that allows you to configure a setting value. Here's how to configure the settings:

1. Click on the extension icon in the Chrome toolbar to open the popup window.

2. Click on the **Settings** button.

3. A prompt will appear asking you to enter a valid key. Enter the desired value and click **OK**.

4. The setting value will be stored in the local storage.

5. After setting the value, the **Start Speech Recognition** button will be enabled, and the face emoji will change to an active state.



## Notes

- The extension requires microphone access to perform speech recognition. Make sure to grant microphone permissions when prompted.

- The extension uses the OpenAI API for generating text responses. To use this feature, you need to provide a valid API key. The API key can be set through the settings option.

- This extension is provided as an example and may require additional modifications or improvements to suit your specific use case.

- The extension's functionality and behavior may be subject to changes and limitations imposed by browser updates or API changes.

## Credits

The Odin Tabs extension was developed by Dr. Leonit Zeynalvand and is provided under the MIT license.
