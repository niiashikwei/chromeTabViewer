
function loadCurrentWindowTabs(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        for (i = 0; i < arrayOfTab.length - 1; i++) {
            (function () {
                var tab = {
                    "tabId": arrayOfTab[i].id,
                    "tabTitle": arrayOfTab[i].title,
                    "icon": arrayOfTab[i].favIconUrl
                };

                if (i % 3 == 0) {
                    row = document.createElement('div');
                    row.setAttribute('class', 'row');
                }

                tile = document.createElement('div');
                tile.setAttribute('class', 'tile');
                tile.addEventListener('click', function () {
                    //switch to selected tab
                    chrome.tabs.update(tab.tabId, {selected: true}, function () {
                        console.log("switching to selected tab");
                    });
                    chrome.tabs.remove(arrayOfTab[arrayOfTab.length - 1].id, function(){
                        console.log("removing extension page");
                    });
                });

                h3 = document.createElement('h3');
                h3.innerText = tab.tabTitle;
                tile.appendChild(h3);

                if(tab.icon != undefined){
                    img = document.createElement('img');
                    img.setAttribute('class', 'favIcon');
                    img.setAttribute('src', tab.icon);
                    img.setAttribute('width', '40px');
                    img.setAttribute('height', '40px');
                    tile.appendChild(img);
                }

                row.appendChild(tile);
                document.getElementById("container").appendChild(row);
            }());

        }
        console.log("done");
    });
}

function saveTabCollection(){
    console.log("coming soon!");
}

function closeTabFromTile(){
    console.log("coming soon!");
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadCurrentWindowTabs();
});
