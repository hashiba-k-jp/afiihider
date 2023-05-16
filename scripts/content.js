window.addEventListener("load",function() {
    // chrome.storage.local.get(null, ((data) => {console.log(data)}));

    sponsored = document.querySelector("#tvcap");
    if(sponsored.innerHTML !== ""){
        console.log("not empty");
        taw = document.querySelector("#taw");
        const msg_ad = document.createElement('div');
        msg_ad.innerText = "Advertisement was hidden...";
        taw.appendChild(msg_ad);
    }else{
        console.log("empty");
    }

    sponsored.style.display = "none";
});

function setHideUrl(){
    chrome.storage.sync.set({'key': value}, function () {});
}