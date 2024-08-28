chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  // Define the base URL
  const baseUrl = "https://stat.dokusho-ojikan.jp/";

  // URL pattern without query parameters
  const urlPattern = /^https:\/\/stat\.dokusho-ojikan\.jp\/[a-z0-9-]+\.jpg$/;

  // Check if the URL starts with the base URL and doesn't match the target URL pattern
  if (details.url.startsWith(baseUrl) && !urlPattern.test(details.url)) {
    // Split the URL by '?'
    const urlParts = details.url.split('?');

    // The first part is the URL without the query parameters
    const redirectUrl = urlParts[0];

    // Redirect to the URL without query parameters
    try {
      chrome.tabs.update(details.tabId, {url: redirectUrl});
    } catch (error) {
      console.error(`Error redirecting URL: ${error.message}`);
    }
  }
}, {
  url: [{urlMatches: "https://stat.dokusho-ojikan.jp/*"}]
});
