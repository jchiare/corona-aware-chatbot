/*
* 
* On pageload, do:
* 1. Send initial bot greeting (greeting message generated from API response)
* 2. Wait for user input (via keypress or button click) 
* 3. Bot sends a reply based on the value of user input (via API response)
* 
*/
window.onload = function () {

    // Send initial greeting to the user
    sendAgentGreeting();

    // Send bot response on user enter/return keypress
    initEnterKeypressListener();
    // Watch for update 
    initUserMessageListener();
};

const DOM_ELEMENTS_ID = {
    initial_agent: "initial-agent-message",
    user_message: "user-message",
    agent_message: "agent-message",
    user_message_to_send: "message-to-send"
};


// Wrap API request
const apiRequest = async (path, message = undefined) => {
    let apiResponseData;
    if (message) {
        apiResponseData = await fetch(`/api/${path}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: message }),
        });
    } else {
        apiResponseData = await fetch(`/api/${path}`);
    }
    return await apiResponseData.json();
};


// 
// Chatbot methods, getters, and setters
//

const getUserTextInput = () => {
    let textareaEl = document.getElementById(DOM_ELEMENTS_ID.user_message_to_send)
    const userText = textareaEl.value.trim();
    setTimeout(() => (textareaEl.value = ""), 200);
    return userText;
};

const addMessageToChatUI = (targetDomElement, message) => {
    document.querySelector(`#${targetDomElement} p`).innerText = message;
    document.getElementById(targetDomElement).classList.remove("hidden");
};

const sendAgentGreeting = async () => {
    const res = await apiRequest("virtualAgent/greeting");
    setTimeout(() => addMessageToChatUI(DOM_ELEMENTS_ID.initial_agent, res.message), 1000);
};

const sendBtnHandler = () => addMessageToChatUI(DOM_ELEMENTS_ID.user_message, getUserTextInput());

const initEnterKeypressListener = () => {
    document.addEventListener("keyup", (event) => {
        if (event.key === 'Enter') {
            addMessageToChatUI(DOM_ELEMENTS_ID.user_message, getUserTextInput());
        }
    });
};

//
//  Mutation initializer
//

const observerOptions = {
    subtree: true,
    childList: true,
};

const actOnUserMessage = async () => {
    const res = await apiRequest("userResponse/message", getUserTextInput());
    setTimeout(() => {
        addMessageToChatUI(DOM_ELEMENTS_ID.agent_message, res.message);
        document.querySelector(".chat-history").scrollTop = 200;
    }, 1000);
};

const mutationCallback = async (mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === "childList") {
            // only possible mutation is text input from user
            // so no need to validate the mutation type further
            // .. for the demo :)
            await actOnUserMessage();
        }
    }
};

const initUserMessageListener = () => {
    const observer = new MutationObserver(mutationCallback);
    observer.observe(
        document.getElementById(`${DOM_ELEMENTS_ID.user_message}`),
        observerOptions
    );
}