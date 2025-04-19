document.getElementById("toggleFocus").addEventListener("click", () => {
    chrome.storage.local.get("focusMode", (data) => {
      const newFocusMode = !data.focusMode;
      chrome.storage.local.set({ focusMode: newFocusMode }, () => {
        const statusText = newFocusMode ? "Focus Mode is ON" : "Focus Mode is OFF";
        const statusClass = newFocusMode ? "status-on" : "status-off";
        document.getElementById("focusStatus").textContent = statusText;
        document.getElementById("focusStatus").className = statusClass;
      });
    });
  });
  
  // On load, display the current Focus Mode status
  chrome.storage.local.get("focusMode", (data) => {
    const statusText = data.focusMode ? "Focus Mode is ON" : "Focus Mode is OFF";
    const statusClass = data.focusMode ? "status-on" : "status-off";
    document.getElementById("focusStatus").textContent = statusText;
    document.getElementById("focusStatus").className = statusClass;
  });
  