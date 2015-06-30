
function getCurrentWindowTabs(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        for (i = 0; i < arrayOfTab.length - 1; i++){
            var tab = {
                "tabId": arrayOfTab[i].id,
                "tabTitle": arrayOfTab[i].title,
                "icon": arrayOfTab[i].favIconUrl
            };

            if (i % 3 == 0){
                row = document.createElement('div');
                row.setAttribute('class', 'row');
            }

            tile = document.createElement('div');
            tile.setAttribute('class', 'tile');
            tile.innerText = tab.tabTitle;

            row.appendChild(tile);
            document.getElementById("container").appendChild(row);
        }
        console.log("got array of Tabs");
    });
}

function saveTabCollection(){
    console.log("coming soon!");
}

document.addEventListener("DOMContentLoaded", function(event) {
    getCurrentWindowTabs();
});
