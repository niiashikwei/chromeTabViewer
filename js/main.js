
function getCurrentWindowTabs(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        for (i = 0; i < arrayOfTab.length - 2; i++){
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

            img = document.createElement('img');
            img.setAttribute('class', 'favIcon');
            img.setAttribute('src', tab.icon);
            img.setAttribute('width', '40px');
            img.setAttribute('height', '40px');

            h3 = document.createElement('h3');
            h3.innerText = tab.tabTitle;

            tile.appendChild(h3);
            tile.appendChild(img);
            row.appendChild(tile);
            document.getElementById("container").appendChild(row);
        }
        console.log("got array of Tabs");
    });
}

function saveTabCollection(){
    console.log("coming soon!");
}

function jumpToTab(){
    console.log("coming soon!");
}

document.addEventListener("DOMContentLoaded", function(event) {
    getCurrentWindowTabs();
});
