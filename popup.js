function updateUI(isFocusModeOn) {
  const statusText = isFocusModeOn ? "Focus Mode is ON" : "Focus Mode is OFF";
  const statusClass = isFocusModeOn ? "status-on" : "status-off";
  const statusIconSymbol = isFocusModeOn ? "✓" : "X";  // Changed ✗ to X
  const containerClass = isFocusModeOn ? "pulse" : "";
  const containerStateClass = isFocusModeOn ? "status-on-container" : "";
  
  // Update status text and class
  const statusElement = document.getElementById("focusStatus");
  statusElement.className = statusClass;
  
  // Create a smooth transition effect
  statusElement.style.opacity = "0";
  setTimeout(() => {
    // Update the icon
    const iconElement = statusElement.querySelector(".status-icon");
    if (iconElement) {
      iconElement.textContent = statusIconSymbol;
    }
    
    // Update the text
    const textElement = statusElement.querySelector(".status-text");
    if (textElement) {
      textElement.textContent = statusText;
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