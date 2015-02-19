(function () {
	'use strict';

	chrome.browserAction.onClicked.addListener(function (tab) {		
		var visualizerTab = {
			url: "src/ChicagoTransitVisualizer.html" 
		};
		
		chrome.tabs.create(visualizerTab);

	});
})();
