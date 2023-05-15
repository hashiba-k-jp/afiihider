chrome.runtime.onInstalled.addListener(function(){
    const parent = chrome.contextMenus.create({
      id: "AffihiderParent",
      title: "test",
      contexts: ["link"]
    });

    const childSet = chrome.contextMenus.create({
        title:"normal",
        id: 'AffihiderSet',
        parentId: 'AffihiderParent',
        title: 'set URL',
        contexts: ["link"]
    });

    const childUnset = chrome.contextMenus.create({
        title:"normal",
        id: 'AffihiderUnset',
        parentId: 'AffihiderParent',
        title: 'unset URL',
        contexts: ["link"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "AffihiderParent":
            // do nothing...
            break;
        case "AffihiderSet":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: set,
                args:[info],
            });
            break;
        case "AffihiderUnset":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: unset,
                args:[info],
            });
            break;

}});

function set(info){
    targetUrl = info.linkUrl;
    console.log("[*] set");
    console.log(targetUrl);
}

function unset(info){
    targetUrl = info.linkUrl;
    console.log("[*] unset");
    console.log(targetUrl);
}

