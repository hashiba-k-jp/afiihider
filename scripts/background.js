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

    let id;
    // get length of the local storage inorder to set ID
    chrome.storage.local.get(null, function(items){
        console.log(id);
        id = Object.keys(items).length;
        console.log(id);
    });

    //const timeString = Date();

    const entity = {
        [id]:
            {
                display: "none",
                target: targetUrl,
                //data:timeString
            }
    }
    console.log(entity);
    chrome.storage.local.clear()
    chrome.storage.local.set(entity, function() {
        console.log('stored');
    });

    chrome.storage.local.get(null, function(items){
        console.log(items);
    });

}

function unset(info){
    targetUrl = info.linkUrl;
    console.log("[*] unset");
    console.log(targetUrl);
    chrome.storage.local.get(null, data => console.log(data));
    console.log(data);
}
