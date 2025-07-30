function updateUI(isFocusModeOn) {
  const statusText = isFocusModeOn ? "Focus Mode is ON" : "Focus Mode is OFF";
  const statusClass = isFocusModeOn ? "status-on" : "status-off";
  const statusIcon = isFocusModeOn ? "fa-check-circle" : "fa-times-circle";
  const containerClass = isFocusModeOn ? "pulse" : "";
  const containerStateClass = isFocusModeOn ? "status-on-container" : "";
  
  // Update status text and class
  const statusElement = document.getElementById("focusStatus");
  statusElement.className = statusClass;
  
  // Create a smooth transition effect
  statusElement.style.opacity = "0";
  setTimeout(() => {
    statusElement.textContent = statusText;
    
    // Update the icon with animation
    const iconElement = statusElement.querySelector("i") || document.createElement("i");
    iconElement.className = `fas ${statusIcon} rotate-in`;
    
    if (!statusElement.contains(iconElement)) {
      statusElement.prepend(iconElement);
    }
    
    statusElement.style.opacity = "1";
  }, 200);
  
  // Update toggle switch
  document.getElementById("focusToggle").checked = isFocusModeOn;
  
  // Update container styling
  const container = document.getElementById("statusContainer");
  container.className = `status-container ${containerClass} ${containerStateClass}`;
  
  // Add a subtle transition effect
  container.style.transform = "scale(0.98)";
  setTimeout(() => {
    container.style.transform = "";
  }, 300);
}

// On load, display the current Focus Mode status
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("focusMode", (data) => {
    updateUI(data.focusMode || false);
    
    // Add a subtle entrance animation
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.opacity = "1";
      document.body.style.transition = "opacity 0.4s ease";
    }, 100);
  });
});

// Add keyboard shortcut display (just visual, actual shortcut handling should be in background.js)
document.addEventListener("keydown", (e) => {
  // This is just for visual feedback in the popup, not for actual toggling
  if (e.altKey && e.key.toLowerCase() === "f") {
    const shortcutHint = document.querySelector(".shortcut-hint");
    shortcutHint.style.backgroundColor = "rgba(76, 175, 80, 0.3)";
    setTimeout(() => {
      shortcutHint.style.backgroundColor = "";
    }, 200);
  }
});