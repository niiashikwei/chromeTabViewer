tabsToDisplay = [];

function getActiveTabs(){
    chrome.tabs.query({"currentWindow": true}, function (arrayOfTab) {
        console.log("got array of Tabs");
        for (i = 0; i < arrayOfTab.length - 1; i++){
            var tab = {
                "tabId": arrayOfTab[i].id,
                "tabTitle": arrayOfTab[i].title,
                "icon": arrayOfTab[i].favIconUrl
            };
            tabsToDisplay.push(tab);
            console.log(tab);
        }
    });
}

getActiveTabs();
console.log(tabsToDisplay);
