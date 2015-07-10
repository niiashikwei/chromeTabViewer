function attachTileEvents(tile, tab, tabViewerTabId) {
    tile.addEventListener('click', function () {
        //switch to selected tab
        chrome.tabs.update(tab.id, {selected: true}, function () {
            console.log("switching to selected tab");
        });
    });

    tile.addEventListener('click', function () {
        chrome.tabs.remove(tabViewerTabId, function () {
            console.log("removing extension page");
        });
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

function attachTabViewerEvents(tabViewerId) {
    chrome.tabs.onCreated.addListener( function(tab){
        chrome.tabs.sendMessage(tabViewerId, "foo", {}, loadTabViewer());
        console.log("added newly created tab to tab viewer page");
    });
}
function loadTabViewer(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        chrome.tabs.getCurrent(function(tabViewerTab){
            var tabViewerId = tabViewerTab.id;

            attachTabViewerEvents(tabViewerId);

            for (i = 0; i <= arrayOfTab.length; i++) {
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
