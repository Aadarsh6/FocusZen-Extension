// inject.js
const originalPostMessage = window.postMessage;

window.postMessage = function (message, targetOrigin, transfer) {
  originalPostMessage(message, targetOrigin, transfer);
  if (message?.type === "FocusSessionData") {
    window.dispatchEvent(new CustomEvent("FocusSessionDataBridge", { detail: message }));
  }
};
