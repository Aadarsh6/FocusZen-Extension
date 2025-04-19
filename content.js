window.addEventListener("message", (event) => {
    if (event.source !== window) return;
  
    // 🟢 Start session
    if (event.data.type === "FocusSessionData") {
      const { allowedSites, focusTime } = event.data;
      console.log("📥 Content Script Received FocusSessionData:", allowedSites, focusTime);
  
      chrome.runtime.sendMessage({
        type: "updateFocusSettings",
        allowedSites,
        focusTime,
      }, (response) => {
        console.log("✅ Message sent to background.js");
      });
    }
  
    // 🔴 End session
    if (event.data.type === "EndFocusSession") {
      console.log("📴 Ending Focus Mode");
  
      chrome.runtime.sendMessage({
        type: "disableFocusMode"
      }, (response) => {
        console.log("🔕 Focus Mode disabled");
      });
    }
  });
  