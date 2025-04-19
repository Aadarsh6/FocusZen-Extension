console.log("🧠 Background script running");

function extractDomain(urlString) {
  try {
    if (!urlString.startsWith("http")) {
      urlString = "https://" + urlString;
    }
    const url = new URL(urlString);
    return url.hostname.replace(/^www\./, '');
  } catch (error) {
    console.error('❌ Error extracting domain from:', urlString, '|', error);
    return null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "updateFocusSettings") {
      console.log("📦 Background received FocusSessionData:", message);
  
      chrome.storage.local.set({
        allowedSites: message.allowedSites,
        focusTime: message.focusTime,
        focusMode: true,
      }, () => {
        console.log("✅ Focus settings saved in chrome.storage.local");
        sendResponse({ success: true });
      });
  
      return true;
    }
  
    // 🔴 Handle EndFocusSession
    if (message.type === "disableFocusMode") {
      chrome.storage.local.set({ focusMode: false }, () => {
        console.log("🛑 Focus Mode disabled in chrome.storage.local");
        sendResponse({ success: true });
      });
  
      return true;
    }
  });
  

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.url === 'about:blank') return;

  chrome.storage.local.get(["focusMode", "allowedSites", "focusTime"], (data) => {
    if (!data.focusMode) return;

    const currentUrl = new URL(details.url);
    const currentDomain = extractDomain(currentUrl.href);

    const isAllowed = data.allowedSites.some((site) => {
      const allowedDomain = extractDomain(site);
      return currentDomain && allowedDomain && currentDomain.endsWith(allowedDomain);
    });

    console.log("🔍 Checked URL:", currentUrl.href);
    console.log("🧠 Focus Mode:", data.focusMode);
    console.log("✅ Is Allowed:", isAllowed);

    if (!isAllowed) {
      console.log("❌ Blocking URL:", details.url);
      chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("blocked.html") });
    }
  });
});
