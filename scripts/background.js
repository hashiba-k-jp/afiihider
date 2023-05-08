const parent = chrome.contextMenus.create({
  id: "Affihider",
  title: "test",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "Affihider":
            chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: test,
            });
            break;
}});

function test() {
    console.log("test done!!!!");
}

