
tabs = [];

queryInfo = {
	"currentWindow": true
};

chrome.tabs.query(queryInfo , function(tabArray){
	console.log(tabArray);
	for(i = 0; i < tabArray.length; i++){
		tab = {
			"title": tabArray[i].title,
			"favIconUrl": tabArray[i].favIconUrl
		}
		tabs.push(tab);
	}
});

console.log(tabs);
