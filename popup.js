function updateUI(isFocusModeOn) {
  const statusText = isFocusModeOn ? "Focus Mode is ON" : "Focus Mode is OFF";
  const statusClass = isFocusModeOn ? "status-on" : "status-off";
  const statusIcon = isFocusModeOn ? "icon-check" : "icon-x";
  const containerClass = isFocusModeOn ? "pulse" : "";
  const containerStateClass = isFocusModeOn ? "status-on-container" : "";
  
  // Update status text and class
  const statusElement = document.getElementById("focusStatus");
  statusElement.className = statusClass;
  
  // Create a smooth transition effect
  statusElement.style.opacity = "0";
  setTimeout(() => {
    // Update the icon
    const iconElement = statusElement.querySelector(".icon");
    if (iconElement) {
      iconElement.className = `icon ${statusIcon}`;
    }
    
    // Update text content while preserving the icon
    const textNode = statusElement.childNodes[statusElement.childNodes.length - 1];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = statusText;
    } else {
      // If no text node exists, create one
      statusElement.appendChild(document.createTextNode(statusText));
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