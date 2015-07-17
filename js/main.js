function switchToTabWithId(tabId) {
    chrome.tabs.update(tabId, {selected: true}, function () {
        console.log("switching to selected tab");
    });
}

function removeTabWithId(tabId) {
    chrome.tabs.remove(tabId, function () {
        console.log("removing extension page");
    });
}

function removeTabWithIdOnCLick(element, tabId) {
    element.addEventListener('click', function () {
        removeTabWithId(tabId);
    });
}

function removeParentElement(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
}

function removeParentElementOnClick(element) {
    element.addEventListener('click', function () {
        removeParentElement(element)
    });
}

function removeElementAndTabOnClick(element, tabViewerTabId) {
    removeTabWithIdOnCLick(element, tabViewerTabId);
    removeParentElementOnClick(element);
}

function switchToTabOnClickEvent(element, tabId) {
    element.addEventListener('click', function () {
        switchToTabWithId(tabId);
    });
}

function createTileElement(tab, tabViewerTabId) {
    var tile = document.createElement('div');
    tile.setAttribute('class', 'tile');

    var tileTitle = document.createElement('h3');
    tileTitle.innerText = tab.title;
    tile.appendChild(tileTitle);
    switchToTabOnClickEvent(tileTitle, tab.id);
    removeTabWithIdOnCLick(tileTitle, tabViewerTabId);

    var tileIcon = document.createElement('img');
    tileIcon.setAttribute('class', 'favIcon');
    if (tab.favIconUrl != undefined) {
        tileIcon.setAttribute('width', '5%');
        tileIcon.setAttribute('src', tab.favIconUrl);
    }else{
        tileIcon.setAttribute('width', '60%');
        tileIcon.setAttribute('alt', 'no icon');
    }
    tile.appendChild(tileIcon);
    switchToTabOnClickEvent(tileIcon, tab.id);
    removeTabWithIdOnCLick(tileIcon, tabViewerTabId);

    var closeButton = document.createElement('div');
    closeButton.innerText = 'close';
    closeButton.setAttribute('class', 'close-btn');
    tile.appendChild(closeButton);
    removeElementAndTabOnClick(closeButton, tab.id);


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
        var tile = createTileElement(tab, tabViewerTabId);
        var row = getRowElement();
        row.appendChild(tile);
        getTileContainerElement().appendChild(row);
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

function executeAllTabTasks(arrayOfTab, tabViewerId) {
    for (i = 0; i <= arrayOfTab.length - 1; i++) {
        var tab = arrayOfTab[i];
        if (tab.id != tabViewerId) {
            executeTabTasks(tab, tabViewerId);
        }
    }
}
function loadTabViewer(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        chrome.tabs.getCurrent(function(tabViewerTab){
            attachEventsToTabWithId(tabViewerTab.id);
            executeAllTabTasks(arrayOfTab, tabViewerTab.id);
        });

        console.log("done");
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadTabViewer();
});
