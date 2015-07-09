function addTileClickEvent(tile, tab, tabViewerTabId) {
    tile.addEventListener('click', function () {
        //switch to selected tab
        chrome.tabs.update(tab.id, {selected: true}, function () {
            console.log("switching to selected tab");
        });

        chrome.tabs.remove(tabViewerTabId, function () {
            console.log("removing extension page");
        });
    });
}
function createTileElement(tab, tabViewerTabId) {
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
function getLastRow() {
    var rows = document.getElementsByClassName("row");
    var row = rows[rows.length - 1];
    if (rows == undefined || rows.length == 0 || rows.length % 3 == 0) {
        row = document.createElement('div');
        row.setAttribute('class', 'row');
    }
    return row;
}
function executeTabTasks(tab, tabViewerTabId) {
    return function () {
        var tile = createTileElement(tab, tabViewerTabId);
        addTileClickEvent(tile, tab, tabViewerTabId);
        var row = getLastRow();
        row.appendChild(tile);
        document.getElementById("container").appendChild(row);
    }();
}
function loadCurrentWindowTabs(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        var tabViewerPosition = (arrayOfTab.length - 1);
        var tabViewerId = arrayOfTab[ tabViewerPosition].id;

        for (i = 0; i < tabViewerPosition; i++) {
            executeTabTasks(arrayOfTab[i], tabViewerId);
        }
        console.log("done");
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadCurrentWindowTabs();
});
