function getAllBlocked(){
    chrome.storage.local.get(null, function(items){
        var allKeys = Object.keys(items);
        console.log(allKeys);
        console.log(items);
    });
}

window.addEventListener('DOMContentLoaded', function() {
    console.log("it works!");
    getAllBlocked();
});