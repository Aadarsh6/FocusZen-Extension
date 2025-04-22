// document.getElementById("toggleFocus").addEventListener("click", () => {
//     chrome.storage.local.get("focusMode", (data) => {
//       const newFocusMode = !data.focusMode;
//       chrome.storage.local.set({ focusMode: newFocusMode }, () => {
//         const statusText = newFocusMode ? "Focus Mode is ON" : "Focus Mode is OFF";
//         const statusClass = newFocusMode ? "status-on" : "status-off";
//         document.getElementById("focusStatus").textContent = statusText;
//         document.getElementById("focusStatus").className = statusClass;
//       });
//     });
//   });
  
//   // On load, display the current Focus Mode status
//   chrome.storage.local.get("focusMode", (data) => {
//     const statusText = data.focusMode ? "Focus Mode is ON" : "Focus Mode is OFF";
//     const statusClass = data.focusMode ? "status-on" : "status-off";
//     document.getElementById("focusStatus").textContent = statusText;
//     document.getElementById("focusStatus").className = statusClass;
//   });
  


// Function to update UI based on focus mode status
function updateUI(isFocusModeOn) {
  const statusText = isFocusModeOn ? "Focus Mode is ON" : "Focus Mode is OFF";
  const statusClass = isFocusModeOn ? "status-on" : "status-off";
  const statusIcon = isFocusModeOn ? "fa-check-circle" : "fa-times-circle";
  const containerClass = isFocusModeOn ? "pulse" : "";
  
  document.getElementById("focusStatus").textContent = statusText;
  document.getElementById("focusStatus").className = statusClass;
  document.getElementById("focusToggle").checked = isFocusModeOn;
  document.getElementById("statusContainer").className = `status-container ${containerClass}`;
  
  // Update the icon
  const iconElement = document.getElementById("focusStatus").querySelector("i") || document.createElement("i");
  iconElement.className = `fas ${statusIcon}`;
  
  if (!document.getElementById("focusStatus").contains(iconElement)) {
    document.getElementById("focusStatus").prepend(iconElement);
  }
  
  // Update button text
  const buttonText = isFocusModeOn ? "Disable Focus Mode" : "Enable Focus Mode";
  const buttonIcon = isFocusModeOn ? "fa-pause" : "fa-play";
  
  const button = document.getElementById("toggleFocus");
  button.innerHTML = `<i class="fas ${buttonIcon}"></i>${buttonText}`;
}

// Toggle focus mode when button is clicked
document.getElementById("toggleFocus").addEventListener("click", () => {
  toggleFocusMode();
});

// Toggle focus mode when switch is clicked
document.getElementById("focusToggle").addEventListener("change", (e) => {
  chrome.storage.local.get("focusMode", (data) => {
    if (data.focusMode !== e.target.checked) {
      toggleFocusMode();
    }
  });
});

// Function to toggle focus mode
function toggleFocusMode() {
  chrome.storage.local.get("focusMode", (data) => {
    const newFocusMode = !data.focusMode;
    
    // Add a visual feedback on click
    const button = document.getElementById("toggleFocus");
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "";
    }, 100);
    
    chrome.storage.local.set({ focusMode: newFocusMode }, () => {
      updateUI(newFocusMode);
      
      // Show transition animation
      document.getElementById("statusContainer").style.transform = "scale(1.05)";
      setTimeout(() => {
        document.getElementById("statusContainer").style.transform = "";
      }, 200);
    });
  });
}

// On load, display the current Focus Mode status
chrome.storage.local.get("focusMode", (data) => {
  updateUI(data.focusMode || false);
});

// Add keyboard shortcut support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    toggleFocusMode();
  }
});