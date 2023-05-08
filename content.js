window.addEventListener("load",function() {
    sponsored = document.querySelector("#tvcap");
    sponsored.style.display = "none";
    taw = document.querySelector("#taw");

    const msg_ad = document.createElement('div');
    msg_ad.innerText = "Advertisement was hidden...";
    taw.appendChild(msg_ad);
});