
function loadComplete(){
	//alert("debug1");

	var floor = document.getElementById("floor");
	var room = document.getElementById("room");
	var seat = document.getElementById("seat");
	var startTime = document.getElementById("startTime");
	chrome.storage.local.get(null,function(items){
		floor.value = items.floor;
		room.value = items.room;
		//seat.value = items.seat;
		startTime.value = items.startTime;
		//alert("debug");
	});

	document.getElementById("saveCfg").addEventListener('click',function(){
		chrome.storage.local.set(
			{"floor":floor.value,
			"room":room.value,
			//"seat":seat.value,
			"startTime":startTime.value});
	});
}
window.addEventListener('load',loadComplete);