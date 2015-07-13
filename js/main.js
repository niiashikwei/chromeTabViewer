function switchToTabWithId(tab) {
    chrome.tabs.update(tab.id, {selected: true}, function () {
        console.log("switching to selected tab");
    });
}

function removeTabWithId(tabViewerId) {
    chrome.tabs.remove(tabViewerId, function () {
        console.log("removing extension page");
    });
}

function attachTileEvents(tile, tab, tabViewerTabId) {
    tile.addEventListener('click', function () {
        switchToTabWithId(tab);
    });

    tile.addEventListener('click', function () {
        removeTabWithId(tabViewerTabId);
    });
}

function createTileElement(tab) {
    var tile = document.createElement('div');
    tile.setAttribute('class', 'tile');

    var tileTitle = document.createElement('h3');
    tileTitle.innerText = tab.title;
    tile.appendChild(tileTitle);

    if (tab.favIconUrl != undefined) {
        var tileIcon = document.createElement('img');
        tileIcon.setAttribute('class', 'favIcon');
        tileIcon.setAttribute('src', tab.favIconUrl);
        tileIcon.setAttribute('width', '40px');
        tileIcon.setAttribute('height', '40px');
        tile.appendChild(tileIcon);
    }
    return tile;
}

function getRowElement() {
    var rows = document.getElementsByClassName("row");
    var row = rows[rows.length - 1];
    if (rows == undefined || rows.length == 0 || rows.length % 3 == 0) {
        row = document.createElement('div');
        row.setAttribute('class', 'row');
    }
    return row;
}

function getTileContainerElement() {
    return document.getElementById("container");
}

function executeTabTasks(tab, tabViewerTabId) {
    return function () {
        var tile = createTileElement(tab);
        var row = getRowElement();
        row.appendChild(tile);
        getTileContainerElement().appendChild(row);
        attachTileEvents(tile, tab, tabViewerTabId);
    }();
}

function removeTabIfInactive(tabViewerId) {
    chrome.tabs.query({'active': true}, function (activeTabs) {
        if (activeTabs[0].id != tabViewerId) {
            removeTabWithId(tabViewerId);
        }
    });
}
function attachEventsToTabWithId(tabViewerId) {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        removeTabIfInactive(tabViewerId);
    });
}

function loadTabViewer(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        chrome.tabs.getCurrent(function(tabViewerTab){
            var tabViewerId = tabViewerTab.id;

            attachEventsToTabWithId(tabViewerId);

            for (i = 0; i <= arrayOfTab.length - 1; i++) {
                var tab = arrayOfTab[i];
                if(tab.id != tabViewerId){
                    executeTabTasks(tab, tabViewerId);
                }
            }
        });

        console.log("done");
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadTabViewer();
});
