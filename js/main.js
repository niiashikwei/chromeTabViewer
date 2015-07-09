function executeTasks(tab, tabViewerTabId) {
    var tabObject = {
        "tabId": tab.id,
        "tabTitle": tab.title,
        "icon": tab.favIconUrl
    };

    return function () {
        if (tab.index % 3 == 0) {
            row = document.createElement('div');
            row.setAttribute('class', 'row');
        }

        tile = document.createElement('div');
        tile.setAttribute('class', 'tile');
        tile.addEventListener('click', function () {
            //switch to selected tab
            chrome.tabs.update(tabObject.tabId, {selected: true}, function () {
                console.log("switching to selected tab");
            });

            chrome.tabs.remove(tabViewerTabId, function () {
                console.log("removing extension page");
            });
        });

        h3 = document.createElement('h3');
        h3.innerText = tabObject.tabTitle;
        tile.appendChild(h3);

        if (tabObject.icon != undefined) {
            img = document.createElement('img');
            img.setAttribute('class', 'favIcon');
            img.setAttribute('src', tabObject.icon);
            img.setAttribute('width', '40px');
            img.setAttribute('height', '40px');
            tile.appendChild(img);
        }

        row.appendChild(tile);
        document.getElementById("container").appendChild(row);
    }();
}
function loadCurrentWindowTabs(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        var tabViewerId = arrayOfTab[arrayOfTab.length - 1].id;
        for (i = 0; i < tabViewerId; i++) {
            executeTasks(arrayOfTab[i], tabViewerId);
        }
        console.log("done");
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadCurrentWindowTabs();
});
