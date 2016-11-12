//event_js
//var times = 0;
function onInstallCallback(){
	chrome.alarms.create('threeOclock',{delayInMinutes:0.1,periodInMinutes:0.5});
	//alert(1);
}
function alarmCallback(alarm){

	//Get the desired tab by title or the substring of the title
	chrome.tabs.query({title:"*图书馆预约系统*"},function(tabs){

		//Passing message to content script with a command,commands are described below：
		// refresh : Told the content cript to refresh its host page
		// swith   : Told the content script to swith to the expect content
		chrome.tabs.sendMessage(tabs[0].id,{floor:2,command:"refresh",seat:"seat_2638",room:"room_3"});
	});
}

function tabUpdateCallback(tabId,info,tab){
	if (info.status=="complete")
	{
		if (tab.url.search("http://202.206.242.87") > -1 )
		{
			chrome.pageAction.show(tab.id);
		}
	}
}

function responseMsg(){

}
function messageCallback(msg,sender,responseMsg){

		chrome.tabs.query({title:"*图书馆预约系统*"},function(tabs){

			//Passing message to content script with a command,commands are described below：
			// refresh : Told the content cript to refresh its host page
			// switch  : Told the content script to swith to the expect content
			// bookSeat: send with the seat info
			
			if (msg.info=="getSeat")
			{
				chrome.tabs.sendMessage(tabs[0].id,{command:"chooseSeat",info:"seat_2799"});		
			}
			else if (msg.info=="getRoom")
			{
				chrome.tabs.sendMessage(tabs[0].id,{command:"chooseRoom",info:"room_3"});	
			}
			else if (msg.info=="getFloor")
			{
				chrome.tabs.sendMessage(tabs[0].id,{command:"chooseFloor",info:"6"});	
			}
			else if (msg.info=="getStartTime")
			{
				chrome.tabs.sendMessage(tabs[0].id,{command:"chooseStartTime",info:"09:00"});	
			}
			else if (msg.info=="getEndTime")
			{
				chrome.tabs.sendMessage(tabs[0].id,{command:"chooseEndTime",info:"22:00"});	
			}
		});
	


}
chrome.runtime.onInstalled.addListener(onInstallCallback);
chrome.runtime.onMessage.addListener(messageCallback);
chrome.tabs.onUpdated.addListener(tabUpdateCallback);
chrome.alarms.onAlarm.addListener(alarmCallback);