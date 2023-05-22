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
    console.log("[*] set");

/*
    data =
    {"affihider":item}

    item = {
        "length":<NUMBER of IDs>,
        <ID>:{
            "url":<BLOCKED URL>,
            "date":<BLOCKED DATE>,
        },
        <ID>:{...},
        <ID>:{...}
    }

*/

    // get length of the local storage inorder to set ID
    chrome.storage.local.get("affihider", function(items){
        item = items.affihider;
        if(typeof items.affihider === "undefined"){
            // the first element for "affihider":
            length = 0;
            item = {};
        }else{
            // second or later elements
            length = item.length;
        }

        // for both the first and second or later
        item.length = length + 1;
        const newElement = {

                display: "none",
                target: info.linkUrl,
                date:"yyyy/mm/dd"

        }
        item[length] = newElement

        console.log('item is ... :')
        console.log(item);

        chrome.storage.local.set({"affihider":item}, function() {
            console.log('[*] stored');
        });

    });



}

function unset(info){
    console.log("[*] load");
    chrome.storage.local.get(null, function(givenitems){
        console.log(givenitems);
    });

    chrome.storage.local.clear()
}
